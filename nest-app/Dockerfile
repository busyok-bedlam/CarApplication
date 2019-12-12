FROM node:12

WORKDIR /nestapp

COPY package.json .

RUN npm install

COPY . .

RUN ./node_modules/.bin/compodoc -p tsconfig.json
