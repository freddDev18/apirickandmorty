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