FROM node

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm               
            # note this one
RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD ["npm", "start"]