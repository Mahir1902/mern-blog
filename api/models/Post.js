// Modal for the post to save in the db

const mongoose = require('mongoose')
const {Schema, model} = mongoose


const postSchema = new Schema({
    title: String,
    summary: String,
    content: String,
    image: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
})


module.exports = model('Post', postSchema)
