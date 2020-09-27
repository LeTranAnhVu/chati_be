import {Request, Response, NextFunction} from "express"
import * as faker from "faker"
import {RoomModel} from "index"
import {BadRequestError} from "../helpers/apiError"


export function getRoomById(req: Request, res: Response, next: NextFunction) {
  const {id: roomId} = req.params

  const room: RoomModel = {
    id: roomId,
    users: [
      {
        id: "1",
        name: "brian"
      },
      {
        id: "2",
        name: "tram"
      }
    ],
    messages: []
  }
  for (let i = 1; i <= 30; i++) {
    room.messages.push({
      id: faker.random.uuid(),
      body: faker.lorem.sentence(),
      roomId: "1",
      userId: Math.round(Math.random()) ? "1" : "2"
    })
  }
  return res.json(room)
}



export function getOrCreateRoomByUserId(req: Request, res: Response, next: NextFunction) {
  const {userId} = req.params

  const room = {
    id: faker.random.uuid(),
 }
 return res.json(room)
}
