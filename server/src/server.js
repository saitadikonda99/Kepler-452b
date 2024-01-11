const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')


const app = express()
const PORT = 3001



// imports start here

// middleware
const verifyJWT = require('./middleware/verifyJWT')
const verifyRoles = require('./middleware/verifyRoles')
const credentials = require('./middleware/credentials')
const corsOptions = require('./config/corsOptions')

// auth routes
const Login = require('./routes/auth/login.Route')
const Refresh = require('./routes/auth/refresh.Route')
const Logout = require('./routes/auth/logout.Route')


// cors 
app.use(cors(corsOptions))
app.use(credentials)

// cookie 
app.use(cookieParser());

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// routes start here
app.use('/auth/login', Login)
app.use('/auth/refresh', Refresh)
app.use('/auth/logout', Logout)

app.get('/', (req, res) => {
    res.send(`<h1 style="text-align:center"> Kepler-452b Server running</h1>`);
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})