import Movies from "./movies.js";

const express = require('express');
const app = Express();
const port = 3000;

//Parsing
app.use(express.json());

//Endpoints
app.get("/api/movies/:id", (req, res) => {
    res.json(Movies.find((movie) => {
        return +req.params.id === movie.id;
    }))
    res.send(req.params.id)
});

//Starting the server
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});