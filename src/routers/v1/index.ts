import { Router } from 'express'
import seedRouter from '../seed'
import authRouter from '../auth'
import restaurantRouter from '../restaurant'
const routerV1 = Router()

routerV1.use('/auth', authRouter)
routerV1.use('/seed', seedRouter)
routerV1.use('/restaurants', restaurantRouter)

export default routerV1
