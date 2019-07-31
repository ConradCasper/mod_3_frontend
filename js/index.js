document.addEventListener("DOMContentLoaded", setUpPage)
const GAMES_URL = `http://localhost:3000/api/v1/games/`
const LIKES_URL = `http://localhost:3000/api/v1/likes/`
const COMMENTS_URL = `http://localhost:3000/api/v1/comments/`
document.addEventListener("click", handleClick)
const addBtn = document.getElementById("new-game-btn")
const formContainer = document.getElementById('form-container')
let addGame = false
const addGameForm = document.getElementById("add-game-form")
addGameForm.addEventListener("submit", handleSubmit)

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
    console.log("likes", game.likes.length)
    console.log("platforms", game.platforms)
    let showPanel = document.querySelector("#show-panel")
    showPanel.innerHTML = ""
    showPanel.innerHTML = `
    <div data-game-id="${game.id}" class="card" style="width: 18rem;">
    <img src=${game.image} class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${game.title}</h5>
      <p class="card-text">Genre: ${game.genre}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Release Date: ${game.release_date}</li>
        ${game.comments.map(comment => `<li class="list-group-item">Comment: ${comment.content}</li>`)}
      <li class="list-group-item">Vestibulum at eros</li>
    </ul>
    `
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

function handleSubmit(e) {
  e.preventDefault()
  debugger;
  let newGame = {
    title: e.target.title.value,
    image: e.target.image.value,
    release_date: e.target.release_year.value,
    genre: e.target.genre.value
  }

  fetch(GAMES_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json"
    },
    body: JSON.stringify({ game: newGame})
  })
  .then(resp => resp.json())
  .then(gameCard)
}

