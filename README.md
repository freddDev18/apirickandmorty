- [Despliegue](#despliegue)
  - [Localhost](#localhost)
  - [Desarrollo con Dev Containers](#desarrollo-con-dev-containers)
  - [Producción manual](#producción-manual)
  - [Producción Continuos Delivery (CD)](#producción-continuos-delivery-cd)


El proyecto usa el framework **ExpressJS** para Node.js, un entorno de ejecución de JavaScript de código abierto bajo licencia MIT. ExpressJS es útil para el desarrollo de APIs y proporciona una serie de características robustas para aplicaciones web y móviles.

# Despliegue
## Localhost  
- **Preparación**
  - Crear el archivo **.env** en la raíz del proyecto, utilice el archivo **.env.example** para crear las variables y asignarles el valor requerido.
  - Instalar extensión [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) para Visual Studio Code
- **Ejecución**
  - En terminal, a nivel de la raíz del proyecto, deberá ejecutar los siguientes comandos:
    - `npm install` para instalar dependencias
    - `npm run db:create` para crear base de datos en contenedor Docker
    - `npm run db:reset` para crear tablas y sembrado de datos
    - `npm run dev` para iniciar el proyecto en local
  
  - En terminal, observará un mensaje que indica que el servicio esta disponible para responder solicitudes, por ejemplo:
    ```bash
    Server ExpressJS is listening on port http://localhost:3000/
    ```
- **Prueba manual**
  - Abrir el archivo **api.http** localizado en la raíz del proyecto, utilizado para probar los endpoints de la API con la extensión `REST Client`
  - Oprimir el enlace **Send Request** del endpoint que se desea probar.

## Desarrollo con Dev Containers
Los Dev Containers de Microsoft permiten desarrollar dentro de un contenedor Docker, proporcionando un entorno de desarrollo consistente y aislado. Para construir y ejecutar tu aplicación localmente utilizando Dev Containers, sigue estos pasos:

- **Instalar extensiones necesarias**:
    - Asegúrate de tener instalado Docker en tu máquina.
    - Instala la extensión de Visual Studio Code [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).

- **Abrir proyecto en el contenedor**:
     - Abre Visual Studio Code y carga tu proyecto.
     - Presiona `F1` y selecciona `Dev Containers: Reopen in Container`.

- **Iniciar aplicación**:
     - Si tu aplicación no inicia, abre una terminal en Visual Studio Code y ejecuta: `npm run dev`
     - La aplicación estará disponible en http://localhost:3000


## Producción manual

Para desplegar la aplicación en producción utilizando Docker, sigue estos pasos:

1. Ingresar por terminal al servidor Docker Standalone y jecutar los siguientes comandos:
  ```console
  # ----------------------------------
  # ToDo: Cambiar valores de las variables según el proyecto
  # ----------------------------------
  export CI_PROJECT_NAME=<nombre-del-proyecto>  # Ejemplo: user
  export PROJECT_ID=<id-del-proyecto>          # Ejemplo: 259

  # Variables de entorno para el contenedor
  export HARBOR_REGISTRY=harbor-utict.patronato.unam.mx
  export IMAGE_NAME=be
  export HARBOR_PROJECT=${CI_PROJECT_NAME}
  export DOCKER_PATH="/opt/docker/${CI_PROJECT_NAME}"
  export PAT=glpat-svH45ywyVqWE4kBg-85Y
  
  # Verificar configuración
  echo "Directorio de trabajo: $(pwd)"
  echo "Variables configuradas:"
  echo "  HARBOR_REGISTRY: ${HARBOR_REGISTRY}"
  echo "  HARBOR_PROJECT: ${HARBOR_PROJECT}"
  echo "  IMAGE_NAME: ${IMAGE_NAME}"
  echo "  DOCKER_PATH: ${DOCKER_PATH}"

  # Crear directorio y configurar permisos
  sudo mkdir -p "${DOCKER_PATH}"
  sudo chown -R $(whoami):$(whoami) "${DOCKER_PATH}"
  cd "${DOCKER_PATH}"
  touch .env
  ```

2.  Copiar el archivo **compose.yml** desde el repositorio remoto.
  ```console
  curl -o compose.yml "http://192.168.29.74:8091/api/v4/projects/${PROJECT_ID}/repository/files/compose.yml/raw?ref=main" --header "PRIVATE-TOKEN: ${PAT}"
  ```

3. Modificar el archivo **.env** con las variables de entorno proporcionadas en el vault de contraseñas [passbolt](https://pm.patronato.unam.mx/)

4. Crear y ejecutar los contenedores definidos.
  ```console
  docker compose up -d --build
  ```

<!-- 
5. Migraciones y seeders
   - Ejecuta las migraciones para crear y sembrar los modelos en la base de datos:
     ```console
     docker exec compras-be-api-1 npm run compras:db:up
     ``` 
-->

## Producción Continuos Delivery (CD)
El proyecto está configurado para entrega continua (Continuous Delivery) utilizando GitLab CI/CD. A continuación, se describen los pasos para configurar y utilizar esta funcionalidad:

  1. Configura las variables de entorno en GitLab:
     - Accede al proyecto en GitLab y ve a `Settings` > `CI/CD` > `Variables` y agrega las siguientes variables como protegidas (protected) y enmascaradas (masked):
     - `SSH_USER_PROD`: Usuario SSH para el servidor de producción.
     - `SSH_PASSWORD_PROD`: Contraseña SSH para el servidor de producción.
  2. Despliega el proyecto en GitLab:
     - Accede a `CI/CD` > `Pipelines` y selecciona el ultimo pipeline, haz clic en stage `delivery` y luego en el job `delivery-production`
     - Hacer clic en el botón `Run job` para iniciar el delivery a producción.
  3. Monitorea y verifica el despliegue:
     - Observa la salida del job para asegurarte de que el despliegue se complete sin errores.
     - Verifica que la aplicación esté funcionando accediendo a la URL de producción, disponible en Deployments > Environments > Production > Open.
  4. Elimina las variables de entorno registradas en el paso 1 para mantener la seguridad.