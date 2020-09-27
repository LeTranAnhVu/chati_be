import {Request, Response, NextFunction} from "express"
import roomService from "../services/room"
import {NotFoundError} from "../helpers/apiError"
import {User} from "../entity/User"


export async function getRoomById(req: Request, res: Response, next: NextFunction) {
  const {id: roomId} = req.params
  try {
    const loggingUser = req.user as User
    const foundRoom = await roomService.findOne(roomId, loggingUser.id)

    return res.json(foundRoom)
  } catch (e) {
    next(new NotFoundError("Cannot found room", e))
  }
}


export async function getOrCreateRoomByUserId(req: Request, res: Response, next: NextFunction) {
  const {userId} = req.params
  const {id: logginedUserId} = req.user as User
  try {
    const room = await roomService.findOrCreateOneByUserId(userId, logginedUserId)
    return res.json({id: room.id})
  } catch (e) {
    next(new NotFoundError("cannot get or create room"))
  }
}
