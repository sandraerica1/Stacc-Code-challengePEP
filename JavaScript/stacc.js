const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")

function getUserInfo() {
  var fullnameField = document.getElementById("fullname").value;
  const api_url = "https://code-challenge.stacc.dev/api/pep?name=";
  const url = api_url + fullnameField

  return url;
}

let users = []

function load_data(){
  const url = getUserInfo()
  fetch(url)
  .then(res => res.json())
  .then(data => {
    users = data.hits.map(user => {
      const card = userCardTemplate.content.cloneNode(true).children[0]
      const name = card.querySelector("[data-header]")
      const score = card.querySelector("[data-body]")
      name.textContent = user.name
      score.textContent = user.score
      userCardContainer.append(card)
      return { name: user.name, email: user.score, element: card }
    })
  })
}