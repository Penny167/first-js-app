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
  let pokemonList = [
    {name: 'Charmander', height: 2, types:['fire'], weaknesses:['water', 'ground', 'rock']},
    {name: 'Pikachu', height: 1.33, types:['electric'], weaknesses:['ground']},
    {name: 'Jigglypuff', height: 1.67, types:['normal', 'fairy'], weaknesses:['steel', 'poison']},
    {name: 'Wigglytuff', height: 3.25, types:['normal', 'fairy'], weaknesses:['steel', 'poison']}
  ];
//  The IIFE will return an object with 3 keys
//  I am separating the functions that define the values of the keys from the return statement
  function getAll() {
    return pokemonList;
  }
//  Adding conditional to 'add' function to ensure that only objects can be passed as arguments
/* Adding second condition to check that pokemon must also have expected properties. In order
to ensure the key names match exactly I have converted the pokemon object keys array to a string
and stored this as a variable that I am then comparing to my defined string of required keys  */
  function add(pokemon) {
    let pokemonKeys = Object.keys(pokemon).toString();
    if (typeof pokemon === 'object' && pokemonKeys === 'name,height,types,weaknesses') {
        pokemonList.push(pokemon);
    }
  }
//  Adding a third function to allow users to search for a pokemon just using name
  function find(pokemonName) {
    let found = pokemonList.filter(pokemon => pokemon.name === pokemonName);
    return found;
  }

  return {
    getAll: getAll,
    add: add,
    find: find
  };
})();

//  This is a new pokemon that I am using to test whether the conditions of the add function work
pokemonRepository.add({name: 'Ivysaur', height: 1, types:['grass', 'poison'], weaknesses: ['fire', 'psychic', 'flying', 'ice']});

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

pokemonRepository.getAll().forEach(function(pokemon) {
  let pokemonStats = `${pokemon.name} (height: ${pokemon.height})`;
  let pokemonHeight = pokemon.height;
  if (pokemonHeight > 3) {
    document.write(`<p>${pokemonStats} Wow,that's big!</p>`);
    } else document.write(`<p>${pokemonStats}</p>`);
});
