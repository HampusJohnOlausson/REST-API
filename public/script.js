window.addEventListener('load', main);

async function main(){ 

    const showMoviesBtn = document.getElementById("viewAll");
    showMoviesBtn.addEventListener('click', async () => {
        const allMovies = await getAllMovies();
        console.log(...allMovies);
    })

    // const showSpecificMovie = document.getElementById("viewSpecific");
    // showSpecificMovie.addEventListener("click", async () => {
    //   const specificMovie = await getSpecificMovie(id);
    //   console.log(specificMovie);
    // });

    const deleteMovie = await removeMovie(3);
    console.log(deleteMovie);
    

    //const addMovie = await addNewMovie('lotr');
    //console.log(addMovie);

}

async function getAllMovies(){

    const movies = await makeRequest("/api/movies", "GET");

    for(movie of movies){

      const titles = document.createElement('h2');
      titles.innerText = movie.title;
      
      const years = document.createElement('h4');
      years.innerText = movie.year;

      const directors = document.createElement('h3');
      directors.innerText = movie.director;
      
      const movieId = movie.id;
      console.log(movieId);

      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = 'Delete';
      deleteBtn.addEventListener('click', async () => {
          const deleteMovie = await removeMovie(movieId);
          console.log(deleteMovie);
      })

      const viewMovieBtn = document.createElement('button');
      viewMovieBtn.innerText = 'View Movie';
      viewMovieBtn.addEventListener('click', async () => {
          const viewMovie = await getSpecificMovie(movieId);
          console.log(movieId);
      })

      const movieContainer = document.getElementById("movie-container");
       movieContainer.appendChild(titles);
       movieContainer.appendChild(years);
       movieContainer.appendChild(directors);
       movieContainer.appendChild(deleteBtn);
       movieContainer.appendChild(viewMovieBtn);
    }
}

async function getSpecificMovie(id){

    const movies = await makeRequest('/api/movies/' + id, 'GET')
    const title = document.createElement('h2');
    title.innerText = movies.title;

    const year = document.createElement('h4');
    year.innerText = movies.year;

    const director = document.createElement('h3');
    director.innerText = movies.director;

    const specificMovieContainer = document.getElementById('specific-movie');
    specificMovieContainer.appendChild(title);
    specificMovieContainer.appendChild(year);
    specificMovieContainer.appendChild(director)
}

async function addNewMovie(title){
    const body = { title: title, year: year, director: director};
    const status = await makeRequest('/api/movies', 'POST', body)
    return status;
}

async function removeMovie(id){

    const body = { title: title, year: year, director: director};
    const movies = await makeRequest('/api/movies/' + id, 'DELETE', body);
    return movies;
}

async function makeRequest(url, method, body){

    const response = await fetch(url, {
        method: method,
        body: body,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    const result = await response.json();
    console.log(response);
    return result;
}
