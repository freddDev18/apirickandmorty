# Usar imagenes por defecto si no se pasan como argumentos de build
ARG NODE_IMAGE=node:24-alpine
ARG ALPINE_IMAGE=alpine:3.22

FROM ${NODE_IMAGE} AS builder

# Usar production node environment por default.
ENV NODE_ENV=production

WORKDIR /opt/app

# Inicializar y actualizar submódulos de forma recursiva
RUN git config --global --add safe.directory /opt/app && \
    git submodule update --init --recursive
# Descargar dependencias como un paso separado para aprovechar la caché de Docker.
# Aprovechar un montaje de caché en /root/.npm para acelerar las compilaciones posteriores.
# Aprovechar montajes bind a package.json y package-lock.json para evitar tener que copiarlos en
# esta capa.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev --ignore-scripts

# Copiar el resto de los archivos de la aplicación en la imagen
COPY . .

# Construir la aplicación
FROM ${ALPINE_IMAGE} AS final

RUN apk add --update --no-cache nodejs npm

# Instalar PM2
RUN npm install pm2 -g

# Crear el usuario node
RUN addgroup -S node && adduser -S node -G node

# Crear el directorio de la aplicación y el directorio de logs
RUN mkdir -p /opt/app/logs && chown -R node:node /opt/app

# Cambiar al usuario node
USER node
# Crear el directorio de la aplicación
WORKDIR /opt/app
# Copiar los archivos de la aplicación
COPY --chown=node:node --from=builder /opt/app/ . 

# Instalar pm2-logrotate como el usuario node
RUN pm2 install pm2-logrotate

# Exponer el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
