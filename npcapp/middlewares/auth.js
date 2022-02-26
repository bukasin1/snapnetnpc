const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const days = process.env.JWT_DAYS
const Users = require('../models/users.model')

exports.signToken = (id, admin) => {
    return jwt.sign({ id, admin }, secret, {
        expiresIn: days,
    });
}

exports.authToken = async(req, res, next) => {
    try{
        console.log('entered auth')
        const token = req.cookies.npcToken
        if(token){
            const decoded = jwt.verify(token, secret)
            if(req.url.includes('admin') && !decoded.admin){
                console.log('second')
                throw {
                    message : "Not authenticated"
                }
            }
            console.log(decoded.admin)
            if(!decoded.admin){
                const user = await Users.findOne({_id : decoded.id, admin: false})
                if (!user) {
                    console.log('third')
                    throw {
                        message : "Not authenticated"
                    }
                }
                req.token = token
                req.user = user
            }else{
                const admin = await Users.findOne({_id : decoded.id, admin: true})
                if (!admin) {
                    console.log('fourth')
                    throw {
                        message : "Not authenticated"
                    }
                }
                req.token = token
                req.user = admin 
            }
            next()
        }else{
            throw {
                message : "Not authenticated"
            }
        }
    }catch(error){
        console.log("auth error")
        res.status(301).send({
            error: "Auth error",
            message: `${error.message}`
        })
    }
}

// exports.adminAuthToken = () => {
    
// }