const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./config/swagger_options");
const connectDB = require("./config/db_connection"); // Adjust the path if necessary
const routes = require("./routes/router");

require("dotenv").config();

const app = express();
connectDB();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
