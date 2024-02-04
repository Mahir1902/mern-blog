const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')


//error handler
const handleError = (err) => {
    console.log(err.message, err.code)

    let errors = {
        username: '',
        password: ''
    }

    if(err.message === 'Incorrect username') {
        errors.username = 'That username is not registered'
    }

    if(err.message === 'Incorrect password') {
        errors.password = 'That password is incorrect'
    }

    //duplicate username error
    if(err.code === 11000) {
        errors.username = 'That username is already registered'
        return errors
    }


    //validation errors
    if(err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    
    return errors
}


const register = async (req, res) => {

    try {
        
        // Get username and password from req.body
        // Hash the password (through mongoose hooks)
        // Create a new user in the db
        const user = await User.create({...req.body})
    
        // Generate token (through hooks also)
        const token = user.generateAuthToken()
        
        res.cookie('jwt', token, {httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000})
        
    
        res.status(StatusCodes.CREATED).json({user: user._id})
    } catch (error) {
        const errors = handleError(error)
        res.status(StatusCodes.BAD_REQUEST).json({errors})
    }
}

const login = async (req, res) => {

    // Get username and password from req.body
    const {username, password} = req.body
    // console.log(req.body)

    try {

        const user = await User.login(username, password)
        const token = user.generateAuthToken()
        res.cookie('jwt', token, {httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000})
        res.status(StatusCodes.OK).json({user: user._id, username: user.username})
        
    } catch (error) {
        const errors = handleError(error)
        res.status(StatusCodes.BAD_REQUEST).json({errors})
    }
    // Find the user document
    // Compare the password
    // Generate token?
}


const logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1})
    res.status(StatusCodes.OK).json({message: 'Logout successful'})
}




module.exports = {
    register,
    login,
    logout
}