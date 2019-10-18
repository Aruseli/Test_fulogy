FROM node:lts

# Copy the application to the Docker image
ADD ./ /opt/repository
WORKDIR /opt/repository

RUN npm install
RUN npm build

CMD ["npm", "start", "--", "-p", "$PORT"]
