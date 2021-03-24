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
//  The IIFE will return an object with 2 keys
//  I am separating the functions that define the values of the keys from the return statement
  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  return {
    getAll: getAll,
    add: add    
  };
})();

//replace for loop with forEach() function
pokemonList.forEach(function(pokemon) {
  let pokemonStats = `${pokemon.name} (height: ${pokemon.height})`;
  let pokemonHeight = pokemon.height;
  if (pokemonHeight > 3) {
    document.write(`<p>${pokemonStats} Wow,that's big!</p>`);
  } else document.write(`<p>${pokemonStats}</p>`);
});
