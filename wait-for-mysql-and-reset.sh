#!/bin/sh
# Espera a que MySQL esté listo y luego ejecuta npm run db:reset

MYSQL_HOST=${MYSQL_HOST:-db}
MYSQL_USER=${MYSQL_USER:-admin}
MYSQL_PASSWORD=${MYSQL_PASSWORD:-qwerty}
MYSQL_DATABASE=${MYSQL_DATABASE:-mysqldb}

until mysql -h "$MYSQL_HOST" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "SELECT 1;" "$MYSQL_DATABASE"; do
  echo "Waiting for MySQL to be ready..."
  sleep 2
done

npm run db:reset

# Inicia la app normalmente
exec pm2-runtime start ecosystem.config.js
