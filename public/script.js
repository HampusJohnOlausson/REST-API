window.addEventListener('load', main);

function main(){ 
    getAllMovies();
    getSpecificMovie(2);
    addNewMovie('lotr');
}

async function getAllMovies(){
    const movies = await makeRequest('/api/movies', 'GET')
    console.log(movies)
}

async function getSpecificMovie(id){
    const movies = await makeRequest('/api/movies/:id', 'GET')
}

async function addNewMovie(title){
    const body = { title: "lotr", year: 2001, director: "Peter Jackson"};

    const status = await makeRequest('/api/movies', 'POST', body)
    console.log(status);
}

async function removeMovie(){
    const movies = await makeRequest('/api/movies/:id', )
}

async function makeRequest(url, method, body){

    const response = await fetch(url, {
        method: method,
        body: body,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log(response)

    const result = await response.json();

    return result;
}
