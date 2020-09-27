import jwt from "jsonwebtoken"
import {ACCESS_TOKEN_EXP, JWT_RESET_SECRET, JWT_SECRET, RESET_TOKEN_EXP} from "./secrets"

export type AccessTokenPayloadType = {
  email: string;
}
export function genToken(payload: {}) {
  return jwt.sign(payload, JWT_SECRET, {expiresIn: ACCESS_TOKEN_EXP})
}

export function genAccessToken(payload: AccessTokenPayloadType) {
  return genToken({email: payload.email})
}

export function verifyToken(token: string | undefined): false | TokenPayload {
  try {
    if (typeof token === "string") {
      return jwt.verify(token, JWT_SECRET) as TokenPayload
    }
    throw null
  } catch (e) {
    return false
  }
}


export function genResetToken(payload: { email: string }) {
  return jwt.sign({email: payload.email}, JWT_RESET_SECRET, {expiresIn: RESET_TOKEN_EXP})
}

export function verifyResetToken(token: string | undefined) {
  try {
    if (typeof token === "string") {
      return jwt.verify(token, JWT_RESET_SECRET)
    }
    throw null
  } catch (e) {
    return false
  }
}