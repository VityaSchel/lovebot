FROM node:16.13.0-alpine as builder
WORKDIR /app
COPY package.json /app/package.json
#COPY package-lock.json /app/package-lock.json

COPY . .
RUN yarn install
RUN yarn build

#FROM nginx:alpine
#COPY ./docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
#COPY --from=builder /app/build /usr/share/nginx/html
CMD ["npm", "start"]
