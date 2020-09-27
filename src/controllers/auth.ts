import {NextFunction, Request, Response} from "express"
import ApiError, {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError
} from "../helpers/apiError"
import {genAccessToken, verifyToken} from "../util/token"

import userService from "../services/user"
import {User} from "../entity/User"

export function formatGoogleTokenMdl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const tokenId = req.body.tokenId ? req.body.tokenId : req.body.token_id
  if (tokenId) {
    // passport accept only id_token as key value
    req.body["id_token"] = req.body.tokenId = tokenId
    next()
  } else {
    next(new UnauthorizedError("missing google token id"))
  }
}

export function generateAccessTokenMdl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user as User
  if (!user) {
    next(new UnauthorizedError())
  } else {
    req.accessToken = genAccessToken({email: user.email})
    next()
  }
}

export async function authenticateAccessTokenMdl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization")?.replace("Bearer ", "")
  const decodedPayload = verifyToken(token)
  try {
    if (!decodedPayload) {
      next(new UnauthorizedError())
    } else {
      req.tokenPayload = decodedPayload
      req.user = await userService.findUserByEmail(decodedPayload.email)
      next()
    }
  } catch (e) {
    if (e instanceof ApiError) next(e)
    else next(new UnauthorizedError(undefined, e))
  }
}


// export function

export function authByGoogle(req: Request, res: Response, next: NextFunction) {
  const user = req.user
  const accessToken = req.accessToken
  if (user && accessToken) {
    res.status(200).send({user, accessToken})
  } else {
    next(new UnauthorizedError())
  }
}

export async function getUserInfo(
  req: Request,
  res: Response,
  next: NextFunction) {
  try {
    res.send(req.user)
  } catch (e) {
    res.send(null)
  }
}

