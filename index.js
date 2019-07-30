document.addEventListener("DOMContentLoaded", setUpPage)
const GAMES_URL = `http://localhost:3000/api/v1/games/`

function setUpPage(){
    fetch(GAMES_URL)
    .then(res => res.json())
    .then(console.log)
}