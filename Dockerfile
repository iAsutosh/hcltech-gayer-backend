FROM node:20 as builder

RUN mkdir /app
WORKDIR /app
COPY ./package.json ./package-lock.json

RUN npm ci

FROM node:20

RUN useradd --home /app test

USER test

WORKDIR /app

COPY ./package.json ./package-lock.json
COPY --from=prod-dependencies /app/node_modules /app/node_modules


# Expose port 80
EXPOSE 3000
CMD ["npm", "run", "dev"]
