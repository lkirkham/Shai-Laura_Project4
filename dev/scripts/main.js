//user arrives on page
//user asked for their name and age. age must be >= 19
//if user is not >=  serve up a page that says "oops you're to young"
//if age requirement is met, load main page
// on main page we greet the user and present them with a natural language filter
//natural language filter says something like "I want to feel _________" with a dropdown of selections.
//options could include releif from depression, pain, anxiety, etc. or simply moods like happy, relaxed, hungry...
//user selects an option and are served strains that match that option.
//strains will be displayed with random photo (stretch goal is to have a real one), their name, flavours, all effects, race.
//name photo and 

const app = {}
app.apiUrl = 'http://strainapi.evanbusse.com/'
app.apiKey = 'OcnJg8N'
app.searchQueryEffect = '/strains/search/effect/'

let userSelection = ''
let strains15 = [];

app.events = () => {
  $('form').on('submit', function (e) {
    e.preventDefault();
    // console.log('did this work?');
    userSelection = $('option:selected').val();
    // console.log(userSelection);
    app.getEffect(userSelection);
  })
}

app.getEffect = (user) => {
  let effect = user
  $.ajax({
      url: `${app.apiUrl}${app.apiKey}${app.searchQueryEffect}${effect}`,
      method: 'GET',
      dataType: 'json'
    })
    .then((res) => {
      console.log(res);


      //find out the number of strains in the users selected effect
      console.log(`number of items in the array: ${res.length}`);
      //select a random number from 0 to the number of items in the array
      let randomNumber = Math.floor((Math.random() * res.length) + 1);
      console.log(randomNumber);
      // log the randomly selected name in the users selected effect
      console.log(res[randomNumber].name);
      let randomStrain = res[randomNumber].name;

      strains15 = [];
      //make an array with 15 random strains generated from the users chosen effect.
      for (let i = 0; i < 14; i++) {
        let randomNumber = Math.floor((Math.random() * res.length) + 1);
        // log the randomly selected name in the users selected effect
        let randomStrain = res[randomNumber].name;
        console.log(randomStrain);
        strains15.push(randomStrain);
      }
      console.log(strains15)
      app.displayEffect(strains15)

    })
}

app.displayEffect = function(strainsArray){
  console.log("this is the random strains array passed into display effect " + strainsArray);
  
  
  $('.resultsContainer').append(`<div class="card">
  <div class="cardTop">
  <figure></figure>
  </div>
  <div class="cardBottom">
  <h3 class="strainName">${strainsArray[0]}</h3>
  </div>
  </div>`)

}

app.init = function () {

  app.events();

}

$(function () {
  app.init();
});


// inside we want to put a varauble inside [] of our array
// variable will generate random number that will go into []
// para 0 - end of array -1
// array.length 
// res.length 
// random nubemer = Math.floor(Math.random)()*res.length 
// for(let item = 0; item > res.length > item++)