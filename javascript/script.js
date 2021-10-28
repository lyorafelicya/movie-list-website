//Data taken from TMDB
const API_KEY = 'api_key=864543ee67f177c1b2d41d54be1be5b0';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+ API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+ API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const overlayContent = document.getElementById('overlay-content');

getMovies(API_URL);

function getMovies(url) {

    fetch(url).then(res => res.json()).then(data => {
        //console.log(data.results);
        showMovies(data.results);
    })
}

function showMovies(data) {
    main.innerHTML ='';

    data.forEach(movie => {
        const {title, poster_path, overview, vote_average, id} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie-list-item');
        movieEl.innerHTML = `
        <img class="movie-list-item-img" src="${IMG_URL+poster_path}" alt="${title}">

            <div class="movie-list-item-title">
                <span>${title}</span>
            </div>

            <div class="movie-list-item-desc">
                <p>Rating : ${vote_average}</p>
                <br/>
                <button class="movie-list-item-button" id="${id}">Info</button>
            </div>
        
        `
        main.appendChild(movieEl);

        document.getElementById(id).addEventListener('click', () => {
          //console.log(id)
          openNav(movie)
        })
    })
}

/* Open when someone clicks on the span element */
function openNav(movie) {    
    document.getElementById("myNav").style.width = "100%";

    const {title, overview, poster_path, release_date} = movie;
    overlayContent.innerHTML = `
    <img class="movie-img" src="${IMG_URL+poster_path}" alt="${title}">
    <h1 class="movie-title">${title}</h1>
    <p class="movie-release-date"> Release date : ${release_date}</p>
    <br/>
    <p class="movie-desc">${overview}</p>
  
    `
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if(searchTerm) {
    getMovies(searchURL+'&query='+searchTerm)
  } else {
    getMovies(API_URL);
  }
})
