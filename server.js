import movies from "../public/movies.js";
import express from "express";

const app = express();
const port = 3000;

//Parsing
app.use(express.json());

//Endpoints
app.get("/api/movies/:id", (req, res) => {
    res.json(movies.find((movie) => {
        return req.params.id === movie.id;
    }))
});

//Starting the server
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});