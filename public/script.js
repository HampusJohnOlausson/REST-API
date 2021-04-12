window.addEventListener('load', main);

async function main(){ 

    const showMoviesBtn = document.getElementById("viewAll");
    showMoviesBtn.addEventListener('click', async () => {
        const allMovies = await getAllMovies();
        console.log(...allMovies);
    })

    const showSpecificMovie = await document.getElementById('viewSpecific');
    showSpecificMovie.addEventListener('click', async () => {
        const specificMovie = await getSpecificMovie(2);
        console.log(specificMovie);
    })

    
    // const specificMovie =  await getSpecificMovie(2);
    // console.log(specificMovie);
    //const addMovie = await addNewMovie('lotr');
    //console.log(addMovie);
    //const removeMovie = await removeMovie(3);
    //console.log(removeMovie);
}

async function getAllMovies(){

    const movies = await makeRequest("/api/movies", "GET");
    const movieContainer = document.getElementById("movie-container");
    movieContainer.innerHTML = movies;
    return movies;
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
    const body = { title: title, year: year, director: director};
    const movies = await makeRequest('/api/movies/' + id, 'DELETE', body)
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
