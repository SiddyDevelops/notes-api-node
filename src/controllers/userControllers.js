const userModel = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY

const singup = async (req,res) =>{
    //Existing user check
    //Hash Password
    //User Creation
    //Token Generation

    const {username,email,password} = req.body
    try{
        const exisitingUser = await userModel.findOne({email: email})
        if(exisitingUser) {
            return res.status(400).json({message: "User already exisits!"})
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username
        })

        const token = jwt.sign({email: result.email, id: result._id}, SECRET_KEY)
        res.status(200).json({user: result, token: token})
    } catch(error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong!"})
    }
}

const signin = async (req,res) =>{
    const {email,password} = req.body
    try {
        const exisitingUser = await userModel.findOne({email: email})
        if(!exisitingUser) {
            return res.status(404).json({message: "User not found!"})
        }
        const matchPassword = await bcrypt.compare(password, exisitingUser.password)
        if(!matchPassword) {
            return res.status(400).json({message: "Invalid Credentials!"})
        }

        const token = jwt.sign({email: exisitingUser.email, id: exisitingUser._id}, SECRET_KEY)
        res.status(201).json({user: exisitingUser, token: token})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong!"})
    }
}

module.exports = {singup,signin}