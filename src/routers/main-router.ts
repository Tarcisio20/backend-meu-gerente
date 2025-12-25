import { Router } from 'express'
import * as authController from '../controllers/auth.js'

export const mainRouter = Router()


mainRouter.get('/register', authController.register)
