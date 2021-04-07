const express = require('express');
const app = express();
const port = 3000;

const products = [];

//Parsing
app.use(express.json());

//Endpoints
app.get('/api/products', (req, res) => {
    res.json(products);
});

//Starting the server
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});