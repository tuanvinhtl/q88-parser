# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Install development dependencies (including nodemon)
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; then npm install --only=dev; fi

# Expose the port on which the app runs
EXPOSE 3000

# Default command for production, overridden in docker-compose for dev
CMD ["npm", "start"]
