import {Router} from "express"
import {getAll} from "../controllers/user"

const router = Router()

router.get("/", getAll)

export default router
