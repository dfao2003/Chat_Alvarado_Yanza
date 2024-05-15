#Imagen del node
FROM node:latest AS nodeS

#Proceso Angular
WORKDIR /UPS_Chat/frontend 
COPY frontend/ /UPS_Chat/frontend/ 

# Instalamos y ejecución del proyecto
RUN npm install --force
RUN npm run build --prod

# Carpeta para almacenar el sevidor
WORKDIR /UPS_Chat/backend
COPY backend/package*.json /UPS_Chat/backend/
RUN npm install

#Informacion nueva
COPY backend/ /UPS_Chat/backend/

# Instalación de la imgen ngix
FROM nginx:1.17.1-alpine

# Instalacion del nodejs
RUN apk add --update nodejs npm

#Informacion del angular y server
COPY --from=nodeS /UPS_Chat/frontend/dist/frontend/browser /usr/share/nginx/html
COPY --from=nodeS /UPS_Chat/backend/ /UPS_Chat/backend

# Ejecución
CMD ["sh", "-c", "node /UPS_Chat/backend/index.js & nginx -g 'daemon off;'"]

# Puertos angular y socket.io
EXPOSE 80
EXPOSE 4000