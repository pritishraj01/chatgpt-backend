import uploadOnCloudinary from "../config/cloudinary.js"
import main from "../config/gemini.js"
import generateToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        let profileImg;
        if(req.file){
            profileImg=await uploadOnCloudinary(req.file.path)
        }
        let existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({ message: "User already exist" })
        }

        const hashpass = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashpass,
            profileImg
        })  

        let token = generateToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({
            user: {
                name,
                email,
                profileImg 
            }
        })
    } catch (error) {
        console.log(`error: ${error.message}`);
    }
}

export const login = async (req, res) => {
    try {
        const { password, email } = req.body
        let existUser = await User.findOne({ email })
        if (!existUser) {
            return res.status(400).json({ message: "User not exist" })
        }
        let matchpass = await bcrypt.compare(password, existUser.password)
        if (!matchpass) {
            return res.status(400).json({ message: "Password does not match" })
        }
        let token = generateToken(existUser._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({ user: { email } })
    } catch (error) {
        console.log(`error: ${error.message}`);
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        res.status(200).send("Logout successfully")
    } catch (error) {
        console.log(`error: ${error}`);
    }
}

export const getUserData=async(req,res)=>{
    try {
        let userId=req.userId
        if(!userId){
            return res.status(400).json({message:"User not found"})
        }
        let user=await User.findById(userId)
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({message:error})
    }
}

export const aiAnswer= async(req,res)=>{
    const{prompt}= req.body
    if(!prompt){
        return res.status(400).json("prompt is empty")
    }
    try {
        const text= await main(prompt)
        res.json({text})
    } catch (error) {
        res.status(500).json({ error: "Failed to generate content" });
    }
}