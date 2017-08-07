var starships;

var app = function() {
  var url = "https://swapi.co/api/starships/";
  makeRequest(url, requestComplete);
  var selectList = document.querySelector('select');
  selectList.addEventListener('change', handleSelectChange);
}

var makeRequest = function(url, callback) {
  //create a new XMLHttpRequest object
  var request = new XMLHttpRequest();
  //set the type of request we want with the url we want to call
  request.open("GET", url);
  //set the callback we want it to use when it has completed the call
  request.addEventListener('load', callback);
  //send the request!
  request.send();
}

var requestComplete = function() {
  //this will be the request object itself
  if(this.status !== 200) return;
  //grab the response text
  var jsonString = this.responseText;
  var starships = JSON.parse(jsonString);
  // console.log(starships);
  populateList(starships);
}

var populateList = function(starships) {
  var shipList = starships.results;
  console.log(starships.results)

  var select = document.querySelector('select');
  shipList.forEach(function(starship) {
    var option = document.createElement('option');
    option.innerText = starship.name;
  
  var jsonString = localStorage.getItem("savedStarship");
  var saveStarship = JSON.parse(jsonString);

  if (saveStarship && starship.name === saveStarship.name) {
    option.selected = true;
    populateDetails(starship);
  }
  select.appendChild(option);
  });
  
}

var populateDetails = function(starship) {

  var ul = document.querySelector("#starship-details");
  ul.innerHTML = "";

  var liName = document.createElement("li");
  var liModel = document.createElement("li");
  var liManufacturer = document.createElement("li");
  var liHyperdriveRating = document.createElement("li");
  
  liName.innerText = "Name: " + starship.name;
  liModel.innerText = "Model: " + starship.model;
  liManufacturer.innerText = "Manufacturer: " + starship.manufacturer;
  liHyperdriveRating.innerText = "Hyperdrive Rating: " + starship.hyperdrive_rating;

  ul.appendChild(liName);
  ul.appendChild(liModel);
  ul.appendChild(liManufacturer);
  ul.appendChild(liHyperdriveRating);

  // console.log(starship);

  // //Save to localStorage  
  var savedStarship = starship;
  var jsonString = JSON.stringify(savedStarship);
  localStorage.setItem('savedStarship', jsonString);  
} 


var handleSelectChange = function() {
    var selection = starships.results;
    var starship = selection.find(function(newStarship) {
      return this.value === newStarship.name;
    }.bind(this));
    populateDetails(starship);  
}

window.addEventListener('load', app);
