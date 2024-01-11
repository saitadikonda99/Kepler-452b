const express = require('express')
const router = express.Router()

const { handleLogout } = require('../../controller/auth/logout.Controller')

router.get('/', handleLogout);


module.exports = router;
