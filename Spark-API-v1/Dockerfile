ARG PORT=3000

FROM node:14-alpine AS node

# Builder-stage
FROM node AS builder 

# Use /app as the CMD
WORKDIR /app

# Copy all files with package in name and .json ending to /app
COPY package*.json ./

# Install dependencies
RUN npm i

# COPY remaining code
COPY . .

# Invoke the build script to transpile ts code to js
RUN npm run build 

# Open desired port
EXPOSE ${PORT}

# Run dev server
ENTRYPOINT [ "npm", "run", "dev" ]

# FINAL STAGE

FROM node AS final

# Set mode environment to production 
ENV NODE_ENV production

# Create destination dir and ensure user node owns it
RUN mkdir -p /home/node/app/dist && chown -R node:node /home/node/app

# Use /app as the CWD
WORKDIR /home/node/app

# Install PM2
RUN npm i -g pm2

# Copy all files with package in name and .json ending
COPY package*.json process.yml ./

# Switch to user node
USER node

# Install libs as user node
RUN npm i --only=production

# Copy transpiled js files and change ownership to user node
COPY --chown=node:node --from=builder /app/dist ./dist

# Open desired port
EXPOSE ${PORT}

# Use PM2 to run the app as stated in config file
ENTRYPOINT ["pm2-runtime", "./process.yml"]