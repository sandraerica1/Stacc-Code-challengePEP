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
    const api_url = "https://code-challenge.stacc.dev/api/enheter?orgNr=";
    const url = api_url + fullnameField
    fetch(url)
    .then(res => res.json())
    .then(data => {
      //document.getElementById("company_info").innerHTML = "Information"
    showDiv()
    document.getElementById("company_navn").innerHTML = "Name: " + data.navn
    document.getElementById("company_organisasjonsnummer").innerHTML = "Org number: " + data.organisasjonsnummer
    document.getElementById("company_antallAnsatte").innerHTML = "Number of employees: " + data.antallAnsatte
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

function showDiv(){
  document.getElementById("company_info").style.display = "inline-block";
}

