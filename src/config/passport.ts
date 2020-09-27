import GoogleTokenStrategy from "passport-google-id-token"

import {GOOGLE_CLIENT_ID} from "../util/secrets"
import userService from "../services/user"
import {UserGooglePayloadDto} from "../Dto/UserGooglePayloadDto"

export function googleTokenStrategyFactory() {
  return new GoogleTokenStrategy(
    {
      clientID: GOOGLE_CLIENT_ID
    },
    async function (parsedToken: any, googleId: string, done: any) {
      if (
        parsedToken.payload.email &&
        parsedToken.payload?.email_verified === true
      ) {
        const userPayload: UserGooglePayloadDto = {
          googleId: googleId,
          email: parsedToken.payload.email,
          firstName: parsedToken?.payload?.given_name || "",
          lastName: parsedToken?.payload?.family_name || "",
          avatar: parsedToken?.payload?.picture || ""
        }
        try {
          const user = await userService.findOrCreate(userPayload)
          done(null, user)
        } catch (e) {
          done(e, false)
        }
      } else {
        done(null, false)
      }
    }
  )
}

export default {
  googleTokenStrategyFactory
}