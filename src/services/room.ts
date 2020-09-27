import {
  BadRequestError,
  NotFoundError
} from "../helpers/apiError"
import {getRepository, In} from "typeorm"
import {User} from "../entity/User"
import {UserGooglePayloadDto} from "../dto/UserGooglePayloadDto"
import {Room} from "../entity/Room"
import {RoomToUser} from "../entity/RoomToUser"
import {CreateRoomPayloadDto} from "../dto/CreateRoomPayloadDto"


async function create(payload: CreateRoomPayloadDto) {
  try {
    const roomRepository = getRepository(Room)
    const roomToUserRepository = getRepository(RoomToUser)
    const room = new Room()

    await roomRepository.save(room)

    const roomToUser1 = new RoomToUser()
    const roomToUser2 = new RoomToUser()

    roomToUser1.room = room
    roomToUser1.userId = payload.loggingUserId

    roomToUser2.room = room
    roomToUser2.userId = payload.userId
    await roomToUserRepository.save([roomToUser1, roomToUser2])
    return room
  } catch (e) {
    throw new BadRequestError("cannot create room")
  }
}


async function findOne(roomId: string, loggingUserId: string) {
  try {
    const roomRepository = getRepository(Room)
    const userRepository = getRepository(User)
    const room = (await roomRepository.find({where: {id: roomId}, relations: ["roomToUsers", "messages"]}))[0]

    if (!room.roomToUsers.some(roomToUser => roomToUser.userId === loggingUserId)) {
      // this room is not belong to this user
      throw ""
    }

    const userIds = room.roomToUsers.map(r2u => r2u.userId)
    const users = await userRepository.find({
      where: {id: In(userIds)},
      select: ["id", "email", "firstName", "lastName", "avatar"]
    })
    return {
      id: room.id,
      messages: room.messages,
      users: users
    }
  } catch (e) {
    throw e
  }
}

async function findOrCreateOneByUserId(userId: string, loggingUserId: string) {
  const roomToUserRepository = getRepository(RoomToUser)
  const roomToUsers = await roomToUserRepository.find({where: {userId: loggingUserId}})
  if (roomToUsers.length > 0) {
    // TODO : fix when have group chat feature
    // suppose there is no group
    const roomIds = roomToUsers.map(roomToUser => roomToUser.roomId)
    const foundExistedRoomToUser = (await roomToUserRepository.find(
      {where: {userId: userId, roomId: In(roomIds)}, relations: ["user", "room"]
      }))[0]

    if (foundExistedRoomToUser) {
      // room is existed
      return foundExistedRoomToUser.room
    }
  }
  return await create({userId, loggingUserId})
}

export default {
  create,
  findOne,
  findOrCreateOneByUserId
}
