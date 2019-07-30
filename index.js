document.addEventListener("DOMContentLoaded", setUpPage)
const GAMES_URL = `http://localhost:3000/api/v1/games/`
const addBtn = document.getElementById("new-game-btn")
const formContainer = document.getElementById('form-container')
let addGame = false

function setUpPage(){
    fetch(GAMES_URL)
    .then(res => res.json())
    .then(console.log)
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
  