const Citizens = require('../models/citizens.model')
const States = require('../models/states.model')
const LGAS = require('../models/lga.model')
const WARDS = require('../models/wards.model')
const bcrypt = require('bcryptjs')

const citizenSchema = require('../utils/validation').citizenSchema

exports.registerCitizen = async(req, res) => {
    try{
        const validation = citizenSchema.validate(req.body)
        if(validation.error){
            res.status(404).send({
                message : validation.error.details[0].message
            })
            return;
        }
        const {name, gender, address, phone, wardName, lgaName, stateName } = req.body
        const citizen = await Citizens.findOne({
            name,
            gender,
            address,
            phone
        })
        if(citizen){
            res.status(401).send({
                message : "Citizen already registered"
            })
            return;
        }
        let state = await States.findOne({name: stateName})
        let lga = await LGAS.findOne({name: lgaName})
        let ward = await WARDS.findOne({name: wardName})
        if(!state){
            state = await States.create({
                name: stateName
            })
        }
        if(!lga){
            lga = await LGAS.create({
                name: lgaName,
                state_id: state.id
            })
        }
        if(!ward){
            ward = await WARDS.create({
                name: wardName,
                lga_id: lga.id
            })
        }
        const savedCitizen = await Citizens.create({
            name,
            gender,
            address,
            phone,
            ward_id: ward.id,
            lga: lga.name,
            state: state.name
        })
        res.status(201).send({
            message : "Citizen registered successfully",
            citizen : savedCitizen
        })
    }catch(error){
        res.status(404).send({
            message : "An error occured!",
            error
        })
    }
}

exports.getCitizens = async(req, res) => {
    try{
        let citizens
        const {state, lga, ward} = req.query
        if(state || lga || ward){
            const citizenWard = WARDS.findOne({name: ward})
            if(ward) citizens = await Citizens.find({ward_id: citizenWard.id})
            if(state) citizens =  await Citizens.find({state})
            if(lga) citizens = await Citizens.find({lga})
        }else{
            citizens =  await Citizens.find({})
        }
        if(!citizens){
            res.status(200).send({
                status: "successful",
                message: "No citizens registered yet"
            })
            return;   
        }
        if(citizens && citizens.length === 0){
            res.status(200).send({
                status: "successful",
                citizens
            })
            return;
        }
        res.status(200).send({
            status: "successful",
            citizens
        })
    }catch(error){
        console.log(error, "error")
        res.status(404).send({
            message : "An error occured!",
            error
        })
    }
}