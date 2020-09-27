import express from "express"
import passport from "passport"

import {
  formatGoogleTokenMdl,
  authByGoogle,
  generateAccessTokenMdl,
  getUserInfo, authenticateAccessTokenMdl
} from "../controllers/auth"

const router = express.Router()

router.post(
  "/google",
  formatGoogleTokenMdl,
  passport.authenticate("google-id-token", {session: false}),
  generateAccessTokenMdl,
  authByGoogle
)

router.get(
  "/user-info",
  authenticateAccessTokenMdl,
  getUserInfo
)
export default router
