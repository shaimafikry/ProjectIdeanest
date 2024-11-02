const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { connectRedisClient } = require('../mongoDB'); // use the same Redis client
const Users = require('../models/user');
require('dotenv').config({path: '../.env'});
const {generateAccessTokens,generateRefreshTokens, storeTokens} = require('../utils');
const refresh_secret = process.env.REFRESH_SECRET;



// Mark Sign in

async function signIn(req, res) {
	const { email , password} = req.body;

	const usr = await Users.findOne({ email: email});
	console.log(usr);
	
	if (usr) {
		// password validation
		const isValid = await bcrypt.compare(password, usr.password);

		if (isValid) {
			const accessToken = await generateAccessTokens(usr.name, usr.email);
		
			const refreshToken = await generateRefreshTokens(usr.name, usr.email);

			// add the refresh token to REDIS
			await storeTokens(usr.email, accessToken, refreshToken);


			return res.status(200).json({ message: "Login in succefully", access_token: `${accessToken}`,
				refresh_token: `${refreshToken}`} );
		}
    
		return res.status(400).json({ message: "Incorrect password"});
	}

  return res.status(400).json({message: 'Email doesn\'t exist'})
};




// Mark Sign up

async function signUp(req, res) {

	const newUser = req.body;

	const usr = await Users.findOne({ email: newUser.email});
	
	if (usr) {
		return res.status(400).json({ message: "Email alread Exist"});
	}

	const hashedPass = await bcrypt.hash(newUser.password, 10);

	newUser.password = hashedPass;

	try {
		await Users.create(newUser);

    return res.status(200).json({message: 'Registered Succefully'})

	}catch(error){

		return res.status(400).json({message: 'Registered failed internet error'})
	}
	
};



// Mark Refresh token


async function refreshTokenRenew (req, res) {
	const comingRefreshToken = req.body.refresh_token;


	if (!comingRefreshToken) {
		res.status(400).json({message: 'Refresh token required'});
	};

  // verify token
	jwt.verify(comingRefreshToken, refresh_secret, async (err, user) => {
		if (err) return res.status(403).json({ message: 'Invalid refresh token' });

		// Check if the refresh token is in Redis (or another storage)
		const storedRefreshToken = await connectRedisClient.get(`refresh_token:${user.email}`);
		if (storedRefreshToken !== comingRefreshToken) {
						return res.status(403).json({ message: 'Invalid refresh token' });
				}

				// Create a new access token
				const accessToken = await generateAccessTokens(user.name, user.email);


				return res.status(200).json({ message: "Token Refreshed", access_token: `${accessToken}`,
					refresh_token: `${storedRefreshToken}`} );
		});
	 
}



// Mark Sign out


async function signOut (req, res) {
	const userEmail = req.user.email; // You may get user info from the request, perhaps via middleware

	try {
		await connectRedisClient.del(`refresh_token:${userEmail}`);
		await connectRedisClient.del(`access_token:${userEmail}`);
		
		return res.status(200).json({message: 'Succefully logged out.'});

	} catch (error) {

		console.error('Error while logging out:', error);
		return res.status(500).json({ message: 'An error occurred during logout' });

}
};

module.exports = { signIn , signUp, refreshTokenRenew, signOut};
