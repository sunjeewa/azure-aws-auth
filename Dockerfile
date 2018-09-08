FROM node:9.7-alpine

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' 
COPY package*.json ./

# install project dependencies
RUN yarn 

# copy project files and folders to the current working directory 
COPY . .

# build app 
RUN yarn build

EXPOSE 3000 
CMD [ "/usr/local/bin/yarn","dev" ]
