const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

function getUserInfo() {
  var fullnameField = document.getElementById("fullname").value;
  const api_url = "https://code-challenge.stacc.dev/api/pep?name=";
  const url = api_url + fullnameField

  return fullnameField;
}

let users = []

function load_data(){
  removeCards()
  const fullnameField = getUserInfo()
  if(fullnameField == 0){
    alert("No input. You need to type in your input before searching:)");
  }
  else {
    const api_url = "https://code-challenge.stacc.dev/api/pep?name=";
    const url = api_url + fullnameField
    fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.numberOfHits == 0){
        document.getElementById("pep_result").innerHTML = "No matches"}
      else {
        document.getElementById("pep_result").innerHTML = "Number of matches " + data.numberOfHits
        displayTableHeader()
      }
      users = data.hits.map(user => {
        const card = userCardTemplate.content.cloneNode(true).children[0]
        const name = card.querySelector("[data-name]")
        const score = card.querySelector("[data-score]")
        const sanctions = card.querySelector("[data-sanctions]")
        const dataset = card.querySelector("[data-dataset]")

        name.textContent = user.name
        score.textContent = user.score
        sanctions.textContent = user.sanctions
        dataset.textContent = user.dataset
        userCardContainer.append(card)
        return { name: user.name, score: user.score, dataset: user.dataset,sanctions: user.sanctions, element: card }
      })
    })
  }
}

function removeCards(){
  const cards = document.getElementsByClassName("card");
  
  while(cards.length > 0){
    cards[0].parentNode.removeChild(cards[0]);
  }

  //sjekke om card eksisterer før det fjernes
}

function arrayisEmpty(arr){
  if (arr.length == 0){
    document.getElementById("pep_result").innerHTML = "Approved, no matches"
  }
  else {
    document.getElementById("pep_result").innerHTML = "Matched"
  }

}

function displayTableHeader(){
  document.getElementById("table_name").innerHTML = "Name"
  document.getElementById("table_score").innerHTML = "Score"
  document.getElementById("table_dataset").innerHTML = "Dataset"
  document.getElementById("table_sanctions").innerHTML = "Sanctions"

}

function onCancel(){
  removeCards()
  const name = document.getElementById("table_name");
  name.textContent = '';
  const score = document.getElementById("table_score");
  score.textContent = '';
  const dataset = document.getElementById("table_dataset");
  dataset.textContent = '';
  const sanctions = document.getElementById("table_sanctions");
  sanctions.textContent = '';

  const result = document.getElementById("pep_result");
  result.textContent= '';

  document.getElementById("fullname").value = '';
}