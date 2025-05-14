#  Dockerfile for Node Express Backend api (development)

FROM node:16.18-alpine

#ARG NODE_ENV=development

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN yarn install

# Copy app source code
COPY . .

# Fix line endings and make entrypoint script executable
RUN apk add --no-cache dos2unix \
    && dos2unix docker-entrypoint.sh \
    && chmod +x docker-entrypoint.sh

# Exports
EXPOSE 5555

# Use our custom entrypoint script
ENTRYPOINT ["./docker-entrypoint.sh"]
