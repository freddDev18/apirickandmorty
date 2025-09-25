
ARG NODE_VERSION=24
ARG HARBOR_REGISTRY=harbor-utict.patronato.unam.mx
ARG HARBOR_CACHE_PROJECT=base-images
ARG ALPINE_VERSION=22

FROM ${HARBOR_REGISTRY}/${HARBOR_CACHE_PROJECT}/node:${NODE_VERSION}-alpine AS builder

# Usar production node environment por default.
ENV NODE_ENV=production

WORKDIR /opt/app

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
FROM ${HARBOR_REGISTRY}/${HARBOR_CACHE_PROJECT}/alpine:${ALPINE_VERSION} AS runner

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
