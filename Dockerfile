FROM node:lts

COPY [".", "/usr/src/app"]
WORKDIR "/usr/src/app"

RUN npm install
RUN npm build

CMD ["npm", "start"]
