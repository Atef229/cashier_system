const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    user_id: {
         type: Number 
        },
        username: {
            type: String,
            required: [true, 'Please add a username'] 
           },
       password: {
            type: String,
            required: [true, 'Please add a password'],
            minlength: 6
           },
    //orders: [],
    Created_at:{
        type: String
    },
});

userSchema.index({ request: 'text' });

module.exports = user = mongoose.model('User', userSchema);
