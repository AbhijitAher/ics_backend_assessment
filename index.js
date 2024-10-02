const express = require('express');
const connectDB = require('./config/db_connection');  // Adjust the path if necessary
require('dotenv').config(); 

const app = express()
connectDB()

const port = process.env.PORT || 3000;
console.log(port)

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})