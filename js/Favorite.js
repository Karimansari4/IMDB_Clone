const main = document.querySelector('#main')
const body = document.getElementsByTagName('body')

let favorite = JSON.parse(localStorage.getItem("Favorite")) || []

function render(){

    main.innerHTML += ''
    if(favorite.length < 1 ){
        main.innerHTML += `<h2 class="text-center text-light">No Favorite List Found?</h2>`
    }
    for (const item in favorite) {
        if(!item){
            main.innerHTML += `<h2 class="text-center text-light">No Favorite List Found?</h2>`
        }else{
            main.innerHTML += `
            <div class="card mb-3" style="max-width: 100%;">
                <div class="row g-0">
                <div class="col-md-4" id="movie-img-div">
                    
                    <img id="movie-img" class="img-fluid rounded-start movie-img" src="${favorite[item].Poster}" alt="...">
                    
                </div>
                <div class="col-md-8">
                    <div class="card-body mt-4">
                    <h5 class="card-title">${favorite[item].Title}</h5>
                    <p class="card-text">${favorite[item].Plot}</p>
                    <p class="card-text"><small class="text-muted">Released Date: ${favorite[item].Released}</small></p>
                    </div>
            
                    <div class="card-body mt-3">
                        <button type="button" class="btn btn-secondary" onclick="removeFromFavorite(${item})">Remove from Favorite</button>
                    </div>
                </div>
                </div>
            </div>
            `
        }
    }
}

render()

function removeFromFavorite(id){
    let tempId;
    
    for (const i in favorite) {
        if(i == id){
            tempId = favorite[i].imdbID
        }
    }

    favorite = favorite.filter((item) => item.imdbID !== tempId)

    localStorage.setItem("Favorite", JSON.stringify(favorite))

    location.reload()
}