import {
  BadRequestError,
  NotFoundError
} from "../helpers/apiError"
import {getRepository} from "typeorm"
import {User} from "../entity/User"
import {UserGooglePayloadDto} from "../Dto/UserGooglePayloadDto"

async function create(payload: UserGooglePayloadDto) {
  try {
    const userRepository = getRepository(User)
    const user = new User()
    user.email = payload.email
    user.googleId = payload.googleId
    user.lastName = payload.lastName
    user.firstName = payload.firstName
    user.avatar = payload.avatar
    return userRepository.save(user)
  } catch (e) {
    throw new BadRequestError("cannot creat user", e)
  }
}


async function findUserById(id: string) {
  try {
    const userRepository = getRepository(User)
    const user = (await userRepository.find({where: {id}}))[0]
    if (!user) {
      throw "User not found"
    }
    return user
  } catch (e) {
    throw new NotFoundError(e)
  }
}

async function findUserByEmail(email: string) {
  const userRepository = getRepository(User)
  const user = (await userRepository.find({where: {email}}))[0]
  if (!user) {
    throw new NotFoundError()
  }
  return user
}


async function findOrCreate(payload: UserGooglePayloadDto) {
  try {
    if (!payload.email) {
      throw ""
    }
    return await findUserByEmail(payload.email)
  } catch (e) {
    try {
      return await create(payload)
    } catch (e) {
      throw new BadRequestError("Cannot save user", e)
    }
  }
}


export default {
  create,
  findUserByEmail,
  findOrCreate,
  findUserById
}
