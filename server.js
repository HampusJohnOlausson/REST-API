import express, { response } from "express";

const app = express();
const port = process.env.PORT || 3000;

//Movie Data
const movies = [
    {
        id: 1,
        title: 'Pans Labyrinth'
    },
    {
        id: 2,
        title: 'Blue Valentine'
    },
    {
        id: 3,
        title: 'Gladiator'
    },
    {
        id: 4,
        title: 'Eternal sunshine of the spotless mind'
    }
];

//connect to public map 
app.use(express.static('./public'));

//Parsing
 app.use(express.json());

//Endpoints

//----------Get list of all movie objects
app.get('/api/movies', (req, res) => {
    if(!movies){
        res.status(404).send('The list of movies was not found!');
    }
    res.send(movies);
})

//----------Get a specifik movie by id
app.get('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if(!movie){
         res.status(404).send('The movie was not found!');
    }
    res.send(movie);
});

//----------Post a new movie into the list
app.post('/api/movies', (req, res) => {

    if(!req.body.title){
        res.status(400).send('Title of movie is required!');
    }

    const titleToSave = req.body.title;

    let idToSave = 0;

    movies.forEach(title => {
        if(title.id > idToSave){
            idToSave = title.id;
        }
    })
    idToSave++

    movies.push({
        id: idToSave,
        title: titleToSave
    })
    res.json({
        status: "A new movie was added!"
    })
});

//-------PUT

app.put('/api/movies/:id', (req, res) => {
    const movie = movies.find((m) => m.id === parseInt(req.params.id));
    if (!movie) {
      res.status(404).send("The movie was not found!");
    }

    movie.title = req.body.name;
    res.send(movie);
});

//-------DELETE
app.delete('/api/movies/:id', (req, res) => {
    
});

//----------Starting the server
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});

