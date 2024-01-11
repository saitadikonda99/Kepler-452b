const { pool } = require('../../config/db')
const jwt = require('jsonwebtoken')

const authenticate = async (username, password) => {
            
        // check username and password against database
        // return true if authenticated, false if not
    try {
        const [userData, fields] = await pool.query(
            `SELECT * 
             FROM users 
             WHERE username = ?`,
             [username]
            )

        
        if (userData.length > 0) {
            const hashedPassword = userData[0].password === password
            return hashedPassword ? userData[0] : false
        } 
        return false
    } catch (error) {
        throw new Error(error.message)
    }
}


const handleLogin = async (req, res) => {

    const { username, password } = req.body

    try {
        const authenticated = await authenticate(username, password);

        if (authenticated) {
            const roles = await pool.query(
                `SELECT role
                 FROM users
                 WHERE username = ?`,
                 [authenticated.username]
            )

        // create a jwt token 
        const accessToken = jwt.sign(
            { username: authenticated.username, role : [roles[0][0].role], id: authenticated.id  },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s', algorithm: 'HS256' }
            )
        
        const refreshToken = jwt.sign(
            { username: authenticated.username, role : [roles[0][0].role], id: authenticated.id  },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '30m', algorithm: 'HS256' }
            )
        
        
            // save the refresh token with current user in the database
            await pool.query(`
                UPDATE users
                SET RefreshToken = ?
                WHERE id = ?`
                 ,[ refreshToken, authenticated.id ]
            );

        // set the cookie with the refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true });
        res.json({ id: authenticated.id, username: authenticated.username, role: [roles[0][0].role], accessToken: accessToken })

        } else {
               res.status(401).json({ error: 'Invalid credentials' });
            }
    } catch (error) {
       console.error('Error during login:', error);
       res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    handleLogin
}