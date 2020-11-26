const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({

    username: {
         type: String,
         required: [true, 'Please add a username'] 
        },
    password: {
         type: String,
         required: [true, 'Please add a password']
        },
    Created_at:{
        type: String
    },
});

adminSchema.index({ request: 'text' });

module.exports = Admin = mongoose.model('admins', adminSchema);