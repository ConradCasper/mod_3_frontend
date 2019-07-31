document.addEventListener("DOMContentLoaded", setUpPage)
const GAMES_URL = `http://localhost:3000/api/v1/games/`
const LIKES_URL = `http://localhost:3000/api/v1/likes`
const COMMENTS_URL = `http://localhost:3000/api/v1/comments`
document.addEventListener("click", handleClick)
const addBtn = document.getElementById("new-game-btn")
const formContainer = document.getElementById('form-container')
let addGame = false

function setUpPage(){
    fetch(GAMES_URL)
    .then(res => res.json())
    .then(games => games.map(game => gameCard(game)))
}

function gameCard(game){
    let gameList = document.querySelector("#list")

    gameList.innerHTML += `
        <li class="game-title" data-id=${game.id}>${game.title}</li>
    `
}

function handleClick(e){
    if (e.target.className == "game-title"){
       let ID = e.target.dataset.id
       fetch(GAMES_URL + ID)
       .then(res => res.json())
       .then(game => showMore(game))
    }
}

function showMore(game){
    console.log("game", game)
    console.log("comments", game.comments)
    console.log("likes", game.likes)
    let showPanel = document.querySelector("#show-panel")
    showPanel.innerHTML = ""
    showPanel.innerHTML = `
    <div data-game-id="${game.id}" class="card" style="width: 18rem;">
    <div class="card-body">
      <img src=${game.image} class="card-img-top" alt="...">
      <h5 class="card-title">${game.title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${game.genre}</h6>
      <p class="card-text">${game.description}</p>
      <ul class="list-group list-group-flush">
      <li class="list-group-item">Release Date: ${game.release_date}</li>
      <li class="list-group-item">Dapibus ac facilisis in</li>
      <li class="list-group-item">Vestibulum at eros</li>
    </ul>
    </div>
  </div>`
}

addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addGame = !addGame
    if (addGame) {
      formContainer.style.display = 'block'
      // submit listener here
    } else {
      formContainer.style.display = 'none'
    }
  })



    



