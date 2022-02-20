import { Router } from 'express'
import signupController from '../controllers/auth/signup.js'
import loginController from '../controllers/auth/login.js'
import ResetPasswordController from '../controllers/auth/reset_password.js'

const router = Router()

router.post('/signup', signupController)
router.post('/login', loginController)
router.post('/resetPassword', ResetPasswordController)

export default router
