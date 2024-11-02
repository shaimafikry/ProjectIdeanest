const express = require('express');
const {connectDB, connectRedisClient} = require('./mongoDB');
const authRoute = require('./routes/authRoute')
const organizationRoute = require('./routes/organizationRoute');
const PORT = process.env.PORT || 8080;
const server = express();


server.use(express.json());

// start server

const startServer = async () => {

	try {
	  await connectDB();		// connect to db

		await connectRedisClient.connect(); // conected to redis

		server.use('/', authRoute);
		server.use('/', organizationRoute);


		// port
		server.listen(PORT, () =>{
			console.log(`server running on port ${PORT}`)
		})}
		
		
		
		catch (err) {
		console.error('Error starting the server:', err);
		process.exit(1)
	}
	
}



// start the server
startServer ();
