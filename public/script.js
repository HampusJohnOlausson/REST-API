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



function addMovieForm(e){

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
        director: directorValue
    };

    const { title, year, director} = newMovie;
    addNewMovie(title, year, director);
}


//--------------To add a new movie to the list------------
async function addNewMovie(title, year, director){
    const body = { title: title, year: year,  director: director }
    const movie = await makeRequest('api/movies', 'POST', body);
    console.log(movieId);
    return movie;
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

      const movieContainer = document.getElementById("movie-container");
       movieContainer.appendChild(movieBox);
       movieBox.appendChild(titles);
       movieBox.appendChild(years);
       movieBox.appendChild(directors);
       movieBox.appendChild(deleteBtn);
       movieBox.appendChild(viewMovieBtn);
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

//-------------To delete a movie from the list------------
async function removeMovie(id) {
  const movie = await makeRequest("/api/movies/" + id, 'DELETE');
  return movie;
}

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
