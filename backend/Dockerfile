# Use Node.js as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire backend source code
COPY . .

# Expose port (Elastic Beanstalk sets this automatically)
EXPOSE 8080

# Start the Express server
CMD ["node", "index.js"]