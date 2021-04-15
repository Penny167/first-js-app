//  Creating an IIFE to house the pokemonList
let pokemonRepository = (function(){
  let pokemonList = [];
//  Storing the url of the api in a variable
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
//  Creating a variable for the modal container
  let modalContainer = document.querySelector('#modal-container');
//  The IIFE will return an object with keys for each function
//  I am separating the functions that define the values of the keys from the return statement
  function getAll() {
    return pokemonList;
  }
//  Adding conditional to 'add' function to ensure that only objects can be passed as arguments
/*  Adding second condition to check that pokemon must also have expected properties. In order
to ensure the key names match exactly I have converted the pokemon object keys array to a string
and stored this as a variable that I am then comparing to my defined string of required keys  */
/*  I am now revising the add function to amend the list of required keys and improve the logic
for checking these; the function will now loop over the array of required keys and check that
this corresponds to the keys included rather than comparing array values converted to strings.
Note that this requires an additional function to compare the array values.  */
  function areArraysEqual(array1, array2) {
    let isEqual = true;
    array1.forEach(function(itemInArray1) {
      if (!array2.includes(itemInArray1)) {
        isEqual = false;
      }
    });
    return isEqual;
  }

  function add(pokemon) {
    let pokemonKeys = Object.keys(pokemon);
    let requiredKeys = ['name', 'detailsUrl'];
    let result = areArraysEqual(requiredKeys, pokemonKeys);
    if (typeof pokemon === 'object' && result === true) {
        pokemonList.push(pokemon);
    }
  }

//  Adding a new addListItem() function
  function addListItem(pokemon) {
    let outputList = document.querySelector('ul');
    let outputListItem = document.createElement('li');
    outputListItem.classList.add('list-group-item');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button', 'btn', 'btn-primary');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal-container');
/*  The code below is superseded by the additional function addButtonListener,
which has been created below to separate adding new items from adding new event listeners  */
/*    button.addEventListener('click', function(){
      showDetails(pokemon);
    });  */
    outputListItem.appendChild(button);
    outputList.appendChild(outputListItem);
//  Commenting this out as new button attributes will open Bootstrap modal
//  Reinstating button because to create the modal content we still need a mechanism to invoke the showPokemon function
    addButtonListener(button, pokemon);
  }

// Adding a function to create event listeners on newly created buttons
/*  I am commenting out all functionality related to the custom modal for now,
in order to implement the Bootstrap modal  */
//  Rewriting this function to point at the new showPokemon function
  function addButtonListener(button, pokemon) {
    button.addEventListener('click', function(){
      showPokemon(pokemon);
    });
  }

//  Adding a new function to show pokemon details in a Bootstrap modal
  function showPokemon(pokemon) {
    loadDetails(pokemon).then(function(){

    let modalHeader = $('.modal-header');
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');

    modalTitle.empty();
    modalBody.empty();

    let name = $('<h5>' + pokemon.name + '</h5>');
    let height = $('<p>' + 'height: ' + pokemon.height + '</p>');
    let image = $('<img>').attr({'src':pokemon.imgUrl, 'width':'50%'});

    modalTitle.append(name);
    modalBody.append(height, image);
    });
  }

//  Adding a function to allow users to search for a pokemon just using name
  function find(pokemonName) {
    let found = pokemonList.filter(pokemon => pokemon.name === pokemonName);
    return found;
  }

//  Adding a function to load pokemon data from the pokeapi asynchronously
  function loadList() {
    return fetch(apiUrl).then(function(response){
      return response.json();
    }).then(function(pokemonData){
      pokemonData.results.forEach(function(object){
        let pokemon = {
          name: object.name,
          detailsUrl: object.url
        };
        add(pokemon);
      });
    }).catch(function(error){
      console.log(error);
    });
  }

//  Adding a function to load pokemon details from the detailsUrl for a selected pokemon
  function loadDetails(pokemon) {
    return fetch(pokemon.detailsUrl).then(function(response){
      return response.json();
    }).then(function(pokemonDetails){
      pokemon.height = pokemonDetails.height;
      pokemon.imgUrl = pokemonDetails.sprites.front_default;
      pokemon.types = pokemonDetails.types;
    }).catch(function(error){
      console.log(error);
    });
  }


  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
//    addButtonListener: addButtonListener,
//    showDetails: showDetails,
    find: find,
    loadList: loadList,
    loadDetails: loadDetails,
    showPokemon: showPokemon
  };
})();

//  Calling the loadList function to retrieve data prior to rendering the page
pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
  });
});
