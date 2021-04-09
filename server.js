import express, { response } from "express";

const app = express();
//Use environment variable Port otherwise port 3000
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


app.use(express.static('./public'));

//Middleware, Parsing for body 
 app.use(express.json());

//Endpoints

//----------Get method (list of all movie objects)---------
app.get('/api/movies', (req, res) => {

    if(!movies)
      return res.status(404).send('The list of movies was not found!');
    
    res.send(movies);
})

//----------Get method (a specifik movie by id)----------
app.get('/api/movies/:id', (req, res) => {

    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if(!movie) return res.status(404).send('The movie was not found!');

    res.send(movie);
});

//----------Post method (add new movie into the list)---------
app.post('/api/movies', (req, res) => {

  const newTitle = req.body.title;

  //validation if title exist or not
  if (!req.body.title)
    return res.status(400).send("Title of movie is required!");

  let newId = 0;
  //finding the biggest id and
  //if movie.id is bigger than the newId than replace newId with the biggest id
  movies.forEach((movie) => {
    if (movie.id > newId) {
      newId = movie.id;
    }
  });
  //than add 1 to get a new unique id
  newId++;

  movies.push({
    id: newId,
    title: newTitle,
  });

  res.json({
    status: "A new movie was added!",
  });

});

//-------PUT method (updating a specifik object)-------
app.put('/api/movies/:id', (req, res) => {

  const movie = movies.find((m) => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send("The movie was not found!");

  //validation if title exist or not
  if (!req.body.title)
    return res.status(400).send("Title of movie is required");

  //updating the movie object  
  movie.title = req.body.name;
  //return the updated object
  res.send(movie);
});

//-------DELETE method (delete specifik movie)-------
app.delete('/api/movies/:id', (req, res) => {

    const movie = movies.find((m) => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send("The movie was not found!");
    //find index of the specific movie to delete
    const index = movies.indexOf(movie);
    const deleteMovie = movies.splice(index, 1);
    res.send(deleteMovie);

});

//----------Starting the server--------
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});

