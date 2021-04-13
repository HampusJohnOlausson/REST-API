import express from "express";

const app = express();
//Use environment variable Port otherwise port 3000
const port = process.env.PORT || 3000;

import fs, { readFile } from 'fs';
const data = fs.readFileSync('movieList.json');
let movies = JSON.parse(data);

//Middleware, makes body is parsed to json 
app.use(express.json());

//Middleware, that makes the public folder accessable
app.use(express.static('./public'));

//Endpoints

//----------Get method (list of all movie objects)---------
app.get('/api/movies', (req, res) => {

    if(!movies)
      return res.status(404).send('The list of movies was not found!');

    res.json(movies);
})

//----------Get method (a specifik movie by id)----------
app.get('/api/movies/:id', (req, res) => {

    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if(!movie) return res.status(404).send('The movie was not found!');
    res.json(movie);
});

//----------Post method (add new movie into the list)---------
app.post('/api/movies', (req, res) => {
  fs.readFile("./movieList.json", (err, data) => {
    data = fs.readFileSync("./movieList.json");
    const movies = JSON.parse(data);
    if (err) {
      return status(404).json({ msg: "An error accurred" });
    }
  });

  const movie = req.body;

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

  const newMovie = {
    id: newId,
    title: movie.title,
    year: movie.year,
    director: movie.director,
  };

  //validation
  if (!movie.title || !movie.year || !movie.director)
    return res
      .status(400)
      .send("Title, year and director of movie is required!");

  movies.push(newMovie);
  fs.writeFile("./movieList", JSON.stringify(movies, null, 2), (err) => {
    if (err) {
      return res.json({ msg: "An error accured" });
    }
  });

  res.json({
    status: "A new movie was added!",
  });

  res.send(movies);
});

//-------PUT method (updating a specifik object)-------
app.put('/api/movies/:id', (req, res) => {

  const movie = movies.find((m) => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send("The movie was not found!");

  //validation if title exist or not
  if (!req.body.title || !req.body.year || !req.body.director)
    return res.status(400).send("Title, year and director of movie is required");

  //updating the movie object  
  movie.title = req.body.name;
  movie.year = req.body.year;
  movie.director = req.body.director;
  //return the updated object
  res.send(movie);
});

//-------DELETE method (delete specifik movie)-------
app.delete('/api/movies/:id', (req, res) => {

    const movie = movies.find((m) => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send("The movie was not found!");
    //find index of the specific movie to delete
    const index = movies.indexOf(movie);
    movies.splice(index, 1);
    res.send(movie);

});

//----------Starting the server--------
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});

