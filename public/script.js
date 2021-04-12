window.addEventListener('load', main);

async function main(){ 

    const showMoviesBtn = document.getElementById("viewAll");
    showMoviesBtn.addEventListener('click', async () => {
        const allMovies = await getAllMovies();
        console.log(...allMovies);
    })

    const showSpecificMovie = document.getElementById('viewSpecific');
    showSpecificMovie.addEventListener('click', async () => {

        const specificMovie = await getSpecificMovie(2);
        console.log(specificMovie);
    })

    //const addMovie = await addNewMovie('lotr');
    //console.log(addMovie);

    const deleteMovieBtn = document.getElementById("deleteSpecific");
    deleteMovieBtn.addEventListener('click', async () => {

        const deleteMovie = await removeMovie(3);
        console.log(deleteMovie);
    })
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

      const movieContainer = document.getElementById("movie-container");
       movieContainer.appendChild(titles);
       movieContainer.appendChild(years);
       movieContainer.appendChild(directors);
    }
}

async function getSpecificMovie(id){

    const movies = await makeRequest('/api/movies/' + id, 'GET')
    const specificMovieContainer = document.getElementById('specific-movie');
    specificMovieContainer.innerHTML = [
      movies.title,
      movies.year,
      movies.director,
    ];
    return movies;
}

async function addNewMovie(title){
    const body = { title: title, year: year, director: director};
    const status = await makeRequest('/api/movies', 'POST', body)
    return status;
}

async function removeMovie(id){

    const body = { title: lotr, year: year, director: director};
    const movies = await makeRequest('/api/movies/' + id, 'DELETE', body);
    // const deletedMovie = document.getElementById("deleted-movie");
    // deletedMovie.innerText = body.title;
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
