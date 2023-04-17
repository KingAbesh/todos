FROM node:14.1.0-slim

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

WORKDIR /usr/app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build