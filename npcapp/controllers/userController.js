const User = require('../models/users.model')
const bcrypt = require('bcryptjs')

const userSchema = require('../utils/validation').userSchema
const loginSchema = require('../utils/validation').loginSchema
const Auth = require('../middlewares/auth')

exports.Signup = async(req, res) => {
    try{
        const validation = userSchema.validate(req.body)
        if(validation.error){
            res.status(404).send({
                message : validation.error.details[0].message
            })
            return;
        }
        const {name, email, password, admin} = req.body
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.findOne({email})
        if(user){
            res.status(401).send({
                message : "Email already registered"
            })
            return;
        }
        await User.create({
            name,
            email,
            password: hashPassword,
            admin
        })
        res.status(201).send({
            message : "User registered successfully"
        })
    }catch(error){
        res.status(404).send({
            message : "An error occured!",
            error
        })
    }
}

exports.registerCorper = async(req, res) => {
    try{
        const validation = userSchema.validate(req.body)
        if(validation.error){
            res.status(404).send({
                message : validation.error.details[0].message
            })
            return;
        }
        const {name, email, password} = req.body
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.findOne({email})
        if(user){
            res.status(401).send({
                message : "Email already registered"
            })
            return;
        }
        await User.create({
            name,
            email,
            password: hashPassword,
            admin: false
        })
        res.status(201).send({
            message : "User registered successfully"
        })
    }catch(error){
        res.status(404).send({
            message : "An error occured!",
            error
        })
    }
}

exports.login = async(req, res) => {
    try{
        const validation = loginSchema.validate(req.body)
        if(validation.error){
            res.status(404).send({
                message : validation.error.details[0].message
            })
            return;
        }
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(user){
            const validUser = await bcrypt.compare(password, user.password)
            if(validUser){
                const token = Auth.signToken(user.id, user.admin)
                res.cookie("npcToken", token)
                res.status(201).send({message: "Logged in", token})
            }
            return;
        }
    }catch(error){
        console.log(error, "error")
        res.status(404).send({
            message : "An error occured!",
            error
        })
    }
}