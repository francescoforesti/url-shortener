FROM node:12 as builder
WORKDIR /build
COPY be ./be
COPY fe ./fe
COPY build.sh ./
RUN sh build.sh

FROM node:12
WORKDIR /app
COPY --from=builder /build/dist/dist ./
COPY --from=builder /build/dist/node_modules ./node_modules
COPY --from=builder /build/dist/frontend/build ./frontend
EXPOSE 8080
CMD [ "node", "app.js" ]
