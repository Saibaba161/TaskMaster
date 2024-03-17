const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req,res,next) => {

    // Verifying Authentication
    const { authorization } = req.headers      // Grabbing the authorization property from the request headers

    if(!authorization) {
        return res.status(401).json({error: 'Authorization token required'})  // Passing a check for the authorization property
    }

    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)    // Verfying the received JWT token by taking the SECRET string as a reference and grabbing the User ID from the token
        
        req.user = await User.findOne({_id}).select('_id')  // Verifying if the user ID is present in the database and if exists, we will attach the ID to the request body as user property
        next()
    }
    catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized' })
    }
}

module.exports = requireAuth