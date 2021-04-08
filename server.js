import express, { response } from "express";

const app = express();
const port = process.env.PORT || 3000;

//Movie Data
const movies = [
    {
        id: 1,
        title: 'Pans Labyrinth',
        director: 'Guillermo Del Toro'
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

//Get list of all movie objects
app.get('/api/movies/', (req, res) => {
    if(!movies){
        res.status(404).send('The list of movies was not found!');
    }
    res.send(movies);
})

//Get a specifik movie by id
app.get('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    res.send(movie);
    if(!movie){
         res.status(404).send('The movie was not found!');
    }
});

//Post a new movie into the list
app.post('/api/movies/:id', (req, res) => {

    if(!req.body.title && !req.body.director){
        res.status(400).send('Title and director of movie is required!');
        return;
    }
    const movie = {
        id: movies.length + 1,
        title: req.body.title,
        director: req.body.director
    };
    // const updateMovieList = {...movies, movie};
    movies.push(movie);
    res.send(movie);
});



//Starting the server
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});

// res.json(
//   movies.find((movie) => {
//     return req.params.id === movie.id;
//   })
// );