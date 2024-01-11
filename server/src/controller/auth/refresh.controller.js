const jwt = require('jsonwebtoken');
const { pool } = require('../../config/db');

const refreshTokenHandler = async (refreshToken, res) => {
    try {
        const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const [userData, fields] = await pool.query(
            `
            SELECT * 
            FROM users
            WHERE username = ? AND id = ?`,
            [decodedToken.username, decodedToken.id]
        );

        if (!userData.length) return res.sendStatus(401);

        // Evaluate jwt
        jwt.sign(
            { username: decodedToken.username, id: decodedToken.id, role: decodedToken.role }, // Include any necessary properties
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30m' },
            (err, accessToken) => {
                if (err) {
                    console.error('Error signing access token:', err);
                    return res.sendStatus(500);
                }

                res.json({
                    id: decodedToken.id,
                    username: decodedToken.username,
                    role: decodedToken.role,
                    accessToken,
                });
            }
        );

    } catch (error) {
        console.error('Error during token refresh:', error.message);
        return res.sendStatus(403); // Forbidden
    }
};

const handleRefreshToken = async (req, res) => {
    try {
        const cookies = req.cookies;

        if (!cookies?.jwt) return res.sendStatus(401);

        const refreshToken = cookies.jwt;
        await refreshTokenHandler(refreshToken, res);

    } catch (error) {
        console.error('Error during token refresh:', error.message);
        return res.sendStatus(500);
    }
};

module.exports = {
    handleRefreshToken,
};
