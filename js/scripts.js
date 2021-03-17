let pokemonList = [
  {name: 'Charmander', height: 2, types:['fire'], weaknesses:['water', 'ground', 'rock']},
  {name: 'Pikachu', height: 1.33, types:['electric'], weaknesses:['ground']},
  {name: 'Jigglypuff', height: 1.67, types:['normal', 'fairy'], weaknesses:['steel', 'poison']},
  {name: 'Wigglytuff', height: 3.25, types:['normal', 'fairy'], weaknesses:['steel', 'poison']}
];

// create a for loop that iterates over each item in pokemonList and returns its name and height
for (let i = 0; i < pokemonList.length; i++) {
//  document.write((pokemonList[i].name + ' ' + '(height: ' + pokemonList[i].height) + ')');
//  using a template literal instead:
  document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height})`);
}
