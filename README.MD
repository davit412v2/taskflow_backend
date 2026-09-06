# TaskFlow API

Backend REST para la gestión de **proyectos y tareas**, desarrollado con Node.js y Express. El proyecto implementa autenticación mediante JWT, persistencia en PostgreSQL y una arquitectura por capas orientada a mantener el código desacoplado y fácil de probar.

## 🚀 Tecnologías

* Node.js
* Express.js
* PostgreSQL
* JWT
* JavaScript ES Modules
* Jest
* Supertest
* Git / GitHub

## 🏗️ Arquitectura

El proyecto utiliza una arquitectura por capas:

```text
Request
   │
   ▼
Router
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Repository
   │
   ▼
PostgreSQL
```

### Responsabilidades

**Router**

* Define los endpoints.
* Gestiona los métodos HTTP.
* Conecta las rutas con los Controllers.

**Controller**

* Recibe `req` y `res`.
* Extrae parámetros y datos del request.
* Invoca los Services.
* Construye la respuesta HTTP.

**Service**

* Contiene la lógica de negocio.
* Realiza validaciones.
* Maneja reglas de negocio y errores.

**Repository**

* Gestiona el acceso a PostgreSQL.
* Ejecuta las consultas SQL.
* No contiene lógica de negocio.

## 📁 Estructura del proyecto

```text
taskflow/
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controller/
|   |   ├── AuthController.js
│   │   ├── ProjectController.js
│   │   └── TaskController.js
│   │
│   ├── repository/
│   │   ├── ProjectRepository.js
│   │   └── TasksRepository.js
│   │
│   ├── routes/
|   |   ├── AuthRouter.js
│   │   ├── ProjectRouter.js
│   │   └── TaskRouter.js
│   │
│   ├── service/
|   |   ├── AuthService.js
│   │   ├── ProjectService.js
│   │   └── TaskService.js
│   │
│   ├── middleware/
|   |   ├── AuthMilddleware.js
│   │   └── ErrorMilddleware.js
│   │
│   ├── errors/
│   │   └── AppError.js
│   │
│   ├── app.js
│   └── server.js
│
├── test/
│   ├── service/
│   ├── controller/
│   └── routes/
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

## 🔐 Autenticación

La API utiliza **JSON Web Tokens (JWT)** para proteger los endpoints que requieren autenticación.

El token debe enviarse mediante el header:

```http
Authorization: Bearer <token>
```

Ejemplo:

```http
GET /tasks
Authorization: Bearer eyJhbGciOiJIUzI1Ni...
```

## 📌 API

### Authentication

```http
POST /auth
```

Permite autenticar un usuario y obtener un JWT.

### Projects

```http
GET    /projects
GET    /projects/:id
POST   /projects
PUT    /projects/:id
DELETE /projects/:id
```

### Tasks

```http
GET    /tasks
GET    /tasks/:id
GET    /tasks/project/:id
POST   /tasks
PATCH  /tasks/:id
DELETE /tasks/:id
```

## 👨‍💻 Autor

**Luis David Barriga Garay**

Software Engineer | Full Stack Developer | Flutter | Node.js | Inteligencia Artificial

---