# Clone version node
FROM node:18.16-alpine3.18

# Update and install the latest dependencies
# Add non root user to the docker image and set the user
RUN apk update && apk upgrade && adduser -D yuu

# Run with this user
USER yuu

# set work dir as app
WORKDIR /usr/local/app/nuxt

# Copy package to docker
COPY ["package*.json", "./"]

# Install npm dependencies
RUN npm install

# Copy project content with proper permission for the user yuu
COPY --chown=yuu:yuu . .

# Expose port
EXPOSE 3000

# env host to access outside container
ENV HOST=0.0.0.0

# Run project
CMD ["npm", "run", "dev"]
