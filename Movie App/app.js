const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMG_PATH =
    "https://image.tmdb.org/t/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');


// returns the color for the class name
const getClassByRate = (vote) =>
    (vote >= 8) ? 'green' : (vote >= 5) ? 'orange' : 'red';

const showMovies = (movies) => {
    main.innerHTML = "";

    movies.forEach(movie => {
        const { title, vote_average, poster_path, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = String.raw `
            
            <img src="${IMG_PATH + poster_path}" alt="movie">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview: </h3>
                ${overview}
            </div>
                    
                       `;


        main.appendChild(movieEl);
    });


}

const getMovies = async(url) => {
    const resp = await fetch(url);
    const respData = await resp.json();

    showMovies(respData.results);
}
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    if (searchTerm) {

        getMovies(SEARCHAPI + searchTerm)
    }

    search.value = '';

})

getMovies(APIURL);