import { Router } from 'express'
import * as authController from '../controllers/auth.js'

export const mainRouter = Router()


mainRouter.post('/register', authController.register)
