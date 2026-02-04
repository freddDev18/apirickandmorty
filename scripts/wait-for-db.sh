#!/usr/bin/env bash
set -euo pipefail

pattern="${1-}"
shift || true
cmd=("$@")

if [ -f .devcontainer/.env ]; then
  set -a
  # shellcheck disable=SC1091
  source .devcontainer/.env
  set +a
fi

# Valores por defecto
DB_USER=${MYSQL_USER:-mydbuser}
DB_PASS=${MYSQL_PASSWORD:-mys3cretp4SS}
MAX_RETRIES=${MAX_RETRIES:-10}
SLEEP_SEC=${SLEEP_SEC:-2}

if [ -z "$pattern" ]; then
  echo "Usage: $0 <container-pattern> [cmd ...]"
  exit 2
fi

# Resuelve un contenedor cuyo nombre coincida con el patrón
wait_for_container() {
  local pattern=$1
  local max_retries=$2
  
  for i in $(seq 1 "$max_retries"); do
    local c
    c=$(docker ps --format '{{.Names}}' | grep -m1 "$pattern" || true)
    if [ -n "$c" ]; then
      printf "%s" "$c"
      return 0
    fi
    printf "Esperando contenedor %s... (%d/%d)\r" "$pattern" "$i" "$max_retries"
    sleep "$SLEEP_SEC"
  done
  return 1
}

# Espera a que mysqladmin responda
wait_for_mysqladmin() {
  local container=$1
  local max_retries=$2
  
  for i in $(seq 1 "$max_retries"); do
    if docker exec "$container" mysqladmin ping -hlocalhost -u"$DB_USER" -p"$DB_PASS" --silent >/dev/null 2>&1; then
      return 0
    fi
    printf "Esperando mysqladmin en %s... (%d/%d)\r" "$container" "$i" "$max_retries"
    sleep "$SLEEP_SEC"
  done
  return 1
}

# Espera a que MySQL responda una consulta
wait_for_mysql_query() {
  local container=$1
  local max_retries=$2
  
  for i in $(seq 1 "$max_retries"); do
    if docker exec "$container" mysql -hlocalhost -u"$DB_USER" -p"$DB_PASS" -e "SELECT 1" >/dev/null 2>&1; then
      return 0
    fi
    printf "Esperando consulta MySQL en %s... (%d/%d)\r" "$container" "$i" "$max_retries"
    sleep "$SLEEP_SEC"
  done
  return 1
}

# --- flujo principal ---

echo "Esperando contenedor que coincida con: $pattern"

container=$(wait_for_container "$pattern" "$MAX_RETRIES") || {
  echo
  echo "✗ Contenedor '$pattern' no encontrado después de $MAX_RETRIES intentos"
  exit 1
}

echo
echo "Contenedor encontrado: $container"
echo "Esperando MySQL en $container (user: $DB_USER)..."

wait_for_mysqladmin "$container" "$MAX_RETRIES" || {
  echo
  echo "✗ mysqladmin no respondió después de $MAX_RETRIES intentos"
  exit 1
}

echo
sleep 1

wait_for_mysql_query "$container" "$MAX_RETRIES" || {
  echo
  echo "✗ MySQL no respondió a consulta después de $MAX_RETRIES intentos"
  exit 1
}

echo
echo "✓ MySQL está listo"

# Ejecutar comando si se proporcionó
if [ ${#cmd[@]} -gt 0 ]; then
  exec "${cmd[@]}"
else
  exit 0
fi