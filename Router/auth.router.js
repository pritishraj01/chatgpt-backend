import express, { Router } from "express"
import { aiAnswer, getUserData, login, logout, signup } from "../controller/controller.js"
import { upload } from "../middlewears/multer.js"
import { authCheck } from "../middlewears/checkauth.js"

let userRouter = express(Router())

userRouter.post("/signup", upload.single("profileImg"), signup)
userRouter.post("/login", login)
userRouter.post("/logout", logout)
userRouter.get("/getuserdata", authCheck, getUserData)
userRouter.post("/aianswer", aiAnswer)

export default userRouter