El proyecto usa el framework **ExpressJS** para Node.js, un entorno de ejecución de JavaScript de código abierto bajo licencia MIT. ExpressJS es útil para el desarrollo de APIs y proporciona una serie de características robustas para aplicaciones web y móviles.

# Ejecución local  
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

# Ejecución en devcontainer
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


# Despliegue en contenedores

Para desplegar la aplicación utilizando Docker, sigue estos pasos:

## Preparación
- Ingresar por terminal al worker de Docker
- Crear el directorio donde se clonará el repositorio
  ```console
  sudo mkdir -p /opt/docker/compras-be && cd /opt/docker/compras-be
  ```
- Clonar el repositorio.
  - *Development*
  ```console
  sudo git clone --branch develop http://auth:glpat-svH45ywyVqWE4kBg-85Y@192.168.29.74:8091/ingresos/pasarela-pagos/ingresos-extraordinarios/portal-compras-be.git .
  ```
  - *Production*
  ```console
  sudo git clone --branch main http://auth:glpat-svH45ywyVqWE4kBg-85Y@192.168.29.74:8091/ingresos/pasarela-pagos/ingresos-extraordinarios/portal-compras-be.git .
  ```
- Cambia la propiedad de archivos y directorios.
  ```console
  sudo chown -R $(whoami):$(whoami) /opt/docker/compras-be
  ```
- Crear el archivo **.env** con las variables de entorno proporcionadas en el vault de contraseñas [passbolt](https://pm.patronato.unam.mx/)
- Firmarse en el registro de imagenes harbor
  ```console
  docker login harbor-utict.patronato.unam.mx
  ```
  En caso de error 'certificate signed by unknown authority`, seguir los pasos de [error-al-firmarse-en-el-registro-de-harbor](http://192.168.29.74:8091/estandares/lineamientos/desarrollo-web/wikipedia/-/wikis/stacks/harbor/index#error-al-firmarse-en-el-registro-de-harbor).'
## Iniciar el contenedor
- Crea y ejecuta los contenedores definidos.
  ```console
  docker compose up -d --build
  ```

## Migraciones y seeders
- Ejecuta las migraciones para crear y sembrar los modelos en la base de datos:
  ```console
  docker exec compras-be-api-1 npm run compras:db:up
  ```
## Acceso a la aplicación
- La aplicación estará disponible en http://compras-be.localhost, donde localhost es el nombre del servidor o dirección IP. Obtendras un mensaje JSON similar al siguiente
  ```json
  {
    "environment": "development",
    "containerId": "fd42c5d844b2"
  }
  ```