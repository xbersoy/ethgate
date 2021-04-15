FROM node:14

WORKDIR /src/app

COPY package*json ./

RUN npm install

COPY . .

ENV PORT=3005

EXPOSE ${PORT}

CMD ["npm", "start"]