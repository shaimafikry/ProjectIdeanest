// conection to database monogo
const mongoose = require('mongoose');
require('dotenv').config();
const redis = require('redis');

// Load environment variables


const REDIS_URI = process.env.REDIS_URI || 'redis://loclahost:6379';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ideanest_project';

// function to connect db

const connectDB = async () => {
	try {

		await mongoose.connect(MONGO_URI);

		console.log('mongodb connected')

	} catch (error){

		console.error('mongodb connection error:', error.message);

		process.exit(1);
	}
};



// redis

const REDIS_URL = REDIS_URI;

const connectRedisClient = redis.createClient({ url: REDIS_URL });

connectRedisClient.on('connect', () => {

	console.log('connected to redis');

})

connectRedisClient.on('error', (error) => {

	console.error('redis connection error: error', error);
	process.exit(1)
})




module.exports = {connectDB, connectRedisClient};
