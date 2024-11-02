# Ideanest Project

[Link to the Project](https://talent.ideanest.net/backend-developer)

## Project Overview

Ideanest is a backend project designed for API management and integration. This project leverages a range of backend technologies for efficient API handling, data management, caching, and testing.

## Technologies Used

- **Docker**: Used to manage and pull database images, simplifying setup and ensuring a consistent environment across deployments.
- **Node.js**: Server-side JavaScript runtime, enabling event-driven, non-blocking I/O for handling API requests.
- **Express**: Web framework for Node.js that simplifies API creation and request routing.
- **MongoDB**: NoSQL database used for managing and persisting application data.
- **Redis**: In-memory data structure store used for caching to enhance response times and offload database load.
- **Postman**: Tool for testing and debugging APIs during development.
- **Mocha**: Testing framework used to validate functionality and reliability of the codebase.

## Getting Started

To run this project, ensure you have Docker installed. The Docker Compose file includes images for MongoDB and Redis, simplifying the setup process.

### Running the Project

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ideanest

2. Start the Docker containers:

    ```bash
		docker-compose up

3. Use Postman to test the API endpoints, or run tests using Mocha.
