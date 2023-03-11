const searchByTitle = document.getElementById('searchByTitle')
const searchBtn = document.getElementById('searchBtn')
const movieImg = document.getElementById('movie-img')
const myApiKey = "87bde8d9"
const searchMovies = document.getElementById('searchMovies')

let dataStore;

searchBtn.addEventListener('click', (evt) => {
    evt.preventDefault()
    dataStore = ''
    if(!searchByTitle.value){
      alert('Please enter movie name!')
    }else{
      searchMovies.innerHTML =''
      fetch(`http://www.omdbapi.com/?t=${searchByTitle.value}&plot=full&apikey=${myApiKey}`).then((response) => response.json()).then((data) => {
        
        if(data.Response == "False"){
          searchMovies.innerHTML += `<h2 class="text-center text-light">No Result found on ${searchByTitle.value}</h2>`
        }else{
          dataStore = data
          localStorage.setItem("id", data.imdbID);
          searchMovies.innerHTML += `
            <div class="card mb-3" style="max-width: 100%;">
              <div class="row g-0">
                <div class="col-md-4" id="movie-img-div">
                  <a href="./MovieDetails.html">
                    <img id="movie-img" class="img-fluid rounded-start movie-img" src="${data.Poster}" alt="...">
                  </a>
                </div>
                <div class="col-md-8">
                  <div class="card-body mt-4">
                    <a href="./MovieDetails.html"><h5 class="card-title">${data.Title}</h5></a>
                    <p class="card-text">${data.Plot}</p>
                    <p class="card-text"><small class="text-muted">Released Date: ${data.Released}</small></p>
                  </div>

                  <div class="card-body mt-3">
                    <button type="button" class="btn btn-secondary" onclick="addToFavorite()">Add To Favorite</button>
                  </div>
                </div>
              </div>
            </div>
        `;
        }
      }).catch((error) => {
        console.log("error for fetching: ", error);
      })
    }

})

let favorite = JSON.parse(localStorage.getItem("Favorite")) || []

function addToFavorite(id){
  
  if(favorite.some((item) => item.imdbID === dataStore.imdbID)){
    alert("Movie already in Favorite list!")
  }else{
    favorite.push(dataStore)
  }
  localStorage.setItem("Favorite", JSON.stringify(favorite))
}