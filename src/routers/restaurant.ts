import { Router } from 'express'

const router = Router()

router.get('/', ((req, res, next) => {
  return res.json({message:"good"})
}))

export default router
