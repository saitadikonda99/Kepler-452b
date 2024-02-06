const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const { user } = req;
        console.log('user:', user);
        if (user && user.role && user.role.length > 0) {
            if (user.role.some(role => allowedRoles.includes(role))) {
                next();
            } else {
                res.status(401).json({ error: 'Unauthorized' });
            }
        } else {
            res.status(401).json({ error: 'Unauthorized && No user found' });
        }
    };  
} 

module.exports = verifyRoles;