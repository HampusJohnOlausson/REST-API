window.addEventListener('load', main);

async function main(){ 

    const showMoviesBtn = document.getElementById("viewAll");
    showMoviesBtn.addEventListener('click', async () => {
        const allMovies = await getAllMovies();
        console.log(...allMovies);
    })

    const newMovieForm = document.getElementById('form');
    newMovieForm.addEventListener('submit', addMovieForm);

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
          console.log(deleteMovie.id);
      })

      const viewMovieBtn = document.createElement('button');
      viewMovieBtn.classList.add("viewMovieBtn");
      viewMovieBtn.innerText = 'View Movie';
      viewMovieBtn.addEventListener('click', async () => {
          const viewMovie = await getSpecificMovie(movieId);
          console.log(viewMovie.id);
      })

      const updateMovieBtn = document.createElement('button');
      updateMovieBtn.classList.add('editBtn');
      updateMovieBtn.innerText = 'Edit';
      updateMovieBtn.addEventListener('click',() => {
          handleUpdateform(movie);
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
  console.log(movieId);
  return movie;
}

//-------------To delete a movie from the list------------
async function removeMovie(id) {
  const movie = await makeRequest("/api/movies/" + id, 'DELETE');
  return movie;
}

//-----------------Update movie------------------
function handleUpdateform(movie) {

  const idInput = document.getElementById("idUpdateInput"); 
  idInput.value = movie.id; 
  const titleInput = document.getElementById("titleUpdateInput");
  titleInput.value = movie.title;
  const yearInput = document.getElementById("yearUpdateInput");
  yearInput.value = movie.year;
  const directorInput = document.getElementById("directorUpdateInput");
  directorInput.value = movie.director;

  const updateSubmit = document.getElementById("update-form");
  updateSubmit.addEventListener("submit", handleEventUpdate);
}

function handleEventUpdate(e){

    e.preventDefault();
    const updateId = document.getElementById("idUpdateInput").value;
    const updateTitle = document.getElementById("titleUpdateInput").value;
    const updateYear = document.getElementById("yearUpdateInput").value;
    const updateDirector = document.getElementById("directorUpdateInput").value;
    updateMovie(updateTitle, updateYear, updateDirector, updateId);
};

async function updateMovie(updateTitle, updateYear, updateDirector, updateId) {
  const updatedMovie = {
    id: updateId,  
    title: updateTitle,
    year: updateYear,
    director: updateDirector,
  };

  const update = await makeRequest("/api/movies" + updatedMovie.id, "PUT", updatedMovie);
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
