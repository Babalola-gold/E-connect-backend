const { JsonWebTokenError } = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');


const displayWelcome = (req, res) => {
    res.send('Hello world');
    console.log('Hello world');
};

// const displayGoodbye = (req, res) => {
//     res.send('Goodbye world');
//     console.log('Goodbye world');
// };

const displayApi = (req, res) => {
    res.send([
        {
            firstName: 'John',
            lastName: 'Doe',
            sex: 'male',
            age: 25
        }
    ]);
    console.log('Api World');
};


const register = (req, res) => {
    console.log(req.body);
    let user = new User(req.body)
    user.save()
        .then((user) => {
            console.log("Save user successfully")
        }).catch((err) => {
            console.log(err)
        })
}

const signin = (req, res) => {
    let secret = process.env.SECRET
    let { email, password } = req.body
    console.log(req.body);
    console.log(User);
    User.findOne({ email: email })
        .then((user) => {
            console.log(user)
            user.compare(password, (result, err) => {
                console.log(result)
                console.error(err)
                let token = jwt.sign({ email}, secret, { expiresIn: '1h' }, (err, token) => {
                    if (err) {
                        console.log(err);
                    }else {
                        console.log (token);
                    }
                    res.send({message: "user signd in successfully", status: true, user: result, token: token})
                })
            })

        })
}

const verifyToken = (req, res) =>{
    const {token} = req.body;
    jwt.verify(token, process.env.SECRET, (err, decoded)=>{
        if (err){
            console.log('Token Verification Falled');
        }else {
            console.log(decoded);
            console.log('Token verified successfully');
            res.send({message:"Token verified successful", status: true, decoded: decoded, valid: true, token: token})
        }
    })
}





module.exports = { displayWelcome, displayApi, register, signin, verifyToken }