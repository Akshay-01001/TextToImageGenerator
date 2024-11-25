import express from 'express'
import {registerUser,loginUser,userCredits,paymentRazorpay,verifyRazorPay} from "../controllers/userController.js"
import userAuth from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/credits',userAuth,userCredits)
userRouter.post('/payment',userAuth,paymentRazorpay)
userRouter.post('/verifypayment',verifyRazorPay)

export default userRouter