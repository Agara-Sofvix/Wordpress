FROM node:18-alpine

WORKDIR /app

# Copy package files separately to leverage layer caching
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the API port
EXPOSE 5001

# Command to run the application
CMD ["node", "index.js"]
