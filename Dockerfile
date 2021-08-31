
# base image
FROM node:12

# create app directory
WORKDIR /usr/src/app

# copy package* files
COPY package*.json ./

# insall deps
RUN npm install

# copy base code
COPY . .

# app listeting port
EXPOSE 8080

# start app
CMD ["npm", "start"]
