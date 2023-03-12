let imdbID = localStorage.getItem("id");
const myApiKey = "87bde8d9"
const mainDiv = document.getElementById('mainDiv')
const backBtn = document.getElementById('backBtn')

function getDataById(){
    if(!imdbID){
        alert('Sorry! Data not found?')
    }else{
        fetch(`https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=${myApiKey}`).then((response) => response.json()).then((data) => {
        
        if(data.Response == "False"){
            mainDiv.innerHTML += `<h2 class="text-center text-light">No Result found?</h2>`
        }else{
            mainDiv.innerHTML += `
                <div class="card mb-3">
                    <img class="movie-img" src="${data.Poster}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${data.Title}</h5>
                    <p class="card-text">${data.Plot}</p>
                    <p class="card-text">Movie Type: ${data.Genre}</p>
                    <p class="card-text">Director: ${data.Director}</p>
                    <p class="card-text">Writers: ${data.Writer}</p>
                    <p class="card-text">Actors: ${data.Actors}</p>
                    <p class="card-text">Language: ${data.Language}</p>
                    <p class="card-text"><small class="text-muted">Released: ${data.Released}</small></p>
                    </div>
                </div>
                `;
            }

        })
    }
}

backBtn.addEventListener('click', () => {
    localStorage.removeItem('id')
})

getDataById()