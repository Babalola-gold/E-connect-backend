const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
require('dotenv').config();

const uri = process.env.URI

mongoose.connect(uri)
    
    .then((response) => {
        console.log("database has connected successful")
    })
    .catch((err) => {
        console.log(err)
        console.log("There is an error in the database")
    })
let userSchema = new mongoose.Schema({

    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})


userSchema.pre("save", function (next) {
        bcrypt.hash(this.password, 10, (err, hash) => {
        
        console.log(hash);
        
        this.password = hash;
        next();

    });
});

userSchema.methods.compare = function (password, callback) {
    bcrypt.compare(password, this.password, (result, err) => {
        console.log(result)
        if (err) return callback(err);
        console.error(err);
    })
}

const User = mongoose.model(
    "user", userSchema
    )

module.exports = User;
