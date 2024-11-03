# to make an image of my project
FROM node:18

# Set the working directory
WORKDIR /ProjectIdeanest

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 8080

# Command to run the application
CMD ["npm", "start"]
