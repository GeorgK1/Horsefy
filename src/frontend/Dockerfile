#build the react app
FROM node:16-alpine AS frontend-builder
ENV NODE_ENV production

WORKDIR /

COPY package.json .
COPY package-lock.json .

RUN npm install --production

COPY . .

RUN npm run build

#build the final image with nginx
FROM nginx:1.21.6-alpine as production
ENV NODE_ENV production

COPY --from=frontend-builder /build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

#Expose port
EXPOSE 3000

#Start the nginx
CMD ["nginx", "-g", "daemon off;"]

