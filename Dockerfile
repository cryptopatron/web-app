FROM node:12.11 AS REACT_BUILD

COPY ./package.json /tmp/
RUN cd /tmp && npm install
RUN mkdir -p /webapp && cp -a /tmp/node_modules /webapp/

COPY . /webapp
WORKDIR /webapp
RUN ls
RUN npm run build

FROM golang:1.14.7-alpine AS GO_BUILD
RUN apk add git build-base
RUN git clone https://github.com/cryptopatron/koen-backend.git /server
WORKDIR /server
RUN go test -v ./...
RUN go build -o /go/bin/server

FROM alpine:3.10
WORKDIR app
COPY --from=REACT_BUILD /webapp/build ./webapp/build
COPY --from=GO_BUILD /go/bin/server ./
CMD ./server --servePath ./webapp/build