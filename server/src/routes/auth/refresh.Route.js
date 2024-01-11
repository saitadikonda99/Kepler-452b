const express = require('express')
const router = express.Router()
const { handleRefreshToken } = require('../../controller/auth/refresh.Controller')

router.get('/', (req, res) => {
    handleRefreshToken(req, res)
})

module.exports = router