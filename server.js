
import express from "express";

const app = express();
const port = 3000;

const movies = [
    {
        id: 1,
        title: 'Pans Labyrinth',
        Director: 'Guillermo Del Toro'
    },
    {
        id: 2,
        title: 'Blue Valentine',
        director: 'Derek Cianfrance'
    },
    {
        id: 3,
        title: 'Gladiator',
        director: 'Ridley Scott'
    },
    {
        id: 4,
        title: 'Eternal sunshine of the spotless mind',
        director: 'Michel Gondry'
    }
];

//Parsing
app.use(express.json());

//Endpoints
app.get("/api/movies/:id", (req, res) => {
    res.send(movies)
});

//Starting the server
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});