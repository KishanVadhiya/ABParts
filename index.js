const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5500;


app.use(cors()); 
app.use(express.json());


app.get('/', (req, res) => {
  res.send("Hello there");
});


app.listen(port, () => {
    console.log(
      `Server is running on http://localhost:${port}`
    );
});