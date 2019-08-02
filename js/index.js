document.addEventListener("DOMContentLoaded", setUpPage)
const GAMES_URL = `http://localhost:3000/api/v1/games/`
const LIKES_URL = `http://localhost:3000/api/v1/likes/`
const COMMENTS_URL = `http://localhost:3000/api/v1/comments/`
const PLATFORMS_URL = `http://localhost:3000/api/v1/platforms/`
document.addEventListener("click", handleClick)
const addBtn = document.getElementById("new-game-btn")
const formContainer = document.getElementById('form-container')
let addGame = false
const addGameForm = document.getElementById("add-game-form")
document.addEventListener("submit", handleSubmit)


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
  } else if (e.target.id == "likeBtn"){
      let game_Id = parseInt(e.target.dataset.id)

      let oldLikes = parseInt(document.querySelector("#likes").innerText)
      let newLikes = oldLikes + 1
      document.querySelector("#likes").innerText = newLikes

      let body = {
          game_id: game_Id
       }

      fetch(LIKES_URL, {
        method: "POST",
        headers: {
          "content-type":"application/json",
          accept:"application/json"
        },
        body:JSON.stringify({
            like: body
        })

      })
      .then(res => res.json())
      .then(json => console.log(json))
  } else if (e.target.id === "new-game-btn") {
    console.log("inside handleClick for new-game")
    getPlatforms()
  }
}

function showMore(game){
    let id = game.id

    let showPanel = document.querySelector("#show-panel")

    showPanel.innerHTML = `
    <div data-game-id="${game.id}" class="card" style="width: 30rem;">
        <img src=${game.image} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${game.title}</h5>

            <p class="card-text"><h5>Genre:</h5> ${game.genre}</p>
            <p class ="card-text">Platform(s): </p>
            
                ${game.platforms.map(platform => `<p class="platform-li">&#127918  ${platform.name}</p>`).join("")}
          
            <p class="card-text"><h5>Release Year:</h5> ${game.release_date}</p>
            <p class="card-text"><h5>Description:</h5> ${game.description}</p>
            <p class ="card-text">
                <h5>Likes: 
                    <span id="likes">${game.likes.length}</span>
                </h5>
                <button id="likeBtn" data-id="${game.id}" type="button" class="btn btn-outline-info">Like</button> 
                
            </p>
            <h6 class="card-text">Comments:</h6>
            <form data-game-id="${game.id}" id="comment-form">
                <div class="form-group">
                    <label for="commentTextArea">Create New Comment</label>
                    <textarea name="comment" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    <button id="commentSubmit" type="submit">Submit Comment</button>
                </div>
            </form>
        </div>
        <ul id="comment-list" class="list-group list-group-flush">
            ${game.comments.map(comment => `
            <li class="list-group-item" 
            id="comment-id-${comment.id}">&#10147  ${comment.content}
            <button class = "deleteCmntBtn" data-id = "${comment.id}">Delete</button>
            </li>`).join("")}
        </ul>
    </div>
    `
}

// addBtn.addEventListener('click', () => {
//     // hide & seek with the form
//     addGame = !addGame
//     if (addGame) {
//       formContainer.style.display = 'block'
//       // submit listener here
//     } else {
//       formContainer.style.display = 'none'
//     }
//   })

function getPlatforms() {
  console.log("inside getPlatforms")
  fetch(PLATFORMS_URL)
  .then(resp => resp.json())
  .then(handleForm)
}

function handleForm(platforms) {
  console.log("inside handleForm", platforms)
  // if(formContainer.innerHTML === null) {
    formContainer.innerHTML = `
    <form id="add-game-form" >
          <h3>Add a New Game</h3>
  
          <input type="text" name="title" value="" placeholder="Enter a game's title..." class="input-text">
          <br>
          <input type="text" name="image" value="" placeholder="Enter a game's image URL..." class="input-text">
          <br>
          <input type="text" name="release_year" value="" placeholder="Enter a game's release year..." class="input-text">
          <br>
          <input type="text" name="genre" value="" placeholder="Enter a game's genre..." class="input-text">
          <br>
          <textarea type="text" name="description" value="" placeholder="Enter a game's description..." class="input-text"></textarea>
          <br>
          ${platforms.map(platform => `<label for="platform-id-${platform.id}"><input class="checkbox" type="checkbox" id="platform-id-${platform.id}" name="platform" value="${platform.name}">${platform.name}</label>                   `).join("")}
          <br>
          <input type="submit" name="submit" value="Create New Game" class="submit">
        </form>
        `
  // } else {
  //   formContainer.innerHTML === null
  // }

}


function handleSubmit(e) {
  if(e.target.id === "add-game-form") {
    handleGameSubmit(e)
  } else if(e.target.id === "comment-form") {
    handleCommentSubmit(e)
  }
}

function handleGameSubmit(e) {
  e.preventDefault()
  
  let boxes = Array.from(document.querySelectorAll(".checkbox"))

  console.log(boxes)

  let platformIds = []
  let checkedBoxes = []
  boxes.forEach(function(box){
    if(box.checked === true){
      checkedBoxes.push(box)
    }
  })
  console.log(checkedBoxes)
  checkedBoxes.map(box => platformIds.push(parseInt(box.id.slice(12))))
  console.log(platformIds)

  let newGame = {
    title: e.target.title.value,
    image: e.target.image.value,
    release_date: e.target.release_year.value,
    genre: e.target.genre.value,
    description: e.target.description.value,
    platformIds
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

  let inputFields = Array.from(document.querySelectorAll(".input-text"))
  inputFields.forEach(inputField => inputField.value = "")

  let allCheckBoxes = Array.from(document.querySelectorAll(".checkbox"))
  allCheckBoxes.forEach(checkBox => checkBox.checked = false)
}

function handleCommentSubmit(e) {
  e.preventDefault()
  
  let commentList = document.getElementById("comment-list")
  let newComment = {
    content: e.target.comment.value,
    game_id: e.target.dataset.gameId
  }

  fetch(COMMENTS_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json"
    },
    body: JSON.stringify({comment: newComment})
  })
  .then(resp => resp.json())
  .then(comment => commentList.innerHTML += `<li class="list-group-item" id="comment-id-${comment.id}">${comment.content}<button class = "deleteCmntBtn" data-id = "${comment.id}">Delete</button></li>`)

  e.target.comment.value = ""

}
