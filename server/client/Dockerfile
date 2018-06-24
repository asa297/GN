# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:9.11

# Copy all local files into the image.
COPY . .

# Build for production.
RUN yarn install
RUN npm run build --production

# Install `serve` to run the application.
RUN npm install -g serve

# Set the command to start the node server.
CMD npm start

# Tell Docker about the port we'll run on.
EXPOSE 3000