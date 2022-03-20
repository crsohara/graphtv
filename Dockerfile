FROM node:16-alpine

WORKDIR /

RUN npm install -g http-server

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "http-server", "dist" ]

# COPY ./dist /

# CMD ["npm", "run", "serve"]
