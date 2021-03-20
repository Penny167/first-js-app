let pokemonList = [
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
for (let i = 0; i < pokemonList.length; i++) {
  let pokemonStats = `${pokemonList[i].name} (height: ${pokemonList[i].height})`;
//  document.write('<p>' + pokemonStats + '</p>');

/*  now I am declaring a new variable in order to compare heights for the purpose
of highlighting "special" pokemon */
  let pokemonHeight = pokemonList[i].height;
/*  now I am redefining the content that I want to display to include the result
of the conditional statement within the <p> tags  */
/*  if (pokemonHeight > 3) {
    document.write('<p>' + pokemonStats + " Wow,that's big!" + '</p>');
  } else document.write('<p>' + pokemonStats + '</p>');
}  */

//  now I am rewriting the above code using a template literal to improve readability

  if (pokemonHeight > 3) {
    document.write(`<p>${pokemonStats} Wow,that's big!</p>`);
  } else document.write(`<p>${pokemonStats}</p>`);
}
