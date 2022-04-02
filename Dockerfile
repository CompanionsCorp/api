FROM node:14-alpine

USER node

RUN mkdir /home/node/.npm-global ; \
    mkdir -p /home/node/app ; \
    chown -R node:node /home/node/app ; \
    chown -R node:node /home/node/.npm-global

ENV PATH=/home/node/.npm-global/bin:$PATH
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV NPM_CONFIG_LOGLEVEL error

WORKDIR /home/node/app

COPY package.json /home/node/app
RUN npm i

ENV DOCKER=TRUE

COPY . /home/node/app

USER $USER

RUN npm run build

ARG NODE=production
ENV NODE_ENV ${NODE}
ARG NAME=api-server
ENV NAME ${NAME}

ARG PORT

EXPOSE $PORT

CMD [ "node" "dist/server.js" ]
