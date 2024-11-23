# Use the official Node.js 18 image from Docker Hub
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present) to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose the port the application will use
EXPOSE 3000

# Start the application
CMD ["npm", "run","dev"]
