window.addEventListener('load', main);

async function main(){ 

    const allMovies = await getAllMovies();

    const newMovieForm = document.getElementById('form');
    newMovieForm.addEventListener('submit', addMovieForm);

    const movieContainer = document.getElementById("movieTitle-container");
    const showMoviesBtn = document.createElement("button");
    showMoviesBtn.classList.add("viewAll");
    showMoviesBtn.innerText = "View Updated Movie-list";
    movieContainer.appendChild(showMoviesBtn);
    showMoviesBtn.addEventListener("click", async () => {
      document.location.reload(true);
      const allMovies = await getAllMovies();
    });
}

//----------------To view all Movies--------------------
async function getAllMovies(){

    const movies = await makeRequest("/api/movies", "GET");

    for(movie of movies){

      const movieBox = document.createElement('div');
      movieBox.classList.add('movieBox');

      const titles = document.createElement('h2');
      titles.innerText = movie.title;
      
      const years = document.createElement('h4');
      years.innerText = movie.year;

      const directors = document.createElement('h3');
      directors.innerText = movie.director;
      
      const movieId = movie.id;
      console.log(movieId);

      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('deleteBtn');
      deleteBtn.innerText = 'Delete';
      deleteBtn.addEventListener('click', async () => {
          const deleteMovie = await removeMovie(movieId);
          movieBox.outerHTML = '';
          alert('movie was deleted');
      })

      const viewMovieBtn = document.createElement('button');
      viewMovieBtn.classList.add("viewMovieBtn");
      viewMovieBtn.innerText = 'View Movie';
      viewMovieBtn.addEventListener('click', async () => {
          const viewMovie = await getSpecificMovie(movieId);
      })

      const updateMovieBtn = document.createElement('button');
      updateMovieBtn.classList.add('editBtn');
      updateMovieBtn.innerText = 'Edit';
      updateMovieBtn.addEventListener('click', async () => {
          const updateMovie = await handleUpdateform(movieId);
          
      })

      const movieContainer = document.getElementById("movie-container");
       movieContainer.appendChild(movieBox);
       movieBox.appendChild(titles);
       movieBox.appendChild(years);
       movieBox.appendChild(directors);
       movieBox.appendChild(deleteBtn);
       movieBox.appendChild(viewMovieBtn);
       movieBox.appendChild(updateMovieBtn);
    }

    return movies;
}

//------------To view a specific movie--------------
async function getSpecificMovie(id){

    const movies = await makeRequest('/api/movies/' + id, 'GET')
    const title = document.createElement('h2');
    title.innerText = movies.title;

    const year = document.createElement('h4');
    year.innerText = movies.year;

    const director = document.createElement('h3');
    director.innerText = movies.director;

    const specificMovieContainer = document.getElementById('specific-movie');
    const specificMovieBox = document.createElement('div');
    specificMovieContainer.appendChild(specificMovieBox);
    specificMovieBox.classList.add('movieBox')
    specificMovieBox.appendChild(title);
    specificMovieBox.appendChild(year);
    specificMovieBox.appendChild(director)

    return movies;
}

//--------------add a new movie---------------
function addMovieForm(e) {
    alert("movie was added");
  e.preventDefault();

  const titleInput = document.getElementById("title-input");
  const titleValue = titleInput.value;
  const yearInput = document.getElementById("year-input");
  const yearValue = yearInput.value;
  const directorInput = document.getElementById("director-input");
  const directorValue = directorInput.value;

  const newMovie = {
    title: titleValue,
    year: yearValue,
    director: directorValue,
  };

  const { title, year, director } = newMovie;
  addNewMovie(title, year, director);
}

async function addNewMovie(title, year, director) {
  const body = { title: title, year: year, director: director };
  const movie = await makeRequest("api/movies", "POST", body);
  return movie;
}

//-------------To delete a movie from the list------------
async function removeMovie(id) {
  const movie = await makeRequest("/api/movies/" + id, 'DELETE');
  return movie;
}

//-----------------Update movie------------------
async function handleUpdateform(id) {

  const movies = await makeRequest("/api/movies/" + id, "GET");
  console.log(movies);
  const titleInput = document.getElementById("titleUpdateInput");
  titleInput.value = movies.title;
  const yearInput = document.getElementById("yearUpdateInput");
  yearInput.value = movies.year;
  const directorInput = document.getElementById("directorUpdateInput");
  directorInput.value = movies.director;
  const movieId = movies.id;


  const updateSubmit = document.getElementById("updateBtn");
  updateSubmit.addEventListener("click", (e) => {

      e.preventDefault();
     const updateTitle = titleInput.value;
     const updateYear = yearInput.value;
     const updateDirector = directorInput.value;
     const id = movieId;
     updateMovie(updateTitle, updateYear, updateDirector, id);
     alert("the movie was updated");

  });
}

async function updateMovie(title, year, director, id) {
  const updateMovie = {
    id: id,
    title: title,
    year: year,
    director: director
  };

  const update = await makeRequest("/api/movies/" + id, "PUT", updateMovie);
  console.log(update);
}

//-----------make request from server----------------

async function makeRequest(url, method, body){

    const response = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    const result = await response.json();
    return result;
}
