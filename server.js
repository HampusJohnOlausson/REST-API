import express from "express";
import fs, { readFile } from "fs";
const app = express();
const port = process.env.PORT || 3000;
const data = fs.readFileSync('movieList.json');
let movies = JSON.parse(data);

//Middleware, makes body is parsed to json 
app.use(express.json());
app.use(express.static('./public'));

//Endpoints
app.get('/api/movies', (req, res) => {

    if(!movies) return res.status(404).json('The list of movies was not found!');

    res.json(movies);
})

app.get('/api/movies/:id', (req, res) => {

    const movieId = req.params.id;
    const movie = movies.find(m => m.id === parseInt(movieId));

    if(!movie) return res.status(404).json('The movie was not found!');
    res.json(movie);
});

app.post('/api/movies', (req, res) => {

  fs.readFile("./movieList.json", (err, data) => {
    data = fs.readFileSync("./movieList.json");
    const movies = JSON.parse(data.toString());

    if (err) {
      return status(404).json(movies);
    }
  });

  let newId = 0;
  movies.forEach((movie) => {
    if (movie.id > newId) {
      newId = movie.id;
    }
  });
  newId++;

  const movie = req.body;
  const newMovie = {
    id: newId,
    title: movie.title,
    year: movie.year,
    director: movie.director,
  };

  //validation
  if (!req.body.title || !req.body.year || !req.body.director){
         return res.status(400).json("Title, year and director of movie is required")
     }

  movies.push(newMovie);

  fs.writeFile("./movieList", JSON.stringify(movies, null, 2), (err) => {
    if (err) return res.status(400)("An error accured");
  });

  res.status(201).json(newMovie.title);

});

//-------PUT method (updating a specifik object)-------
app.put('/api/movies/:id', (req, res) => {

  const movieId = req.params.id;
  const movie = movies.find((m) => m.id === parseInt(movieId));
  if (!movie) return res.status(404).send("The movie was not found!");

  // //validation if title exist or not
  // if (!req.body.title || !req.body.year || !req.body.director)
  //   return res.status(400).send("Title, year and director of movie is required");

  //updating the movie object  
  movie.title = req.body.title;
  movie.year = req.body.year;
  movie.director = req.body.director;
  //return the updated object
  res.send(movie);
});

//-------DELETE method (delete specifik movie)-------
app.delete('/api/movies/:id', (req, res) => {

    const movieId = req.params.id;
    movies = movies.filter((movie) => movie.id !== parseInt(movieId));

    const data = JSON.stringify(movies, null, 2);
    fs.writeFile("movieList.json", data, (err) => {
      if (err) throw err;
      res.status(200).json('was deleted');
    });

});

//----------Starting the server--------
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});

