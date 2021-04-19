//  Creating an IIFE to house the pokemonList
let pokemonRepository = (function(){
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
//  Creating a variable for the modal container as it is used in multiple places
  let modalContainer = document.querySelector('#modal-container');
//  Function to return the pokemonList array
  function getAll() {
    return pokemonList;
  }
//  In order to check the validity of pokemon properties when adding pokemon, I need a function to compare array values
  function areArraysEqual(array1, array2) {
    let isEqual = true;
    array1.forEach(function(itemInArray1) {
      if (!array2.includes(itemInArray1)) {
        isEqual = false;
      }
    });
    return isEqual;
  }
//  Function to add pokemon to the pokemonList array
  function add(pokemon) {
    let pokemonKeys = Object.keys(pokemon);
    let requiredKeys = ['name', 'detailsUrl'];
    let result = areArraysEqual(requiredKeys, pokemonKeys);
    if (typeof pokemon === 'object' && result === true) {
        pokemonList.push(pokemon);
    }
  }
//  Function to add a new item to the list of pokemon
  function addListItem(pokemon) {
    let outputList = document.querySelector('ul');
    let outputListItem = document.createElement('li');
    let button = document.createElement('button');

    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    outputListItem.appendChild(button);
    outputList.appendChild(outputListItem);
    addButtonListener(button, pokemon);
  }
// Function to create event listeners on newly created buttons
  function addButtonListener(button, pokemon) {
    button.addEventListener('click', function(){
      showDetails(pokemon);
    });
  }
//  Function to generate and display details of a pokemon when clicked
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function(){

    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.innerText = 'x';
    closeButton.addEventListener('click', hideDetails);

    let title = document.createElement('h1');
    title.innerText = pokemon.name;

    let content = document.createElement('p');
    content.innerText = ('height: '+ pokemon.height);

    let image = document.createElement('img');
    image.src = pokemon.imgUrl;

    modal.appendChild(closeButton);
    modal.appendChild(title);
    modal.appendChild(content);
    modal.appendChild(image);
    modalContainer.appendChild(modal);
    modalContainer.classList.add('visible');
    });
  }
//  Function to hide pokemon details when the close button in the modal is clicked
  function hideDetails () {
    modalContainer.classList.remove('visible');
  }
// Adding an event listener to the window to close the modal when the user presses 'Escape'
  window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalContainer.classList.contains('visible')) {
      hideDetails();
    }
  });
// Adding an event listener to the modal container to close the modal if the user clicks outside the modal
  modalContainer.addEventListener('click', function(e) {
    if (e.target === modalContainer) {
      hideDetails();
    }
  });
//  Function to allow users to search for a pokemon just using name
  function find(pokemonName) {
    let found = pokemonList.filter(pokemon => pokemon.name === pokemonName);
    return found;
  }
//  Function to load pokemon data from the pokeapi
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
//  Function to load pokemon details from the detailsUrl for a selected pokemon
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
    addButtonListener: addButtonListener,
    showDetails: showDetails,
    find: find,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

//  Calling the loadList function to retrieve data prior to rendering the page
pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
  });
});
