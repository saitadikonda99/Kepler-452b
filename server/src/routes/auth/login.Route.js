const express = require('express')
const { handleLogin } = require('../../controller/auth/auth.Controller')
const router = express.Router()

router.post('/', (req, res) =>{
    handleLogin(req, res)
})

module.exports = router