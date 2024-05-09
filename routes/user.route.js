const express = require('express')
const router = express.Router()
// const {displayWelcome,} = require ("../controllers/user.controller")
const {displayApi} = require ("../controllers/user.controller")
const {register} = require ("../controllers/user.controller")
const {signin} = require ("../controllers/user.controller")
const {verifyToken} = require ("../controllers/user.controller")


router.get("/api", displayApi)
router.post("/register",  register)
router.post("/signin",  signin)
router.post("/verifyToken", verifyToken)



module.exports = router