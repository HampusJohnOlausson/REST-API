import express, { response } from "express";

const app = express();
const port = process.env.PORT || 3000;

//Movie Data
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

//Get list of all movie objects
app.get('/api/movies/', (req, res) => {
    res.send(movies);
})

//Get a specifik movie by id
app.get('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => {
        return req.params.id === m.id;
    });
    if(!movie){
         res.status(404).send('The movie was not found!');
    }
});

//Post a new movie into the list
app.post('/api/movies/:id', (req, res) => {

    if(!req.body.title){
        res.status(400).send('Title of movie is required!');
        return 
    }
    const movie = {
        id: id + 1,
        title: req.body.title
    };
    movies.push(movie);
    res.send(course);
})



//Starting the server
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});

// res.json(
//   movies.find((movie) => {
//     return req.params.id === movie.id;
//   })
// );