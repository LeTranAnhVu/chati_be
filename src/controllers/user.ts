import {Request, Response, NextFunction} from "express"
import userService from "../services/user"

export async function getAll(req: Request, res: Response, next: NextFunction) {
 const users = await userService.findAll()
 return res.json(users)
}