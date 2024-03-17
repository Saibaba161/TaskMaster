const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {                                           // Creating the token inside a function for reusability
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })   
}

//login user
const loginUser = async(req,res) => {
    const {email, password} = req.body    //Grabbing the email and password from the request body

    try{

        const user = await User.login(email, password)   // Calling the static login function created in the userModel.js and sending the user details to it

        // Creating a token
        const token =  createToken(user._id)

        res.status(200).json({email, token})
    }
    catch(error){
        res.status(404).json({error: error.message})
    }
}


//signup user
const signupUser = async(req,res) => {
    const {email, password} = req.body

    try{
        const user = await User.signup(email, password)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    }

    catch(error){
        res.status(400).json({ error: error.message })
    }
}

module.exports = { signupUser, loginUser }