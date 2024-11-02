const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../.env'})
const secret_key = process.env.SECRET_KEY;
const refresh_secret = process.env.REFRESH_SECRET;




// Middleware to authenticate the token

function authToken(req, res, next) {

	const authHeader = req.headers['authorization'];
    
    if (authHeader && authHeader.startsWith('Bearer ')) {

			const token = authHeader.split(' ')[1];

      jwt.verify(token, secret_key, (err, user) => {
          if (err) {
              return res.status(403).json({ message: 'Invalid or expired token' });
            }
          req.user = user;
          next();
        });
    } else {

        res.status(401).json({ message: 'Authorization header missing or malformed' });
    }
}

module.exports = authToken;
