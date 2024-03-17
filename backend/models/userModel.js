const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }    


})

//static signup method

userSchema.statics.signup = async function(email,password) {

    // Validation
    if( !email || !password ) {                         // Checking for the empty fields
        throw error("Please fill all the fields")
    }
    
    if(!validator.isEmail(email)) {
        throw error("Please enter valid E-Mail ID")
    }

    if(!validator.isStrongPassword(password)) {
        throw error("The password is not strong enough")
    }
    const exists = await this.findOne({ email })

    if ( exists ) {
        throw error('Email ID already exists')
    }

    if(!exists) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
    }
}

// Static Login Method

userSchema.statics.login = async function(email, password) {
    
    if(!email || !password) {
        throw error("Please fill in all the fields")
    }

    const user = await this.findOne({ email })  //Finding the user using the email field

    if(!user) {
        throw error("Incorrect Email")
    }

    const match = await bcrypt.compare(password, user.password)   // Comparing the passwords

    if(!match) {
        throw error("Incorrect Password")
    }

    return user
}

module.exports = mongoose.model('User', userSchema)