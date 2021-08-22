const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        required: true
    },
    username:{
        type:String,
        unique:false
     },
});
UserSchema.plugin(passportLocalMongoose);
const User = module.exports = mongoose.model('User', UserSchema);
module.exports = User;
