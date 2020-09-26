import {Router} from "express"
import seedRouter from "../seed"
import authRouter from "../auth"
import roomRouter from "../room"

const routerV1 = Router()

routerV1.use("/auth", authRouter)
routerV1.use("/rooms", roomRouter)
routerV1.use("/seed", seedRouter)

export default routerV1
