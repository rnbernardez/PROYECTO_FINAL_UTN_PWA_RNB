- Descripción del Proyecto - 

Este proyecto es una aplicación de comercio electrónico Full Stack desarrollada con MongoDB, Express.js, React y Node.js (MERN stack). Permite a los usuarios registrados explorar una tienda en línea, agregar productos a un carrito de compras y realizar pedidos.

El backend maneja la autenticación de usuarios con JWT, encriptación de contraseñas con bcrypt y almacenamiento de datos en MongoDB mediante Mongoose. También se implementa un sistema de validación de cuentas por correo electrónico.

El frontend, construido con React y Vite, utiliza React Router para la navegación y gestiona el estado del carrito mediante un contexto (CartProvider). Se prioriza una integración fluida con el backend mediante llamadas a la API.

- Librerías Usadas -

Backend:

Express.js - Framework para construir la API.

Mongoose - Modelado y conexión con la base de datos MongoDB.

bcrypt - Encriptación de contraseñas.

jsonwebtoken - Generación y verificación de tokens de autenticación.

dotenv - Manejo de variables de entorno.

cors - Configuración de CORS para permitir peticiones desde el frontend.

nodemailer - Envío de correos electrónicos para validación de cuentas.

express-validator - Validación de datos en las solicitudes.

morgan - Logger para registrar las peticiones HTTP.

multer - Manejo de archivos en las peticiones.

Frontend:

React - Biblioteca para construir la interfaz de usuario.

Vite - Herramienta para el desarrollo y construcción del frontend.

React Router DOM - Enrutamiento y navegación dentro de la aplicación.

Context API - Gestión del estado global del carrito.

Axios - Cliente HTTP para realizar peticiones a la API.