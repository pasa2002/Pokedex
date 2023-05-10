let currentPokemon;
let loadedPokemon = 30;
let loadedPokemonCounter = 1;
let allPokemon = [];

function sortAlphabet() {
    document.getElementById('sort-id').classList.add('hide');
    document.getElementById('sort-alphabet').classList.remove('hide');
}

function sortNumber() {
    document.getElementById('sort-id').classList.remove('hide');
    document.getElementById('sort-alphabet').classList.add('hide');
}

async function showPokemon() {
    for (let i = 1; i < 20; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        console.log(currentPokemon);
        let pokemonName = currentPokemon['name'];
        let pokemonId = currentPokemon['id'];
        let pokemonImage = currentPokemon['sprites']['front_default'];
        allPokemon.push(currentPokemon['name']);
        renderPokemonCard(pokemonName, pokemonId, pokemonImage);
        console.log(allPokemon);
    }
}

function renderPokemonCard(pokemonName, pokemonId, pokemonImage) {
    let pokemonCard = document.getElementById('card');

    pokemonCard.innerHTML = `
        <div onclick="openPokemonStats()" class="section-one">
            <p id="poke-id"></p>
            <div class="poke-image">
                <img id="pokemon-image">
            </div>
            <h1 id="poke-name"></h1>
        </div>`;

    document.getElementById('poke-name').innerHTML = pokemonName;
    document.getElementById('poke-id').innerHTML = `# ${pokemonId}`;
    document.getElementById('pokemon-image').src = pokemonImage;
}

function openPokemonStats() {
    document.getElementById('card').classList.add('hide');
    document.getElementById('openCard').classList.remove('hide');
    let openedCard = document.getElementById('openCard');

    openedCard.innerHTML = '';

    // Retrieve the clicked Pokemon's information
    let pokemonId = currentPokemon['id'];
    let pokemonName = currentPokemon['name'];
    let pokemonImage = currentPokemon['sprites']['front_default'];

    //  HTML structure for displaying the Pokemon stats
    openedCard.innerHTML = `
        <div id="card-stats">
            <p id="poke-id">#${pokemonId}</p>
            <div class="poke-image">
                <img id="pokemon-image" src="${pokemonImage}">
            </div>
            <h1 id="poke-name">${pokemonName}</h1>
            <!-- Add additional HTML elements here to display the Pokemon stats -->
        </div>
    `;
}

