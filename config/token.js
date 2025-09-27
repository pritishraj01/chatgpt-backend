import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const generateToken=(id)=>{
    let token=jwt.sign({id},process.env.JWT,{expiresIn:"7d"})
    return token
}

export default generateToken