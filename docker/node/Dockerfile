# syntax=docker/dockerfile:1
FROM node:16.13.0-alpine as install

WORKDIR /app

COPY node_modules node_modules
COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --check-files

FROM node:16.13.0-alpine as build

ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_DATA_POLICY
ARG NEXT_PUBLIC_TARIFES
ARG NEXT_PUBLIC_USER_AGREEMENT
ARG NEXT_PUBLIC_CONTACT_EMAIL
ARG NEXT_PUBLIC_REDIRECT_AFTER_PAYMENT

WORKDIR /app

COPY . .
COPY --link --from=install /app/node_modules /app/node_modules

RUN echo NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL >> .env.local
RUN echo NEXT_PUBLIC_DATA_POLICY=$NEXT_PUBLIC_DATA_POLICY >> .env.local
RUN echo NEXT_PUBLIC_TARIFES=$NEXT_PUBLIC_TARIFES >> .env.local
RUN echo NEXT_PUBLIC_USER_AGREEMENT=$NEXT_PUBLIC_USER_AGREEMENT >> .env.local
RUN echo NEXT_PUBLIC_CONTACT_EMAIL=$NEXT_PUBLIC_CONTACT_EMAIL >> .env.local
RUN echo NEXT_PUBLIC_REDIRECT_AFTER_PAYMENT=$NEXT_PUBLIC_REDIRECT_AFTER_PAYMENT >> .env.local

RUN yarn build

CMD ["yarn", "start"]