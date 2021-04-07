/*  let pokemonList = [
  {name: 'Charmander', height: 2, types:['fire'], weaknesses:['water', 'ground', 'rock']},
  {name: 'Pikachu', height: 1.33, types:['electric'], weaknesses:['ground']},
  {name: 'Jigglypuff', height: 1.67, types:['normal', 'fairy'], weaknesses:['steel', 'poison']},
  {name: 'Wigglytuff', height: 3.25, types:['normal', 'fairy'], weaknesses:['steel', 'poison']}
];

//  create a for loop that iterates over each item in pokemonList and returns its name and height
/*  for (let i = 0; i < pokemonList.length; i++) {
//  document.write((pokemonList[i].name + ' ' + '(height: ' + pokemonList[i].height) + ')');
//  using a template literal instead:
document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height})`);
}  */

/*  this time, I am storing my result as a variable so that I can neatly include
it within html <p> tags. This will also display the results on separate lines  */
/*  for (let i = 0; i < pokemonList.length; i++) {
  let pokemonStats = `${pokemonList[i].name} (height: ${pokemonList[i].height})`;
//  document.write('<p>' + pokemonStats + '</p>');

/*  now I am declaring a new variable in order to compare heights for the purpose
of highlighting "special" pokemon */
/*  let pokemonHeight = pokemonList[i].height;
/*  now I am redefining the content that I want to display to include the result
of the conditional statement within the <p> tags  */
/*  if (pokemonHeight > 3) {
    document.write('<p>' + pokemonStats + " Wow,that's big!" + '</p>');
  } else document.write('<p>' + pokemonStats + '</p>');
}  */

//  now I am rewriting the above code using a template literal to improve readability

/*  if (pokemonHeight > 3) {
    document.write(`<p>${pokemonStats} Wow,that's big!</p>`);
  } else document.write(`<p>${pokemonStats}</p>`);
}

/*  At this stage, I am going to copy all of my current functioning code below
without the comments to work on the next set of changes, whilst preserving
the old version including the comments in a commented out version above  */

//  Creating an IIFE to house the pokemonList
let pokemonRepository = (function(){
/* I am now deleting the array contents so these can be replaced by the dynamic data from
the pokeapi (NB I have a copy of the original static data retained at the top of the file)  */
  let pokemonList = [];
//  Storing the url of the api in a variable
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
//  Creating a variable for the modal container as it is used in multiple places
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
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
/*  The code below is superseded by the additional function addButtonListener,
which has been created below to separate adding new items from adding new event listeners  */
/*    button.addEventListener('click', function(){
      showDetails(pokemon);
    });  */
    outputListItem.appendChild(button);
    outputList.appendChild(outputListItem);
    addButtonListener(button, pokemon);
  }

// Adding a function to create event listeners on newly created buttons
  function addButtonListener(button, pokemon) {
    button.addEventListener('click', function(){
      showDetails(pokemon);
    });
  }

//  Adding a function to allow users to see details of a pokemon when clicked
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function(){
    console.log(pokemon);
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
    addButtonListener: addButtonListener,
    showDetails: showDetails,
    find: find,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

//  This is a new pokemon that I am using to test whether the conditions of the add function work
/*  Commenting this out for that I am loading pokemons directly from the api data
pokemonRepository.add({name: 'Ivysaur', height: 1, types:['grass', 'poison'], weaknesses: ['fire', 'psychic', 'flying', 'ice']});  */

//  I am commenting out this version of the forEach code block to create a fresh version for task 6
//  replace for loop with forEach() function
/*  update array name in the forEach function to reference the array via the getAll
key within the IIFE 'pokemonRepository'  */
/*  pokemonRepository.getAll().forEach(function(pokemon) {
  let pokemonStats = `${pokemon.name} (height: ${pokemon.height})`;
  let pokemonHeight = pokemon.height;
  if (pokemonHeight > 3) {
    document.write(`<p>${pokemonStats} Wow,that's big!</p>`);
  } else document.write(`<p>${pokemonStats}</p>`);
});  */

//  Calling the loadList function to retrieve data prior to rendering the page
pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
  });
});
