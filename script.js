let currentPokemon = [];
let loadedPokemon = 40;
let loadedPokemonCounter = 1;
let allPokemon = [];
let arrangePokemonId = [];
let arrangePokemonAlphabet = [];

async function fetchPokemonUrl() {
    displayLoadingMessage();
    for (let i = loadedPokemonCounter; i <= loadedPokemon; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        pushPokemonToAllPokemon(currentPokemon);
        pushLetterAndId(currentPokemon.id, currentPokemon.name.charAt(0)); // Add this line to populate the sorting arrays
    }
    renderPokemonCards();
    }

function removeLoadMoreBtn(){
    document.getElementById('load-more').classList.add('hide');
    document.getElementById('loading-more').classList.remove('hide');
}

function addLoadMoreBtn(){
    document.getElementById('load-more').classList.remove('hide');
    document.getElementById('loading-more').classList.add('hide');
}

async function loadMorePokemons() {
    // displayLoadMoreMessage();
    removeLoadMoreBtn();
    const addMorePokemon = loadedPokemon + 30;
    setTimeout(async function(){
        for (let i = loadedPokemon + 1; i <= addMorePokemon; i++) {
            let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            let response = await fetch(url);
            let currentPokemon = await response.json();
            pushPokemonToAllPokemon(currentPokemon);
            pushLetterAndId(currentPokemon.id, currentPokemon.name.charAt(0));
        }
        loadedPokemon += 30;
        loadedPokemonCounter = loadedPokemon + 1; // Update the value of loadedPokemonCounter
        renderPokemonCards(); // Render the newly loaded Pokemon cards
        // hideLoadingMoreMessage();
        addLoadMoreBtn();
        document.getElementById('load-more').classList.remove('hide');
    },8000)
    }

function fetchPokemon(currentPokemon) {
    let pokemonName = currentPokemon['name'];
    let firstLetterPokemon = pokemonName.charAt(0);
    let pokemonId = currentPokemon['id'];
    let typeOne = currentPokemon['types'][0]['type']['name'];
    let typeTwo = currentPokemon['types'][1]['type']['name'];
    console.log(typeTwo);
    
    pushLetterAndId(pokemonId, firstLetterPokemon);
    addBgColor(typeOne, pokemonId);
    }

function pushPokemonToAllPokemon(currentPokemon){
    allPokemon.push({
        currentPokemon
    })
}

function pushLetterAndId(pokemonId, firstLetterPokemon) {
    arrangePokemonId.push(pokemonId);
    arrangePokemonAlphabet.push(pokemonId.toString()); // Store IDs as strings for sorting
}

function checkFirstOrLastPokemon(pokemonId) {
    const currentIndex = allPokemon.findIndex(p => p.currentPokemon.id === pokemonId);

    const previousButton = document.getElementById('previous');
    const nextButton = document.getElementById('next');

    if (currentIndex === 0) {
        previousButton.classList.remove('hover-red');
    } else {
        previousButton.classList.add('hover-red');
    }

    if (currentIndex === allPokemon.length - 1) {
        nextButton.classList.remove('hover-red');
    } else {
        nextButton.classList.add('hover-red');
    }
    }

function renderPokemonCards() {
    let pokemonCard = document.getElementById('card');

    pokemonCard.innerHTML = '';

    setTimeout(function(){
        for (let i = 0; i < allPokemon.length; i++) {
            let pokemonName = allPokemon[i].currentPokemon['name'];
            let pokemonId = allPokemon[i].currentPokemon['id'];
            let pokemonImage = allPokemon[i].currentPokemon['sprites']['other']['official-artwork']['front_default'];
            let typeOne = allPokemon[i].currentPokemon['types'][0]['type']['name'];
            pokemonCard.innerHTML += landingPagePokemonCards(pokemonName, pokemonId, pokemonImage, typeOne);
            addBgColor(typeOne, pokemonId); 
        }
        hideLoadingMessage();
        }, 2000);
    }

function displayLoadingMessage(){
    let loadingMessage = document.getElementById('load-animation');
    loadingMessage.innerHTML = `
        <h3>
            Loading Your First 40 Pokemons
        </h3>
        <lottie-player class="load-screen" src="https://lottie.host/6038c1dc-68d5-4ee1-b8f6-20befe116598/iZgBjes3nt.json" background="transparent" speed="1" style="width: 800px; height: 800px;" loop autoplay></lottie-player>
    `;
}

function hideLoadingMessage(){
    let hideMessage = document.getElementById('load-animation');
    hideMessage.innerText = '';
}


function popupState(){
    document.getElementById('card').classList.add('low-opacity');
    document.getElementById('openCard').classList.remove('hide');
    document.querySelector('.btn-more').classList.add('hide');
    document.querySelector('body').classList.add('overflow-hidden');
} 

function renderStats(pokemonId){
    document.getElementById('base-stats').classList.remove('hide');
    document.getElementById('poke-moves').classList.add('hide');
    const pokemon = allPokemon.find(p => p.currentPokemon.id === pokemonId);
    let baseStats = document.getElementById('base-stats');
    baseStats.innerHTML = '';
    let chosenPokemonStats = pokemon['currentPokemon']['stats'];

    for (let i = 0; i < chosenPokemonStats.length; i++) {
        const stat = chosenPokemonStats[i];
        baseStats.innerHTML += `
        <div class="base">
        <div class="bar">
                <p>${stat['stat']['name']}</p>
                <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="150">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: ${stat['base_stat']}%">${stat['base_stat']}</div>
                </div>
            </div>
        </div>
        `
    }
}

function renderMoves(pokemonId){
    document.getElementById('base-stats').classList.add('hide');
    document.getElementById('poke-moves').classList.remove('hide');
    const pokemon = allPokemon.find(p => p.currentPokemon.id === pokemonId);
    let showMoves = document.getElementById('poke-moves');
    showMoves.innerHTML = '';
    let chosenPokemonMoves = pokemon['currentPokemon']['moves'];

    for (let i = 0; i < chosenPokemonMoves.length; i++) {
        const moves = chosenPokemonMoves[i];
        showMoves.innerHTML += `
                <div class="move-name">
                    ${moves['move']['name']}
                </div>
        `
    }
}

function openPokemonStats(pokemonId) {
    const pokemon = allPokemon.find(p => p.currentPokemon.id === pokemonId);
    
    const { name, sprites, types } = pokemon.currentPokemon;
    const pokemonName = name;
    const pokemonImage = sprites.other['official-artwork']['front_default'];
    const typeOne = types[0].type.name;

    const popupHtml = openPokemonHtmlTemp(pokemonName, pokemonImage, typeOne, pokemonId);
    document.getElementById('openCard').innerHTML = popupHtml;
    loadedPokemonCounter = allPokemon.findIndex(p => p.currentPokemon.id === pokemonId) + 1;
    checkFirstOrLastPokemon(pokemonId)
    popupState();
    renderStats(pokemonId);
    renderMoves(pokemonId);
}

function sortAlphabet(searchQuery) {
    document.getElementById('sort-id').classList.add('hide');
    document.getElementById('sort-alphabet').classList.remove('hide');
    // Check if searchQuery is defined and a string 
    if (searchQuery && typeof searchQuery === 'string') {
        const filteredPokemon = allPokemon.filter(pokemon => pokemon.currentPokemon.name.toLowerCase().startsWith(searchQuery.toLowerCase()));       
        // Sort the filteredPokemon array alphabetically based on the Pokémon names
        filteredPokemon.sort((a, b) => a.currentPokemon.name.localeCompare(b.currentPokemon.name));
        // Get the sorted Pokémon IDs to rearrange the cards
        const arrangedArray = filteredPokemon.map(pokemon => pokemon.currentPokemon.id);
        rearrangePokemonCards(arrangedArray);
    } else {
        // If searchQuery is not defined or not a string, sort allPokemon array alphabetically
        allPokemon.sort((a, b) => a.currentPokemon.name.localeCompare(b.currentPokemon.name));
        // Get the sorted Pokémon IDs to rearrange the cards
        const arrangedArray = allPokemon.map(pokemon => pokemon.currentPokemon.id);
        rearrangePokemonCards(arrangedArray);
    }
}

function sortNumber(searchQuery) {
    document.getElementById('sort-id').classList.remove('hide');
    document.getElementById('sort-alphabet').classList.add('hide');

    // Check if searchQuery is defined and a string
    if (searchQuery && typeof searchQuery === 'string') {
        const filteredPokemon = allPokemon.filter(pokemon =>
            pokemon.currentPokemon.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
        // Get the sorted Pokémon IDs to rearrange the cards
        const arrangedArray = filteredPokemon.map(pokemon => pokemon.currentPokemon.id).sort((a, b) => a - b);
        rearrangePokemonCards(arrangedArray);
    } else {
        // If searchQuery is not defined or not a string, sort allPokemon array by ID
        arrangePokemonId.sort((a, b) => a - b);
        rearrangePokemonCards(arrangePokemonId);
    }
}

function rearrangePokemonCards(arrangedArray) {
    const pokemonCard = document.getElementById('card');
    pokemonCard.innerHTML = '';
    // Loop through the arranged array and render the Pokémon cards
    for (let i = 0; i < arrangedArray.length; i++) {
    const pokemonId = arrangedArray[i];
    const pokemon = allPokemon.find(p => p.currentPokemon.id === pokemonId);
    if (pokemon) {
        const { name, sprites, types } = pokemon.currentPokemon;
        const typeOne = types[0].type.name;
        const pokemonImage = sprites.other['official-artwork']['front_default'];
        const pokemonCardHtml = landingPagePokemonCards(name, pokemonId, pokemonImage, typeOne);
        pokemonCard.innerHTML += pokemonCardHtml;
        addBgColor(typeOne, pokemonId); // Update this line
    }
    }
}

function closePopup(){
    document.getElementById('card').classList.remove('low-opacity');
    document.getElementById('openCard').classList.add('hide');
    document.querySelector('.btn-more').classList.remove('hide');
    document.querySelector('body').classList.remove('overflow-hidden');
}

function addBgColor(typeOne, pokemonId) {
    const section = document.querySelector(`.section-one${pokemonId}`);
    if (section) {
        const color = getColorForType(typeOne);
        section.style.backgroundColor = color;
    }
}

function getColorForType(typeOne) {
    switch (typeOne) {
        case 'grass':
            return "rgba(73, 207, 174, 1)";
        case 'fire':
            return "rgba(252, 108, 110,1)";
        case 'water':
            return "rgba(132, 199, 254, 1)";
        case 'electric':
            return "rgba(254, 218, 120, 1)";
        case 'normal':
            return "rgba(183, 183, 170, 1)";
        case 'fighting':
            return "rgba(177, 82, 71, 1)";
        case 'flying':
            return "rgba(121, 168, 241, 1)";
        case 'poison':
            return "rgba(156, 88, 148, 1)";
        case 'ground':
            return "rgba(236, 206, 89, 1)";
        case 'rock':
            return "rgba(205, 189, 114, 1)";
        case 'bug':
            return "rgba(196, 207, 34, 1)";
        case 'ghost':
            return "rgba(116, 114, 213, 1)";
        case 'psychic':
            return "rgba(249, 95, 173, 1)";
        case 'ice':
            return "rgba(150, 242, 255, 1)";
        case 'dragon':
            return "rgba(117, 103, 201, 1)";
        case 'dark':
            return "rgba(143, 106, 88, 1)";
        case 'steel':
            return "rgba(196, 195, 217, 1)";
        case 'fairy':
            return "rgba(249, 177, 254, 1)";
        default:
            return null;
}
}

function prevPokemon(pokemonId) {
    if (pokemonId > 1) {
        pokemonId--;
        const pokemon = allPokemon.find(p => p.currentPokemon.id === pokemonId);
        const { name, sprites, types } = pokemon.currentPokemon;
        let chosenPokemonStats = pokemon['currentPokemon']['stats'];
        let chosenPokemonMoves = pokemon['currentPokemon']['moves'];
        const pokemonName = name;
        const pokemonImage = sprites.other['official-artwork']['front_default'];
        const typeOne = types[0].type.name;

        document.getElementById('openCard').innerHTML = openPokemonHtmlTemp(pokemonName, pokemonImage, typeOne, pokemonId, chosenPokemonStats,chosenPokemonMoves);
        renderStats(pokemonId);
        renderMoves(pokemonId);
        checkFirstOrLastPokemon(pokemonId)
    }

}

function nextPokemon(pokemonId) {
    const nextId = pokemonId + 1;
    if (nextId <= loadedPokemon) {
        const pokemon = allPokemon.find(p => p.currentPokemon.id === nextId);
        let chosenPokemonStats = pokemon['currentPokemon']['stats'];
        let chosenPokemonMoves = pokemon['currentPokemon']['moves'];
        const { name, sprites, types } = pokemon.currentPokemon;
        const pokemonName = name;
        const pokemonImage = sprites.other['official-artwork']['front_default'];
        const typeOne = types[0].type.name;

        document.getElementById('openCard').innerHTML = openPokemonHtmlTemp(pokemonName, pokemonImage, typeOne, nextId,chosenPokemonStats,chosenPokemonMoves);
        renderStats(pokemonId);
        renderMoves(pokemonId);
        checkFirstOrLastPokemon(pokemonId)
    }
}

function searchPokemon(query) {
    const filteredPokemon = allPokemon.filter(pokemon => {
        const pokemonName = pokemon.currentPokemon.name.toLowerCase();
        return pokemonName.startsWith(query.toLowerCase());
    });
    renderFilteredPokemonCards(filteredPokemon);
}

function renderFilteredPokemonCards(filteredPokemon) {
    const pokemonCard = document.getElementById('card');
    pokemonCard.innerHTML = '';

    filteredPokemon.forEach(pokemon => {
        const { name, id, sprites, types } = pokemon.currentPokemon;
        const pokemonName = name;
        const pokemonImage = sprites.front_default;
        const typeOne = types[0].type.name;
        pokemonCard.innerHTML += landingPagePokemonCards(pokemonName, id, pokemonImage, typeOne);
        addBgColor(typeOne, id);
    });
}

const searchInput = document.getElementById('search');
const searchIcon = document.querySelector('.fa-magnifying-glass');

searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const query = searchInput.value.trim();
        searchPokemon(query);
    }
});

searchIcon.addEventListener('click', function() {
    const query = searchInput.value.trim();
    searchPokemon(query);
});



