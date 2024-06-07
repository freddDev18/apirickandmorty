# Sobre el template (borrar)
Este proyecto tiene por objeto servir como código base para proyectos Backend utilizando las siguientes tecnologías:

- Express
- [Faker](https://fakerjs.dev/): biblioteca para crear datos ficticios, esta deberá ser eliminada si no se requiere
- [hapi/boom](https://www.npmjs.com/package/@hapi/boom): manejador de errores que nos permite es manejar errores de forma amigable.
- [Joi](https://joi.dev/): es un object schema validation. Es la librería que nos va a ayudar a validar los esquemas.
- Husky, Airbnb, commit linter: herramientas para revisión de calidad de código y de mensajes de los commits.
- [Vitest](https://vitest.dev/): biblioteca para pruebas unitarias


## Organización de directorios y reglas generales
- docs: contendrá el contrato de los servicios web desarrollados, si se tienen diferentes versiones, se recomienda tener diferentes archivos (uno por versión). El formato deberá estar en *yaml* y por convención, ser nombrado como *openapi[_vn]*
- e2e: carpeta para colocar las pruebas e2e del proyecto
- src/common: recursos comunes de nuestro proyecto_
    - **config.js**: archivo de configuración del proyecto, encargado de leer las variables de entorno
    - **utils.js**: funciones compartidas en la aplicación
- src/middlewares/:
	- **error.handler.jsx**: middlewares para gestión de errores, aquí incluimos la gestión de errores de ORM
	- **notFound.handler.js**: middleware para la gestión de error 404
	- **validator.handler**: middleware para la gestión de validaciones de esquema
- src/routes: contiene las rutas de nuestro proyecto:
    - index.js: archivo principal de ruteo, aquí se define la llamada a los demás routes
    - example.router.js: cada recurso que manejemos deberá tener su propio router
- src/schemas: contiene los esquemas definidos utilizando Joi, es decir, la definición de las entradas de nuestros servicios. Estas definiciones, deberán corresponder a las especificaciones del contrato (yaml) del servicio.
    - example.schema.js: cada recurso que manejemos deberá tener definidos sus esquemas.
- src/services: contiene los servicios asociados a los recursos de nuestra aplicación:
    - example.service.js: se definen los servicios(métodos) que serán invocados por el router correspondiente. En este nivel, se hacen llamadas a la base de datos, servicios, entre otros.
- src/app.js: archivo donde se encapsula la creación el servidor Express, aquí se proporciona el enlace con los *middlewares* y los *routes*
- src/index.js: archivo donde se instancia *app* y se pone en escucha el servidor
- .eslintrc.cjs: archivo de configuración de EsLint
- vitest.config.js: archivo de configuración de vitest


# Ejecución del proyecto en local
El proyecto require un archivo de configuración de variables de ambiente, este deberá ser creado en la carpeta raíz del proyecto con el nombre **.env**, deberá contener las variables especificadas en el archivo **.env_example**.

En la terminal, a nivel de la raíz del proyecto, ejecutar los siguientes comandos:

- `npm install` para instalar dependencias

- `npm run dev` para levantar el proyecto en local

En la terminal observará la línea que indica la URL donde la aplicación esta disponible, por ejemplo:

```bash
Server ExpressJS is listening on port http://localhost:3000/
```
