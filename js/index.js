document.addEventListener("DOMContentLoaded", setUpPage)
const GAMES_URL = `http://localhost:3000/api/v1/games/`
const LIKES_URL = `http://localhost:3000/api/v1/likes/`
const COMMENTS_URL = `http://localhost:3000/api/v1/comments/`
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
    } else if (e.target.className == "deleteCmntBtn"){
        let ID = e.target.dataset.id
        let parent = e.target.parentElement
        parent.remove()
        fetch(COMMENTS_URL + ID, {
            method: "DELETE"
        })
        
    }
}

function showMore(game){
    let id = game.id
    
    
    let showPanel = document.querySelector("#show-panel")
    showPanel.innerHTML = ""
    showPanel.innerHTML = `
    <div data-game-id="${game.id}" class="card" style="width: 18rem;">
        <img src=${game.image} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${game.title}</h5>
            <p class="card-text">Genre: ${game.genre}</p>
            <p class="card-text">Release Year: ${game.release_date}</p>
            <p class ="card-text">Likes: ${game.likes.length}</p>
            <h6 class="card-text">Comments:</h6>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Create New Comment</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
        </div>
        <ul id="comment-list" class="list-group list-group-flush">
            ${game.comments.map(comment => `<li class="list-group-item" 
            id="comment-id-${comment.id}">${comment.content}
            <button class = "deleteCmntBtn" data-id = "${comment.id}">Delete</button>
            </li>`).join("")}
        </ul>
    </div>
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


  
    
      
    
    
    
    
  


    



