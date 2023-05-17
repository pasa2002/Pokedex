function landingPagePokemonCards(pokemonName, pokemonId, pokemonImage, currentPokemon) {
    return `
        <div class="section-one section-one${pokemonId}" onclick="openPokemonStats(${pokemonId})">
        <p id="poke-id-${pokemonId}">#${pokemonId}</p>
        <div class="poke-image">
            <img src="images/pokeball_bg.png" class="absolute">
            <img id="pokemon-image-${pokemonId}" src="${pokemonImage}" alt="${pokemonName}">
        </div>
        <h1 id="poke-name-${pokemonId}">${pokemonName}</h1>
        </div>`;
    }



function openPokemonHtmlTemp(pokemonName, pokemonImage, typeOne, pokemonId) {
    const bgColor = getColorForType(typeOne);
    return `
        <div class="poke-popup poke-popup${pokemonId}">
            <div class="background-popup${pokemonId} background-color-popup" style="background-color: ${bgColor}">
                <div class="poke-popup-header">
                    <h3>${pokemonName}</h3>
                    <a onclick="closePopup()">X</a>
                </div>
                <h3>#${pokemonId}</h3>
                <div class="img-type-container">
                    <img src="${pokemonImage}" alt="${pokemonName}">
                    <img src="images/pokeball_bg.png" class="absolute-open">
                    <button>${typeOne}</button>
                </div>
            </div>
            <div class="poke-stats">
                <div class="container-topic">
                    <div id="previous" onclick="prevPokemon(${pokemonId})">
                        <i class="fa-solid fa-backward"></i>
                    </div>
                    <div class="links">
                        <a onclick="getStats(${pokemonId})">Base Stats</a>
                        <a onclick="getMoves(${pokemonId})">Moves</a>
                    </div>
                    <div id="next" onclick="nextPokemon(${pokemonId})">
                        <i class="fa-solid fa-forward"></i>
                    </div>
                </div>
                <div id="base-stats"></div>
                <div id="poke-moves" class="hide"></div>
            </div>
        </div>
    `;
}

