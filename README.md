# CRUD_NODE

This is a simple CRUD application built with Node.js, Express.js and Sequelize as ORM.

## Environment Variables

The following environment variables are required:

* `DB_dbname`: The name of the database.
* `DB_user`: The username to use for the database connection.
* `DB_pss`: The password to use for the database connection.
* `DB_host`: The host of the database.
* `DB_port`: The port of the database.
* `SECRET`: A secret key used for signing JSON Web Tokens.

## Routes

### Auth Routes

* `POST /api/v1/auth/signup`: Create a new user.
	+ Request Body: `name`, `email`, `phone`, `password`.
	+ Response: `201 Created` with the created user.
* `POST /api/v1/auth/login`: Login a user.
	+ Request Body: `email`, `password`.
	+ Response: `200 OK` with a JSON Web Token.

### User Routes

* `GET /api/v1/users/:id`: Fetch a user by id.
	+ Request Params: `id`.
	+ Response: `200 OK` with the user.
* `PUT /api/v1/users/:id`: Update a user.
	+ Request Params: `id`.
	+ Request Body: `name`, `email`, `phone`.
	+ Response: `200 OK` with the updated user.

### Product Routes

* `GET /api/v1/product`: Fetch all products.
	+ Response: `200 OK` with all products.
* `POST /api/v1/product`: Create a new product.
	+ Request Body: `product_name`, `description`, `price`.
	+ Response: `201 Created` with the created product.
* `GET /api/v1/product/:id`: Fetch a product by id.
	+ Request Params: `id`.
	+ Response: `200 OK` with the product.
* `PUT /api/v1/product/:id`: Update a product.
	+ Request Params: `id`.
	+ Request Body: `product_name`, `description`, `price`.
	+ Response: `200 OK` with the updated product.
* `DELETE /api/v1/product/:id`: Delete a product.
	+ Request Params: `id`.
	+ Response: `204 No Content`.

## Models

### User Model

* `id`: The id of the user (primary key).
* `name`: The name of the user.
* `email`: The email of the user (unique).
* `phone`: The phone number of the user.
* `password`: The password of the user.

### Product Model

* `id`: The id of the product (primary key).
* `product_name`: The name of the product.
* `description`: The description of the product (optional).
* `price`: The price of the product.
* `created_by`: The id of the user who created the product (foreign key to the User model).

## Migrations

The migrations are stored in the `migrations` folder.

## Sequelize

The Sequelize models are stored in the `models` folder.

## Error Handler

The error handler is stored in the `middleware/errorHandler.js` file.

## Middleware

The middleware functions are stored in the `middleware` folder.

## Controllers

The controllers are stored in the `controller` folder.

## Routes

The routes are stored in the `routes` folder.
### Index.js (models folder)

The `index.js` file in the `models` folder is responsible for exporting the Sequelize instance and defining the models and their associations.

### Model Structure

Each model represents a table in the database and includes attributes that correspond to the table's columns. For example, a `User` model might have fields like `id`, `name`, `email`, `phone`, and `password`. Similarly, a `Product` model could include `id`, `product_name`, `description`, `price`, and `created_by`.

### Associations

Associations define relationships between models:

* **One-to-Many**: A User can have many Products. This is set up using the `hasMany` method on the User model.
* **Many-to-One**: A Product belongs to a User. This association is defined using the `belongsTo` method on the Product model.

### Sequelize Methods

Sequelize provides various methods to interact with the database:

* **`findByPk`**: Retrieves a single instance by its primary key.
* **`findOne`**: Finds a single instance that matches the query options.
* **`findAll`**: Retrieves all instances that match the query options.
* **`create`**: Creates a new instance in the database.
* **`update`**: Updates instances that match the query options.
* **`destroy`**: Deletes instances that match the query options.

These methods facilitate robust data operations, ensuring seamless interaction with the database.

### Eager Loading

Eager loading allows you to load associated models in a single query, thereby reducing the number of database queries. This is essential for performance optimization.

For example, if you need to fetch all products associated with a user, you can use the `include` option when calling `findAll` on the User model. This option tells Sequelize to perform a single query to fetch all associated products:

### Middlewares

Middlewares are functions that are called before the route handler and can either end the request-response cycle or pass control to the next middleware. They are used to perform tasks such as authentication, input validation, and error handling.

In this app, the following middlewares are used:

#### `errorHandler` middleware

The `errorHandler` middleware is used to handle errors that occur in the app. It is called whenever an error occurs in the app and is responsible for sending an error response to the client. The middleware takes four arguments: `err`, `req`, `res`, and `next`. The `err` object contains information about the error. The `req`, `res`, and `next` objects are the same as those passed to route handlers.

The middleware logs the error to the console and then sends a response with a 500 status code and a JSON object containing a success property set to false and a message property set to an error message.

#### `isAuth` middleware

The `isAuth` middleware is used to authenticate requests. It is called for every request and checks if the request contains a valid JWT token. If the token is valid, the middleware adds the user's ID and name to the `req` object and calls the next middleware. If the token is invalid, the middleware sends a response with a 401 status code and a JSON object containing a success property set to false and a message property set to an error message.
