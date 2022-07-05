FROM node:16

# Working directory
WORKDIR /usr/src/app

# Copy package.json file
COPY package*.json ./

# Install typescript globally
RUN npm install typescript -g

# Install files
RUN npm install

# Copy source code
COPY . .

# Build app
RUN npm run build

# Expose the API port
EXPOSE 1337

# Run the app
CMD ["npm", "start"]