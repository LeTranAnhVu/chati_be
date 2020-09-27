import {Router} from "express"
import {getOrCreateRoomByUserId, getRoomById} from "../controllers/room"

const router = Router()

router.get("/:id", getRoomById)
router.get("/users/:userId", getOrCreateRoomByUserId)

export default router
