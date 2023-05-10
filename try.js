// let load = 30;
// let currentLoad = 0;

// async function init(){
//     loadPokemonInArray();
// }

// async function loadPokemonInArray(){
//     let url = `https://pokeapi.co/api/v2/pokemon/?limit=100000&offset=0`;
//     let response = await fetch(url);
//     let responsePokemon = await response.json();
//     let allPokemon = responsePokemon['results'];
//     globalThis.allPokemon = allPokemon;
//     console.log(allPokemon)
//     loadPokemon();
// }

// async function loadPokemon(){
//     for (let i = currentLoad; i < load.length; i++) {
//         currentLoad++;
//         let currentPokemonUrl = allPokemon[i]['url'];
//         let thisPokemon = await fetch(currentPokemonUrl);
//         let currentPokemon = await thisPokemon.json();

//         renderPokemonCarts(currentPokemon);
//     }
// }