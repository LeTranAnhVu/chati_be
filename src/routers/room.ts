import {Router} from "express"
import {fetchRoomById} from "../controllers/room"

const router = Router()

router.get("/:id", fetchRoomById)

export default router
