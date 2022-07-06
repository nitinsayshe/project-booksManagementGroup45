const emailValidator = require("email-validator")
const userModel = require("../models/userModel") 

const createUser = async function (req , res) {
    const validName = /^[A-Za-z -.]+$/ 
    const validPhoneNumber =  /^[0]?[6789]\d{9}$/
    let  validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
    let  userData = req.body ;
    const {title , name , phone , email, password , address} = userData  ;
    
    if(Object.keys(userData).length == 0) {
      return  res.status(400).send({status :false , message : "Require-Body Mandatory"})
    }
    
    if(!title){
        return  res.status(400).send({status :false , message : "title is  Mandatory"})
    }
    if(!(["Mr", "Mrs", "Miss"].includes(title))){
        return  res.status(400).send({status :false , message : "title should be Mr Mrs Miss"})
    }
     
    if(!name){
        return  res.status(400).send({status :false , message : "name is  Mandatory"})
    }
    if(!validName.test(name)){
        return  res.status(400).send({status :false , message : "name is Invalid"})
    } 
    if(!phone){
        return  res.status(400).send({status :false , message : "phoneNumber is  Mandatory"})
    }
    if(!validPhoneNumber.test(phone)){
        return  res.status(400).send({status :false , message : "phoneNumber is incorrect"})
    }  
    if(!email){
        return  res.status(400).send({status :false , message : "email is  Mandatory"})
    }
    if(!emailValidator.validate(email)) {
        return  res.status(400).send({status :false , message : "Provide email in correct format  "})
    } 
    if(!password){
        return  res.status(400).send({status :false , message : "password is  Mandatory"})
    }
    if(!validPassword.test(password)){
        return  res.status(400).send({status :false , message : "password Strength is Weak"})
    }
    let uniqueEmail = await userModel.findOne({email : email})
    if(uniqueEmail) {
        return  res.status(400).send({status :false , message : "Email already exist"})
    }
    let uniquePhone = await userModel.findOne({phone : phone})
    if(uniquePhone) {
        return  res.status(400).send({status :false , message : "Phone Number already exist"})
    }
    if(password.length >8 && password.length <15) {
        return  res.status(400).send({status :false , message : "password length should be between 8-15"})

    }
     let data = await userModel.create(userData)
     return  res.status(201).send({status :true , data : data})
}

module.exports.createUser= createUser