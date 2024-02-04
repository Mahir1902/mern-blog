const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        minlength: [4, 'Username must be at least 4 characters'],
        maxlength: 20,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must be at least 6 characters'],
    },
    
})

// pre save hook to hash password
UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// method to generate token
UserSchema.methods.generateAuthToken =  function () {
    return jwt.sign({ username: this.username, id: this._id }, process.env.JWT_SECRET, {expiresIn: '3d'})
}

// static method to login user
UserSchema.statics.login = async function (username, password) {

    const user = await this.findOne({username})
    if(user) {
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(isPasswordMatch) {
            return user
        }
        throw Error('Incorrect password')
    }

    throw Error('Incorrect username')
}


module.exports = mongoose.model('User', UserSchema)

