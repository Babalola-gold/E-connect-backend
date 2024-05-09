const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
require('dotenv').config();

const uri = process.env.URI;

mongoose.connect(uri)
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err);
    });

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        this.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
