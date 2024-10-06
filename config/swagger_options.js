const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book API",
      version: "1.0.0",
      description: "API documentation for managing books",
      contact: {
        name: "Abhijit Aher",
        email: "seabhi.aher@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3034/api", // Your server URL
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
