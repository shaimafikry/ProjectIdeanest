const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../.env'})
const secret_key = process.env.SECRET_KEY;
const refresh_secret = process.env.REFRESH_SECRET;
const { connectRedisClient } = require('./mongoDB'); // use the same Redis client


async function generateAccessTokens(name, email) {
  const accessPayload = {
		'name': name,
		'email': email,
		'exp': Math.floor(Date.now() / 1000) + 15 * 60 // 15 moinutes
	}
	const accessToken = jwt.sign(accessPayload, secret_key, { algorithm: 'HS256' });

	return accessToken;

}

async function generateRefreshTokens ( name, email) {

	const refreshPayload = {
		'name': name,
		'email': email,
		'exp': Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7  // 7 days
	}
	const refreshToken = jwt.sign(refreshPayload, refresh_secret, { algorithm: 'HS256' });


	return refreshToken;
}


// USE REDIS TO STORE TOKENS
async function storeTokens(userEmail, accessToken, refreshToken) {
	await connectRedisClient.set(`access_token:${userEmail}`, accessToken, { EX: 15 * 60 }); // 15 minutes expiration
  await connectRedisClient.set(`refresh_token:${userEmail}`, refreshToken, { EX: 1 * 24 * 60 * 60 }); // 7 days expiration
}


async function getTokens(userEmail) {
  
  const accessToken = await connectRedisClient.get(`access_token:${userEmail}`);
  const refreshToken = await connectRedisClient.get(`refresh_token:${userEmail}`);

  return { accessToken, refreshToken };
}


module.exports = { generateRefreshTokens, generateAccessTokens, storeTokens, getTokens };
