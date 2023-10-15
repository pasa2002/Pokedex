function landingPagePokemonCards(pokemonName, pokemonId, pokemonImage) {
    return `
        <div class="section-one section-one${pokemonId}" onclick="openPokemonStats(${pokemonId})">
            <p class="id" id="poke-id-${pokemonId}">#${pokemonId}</p>
            <div class="poke-image">
                <img src="images/pokeball_bg.png" class="absolute">
                <img class="pokemon-image" id="pokemon-image-${pokemonId}" src="${pokemonImage}" alt="${pokemonName}">
            </div>
            <h1 class="name" id="poke-name-${pokemonId}">${pokemonName}</h1>
        </div>`;
    }

    function openPokemonHtmlTemp(pokemonName, pokemonImage, typeOne, pokemonId, pokeWeight, pokeHeight, chosenPokemonMoves) {
        const bgColor = getColorForType(typeOne);
        return `
        <div class="poke-open-card poke-popup${pokemonId}" style="background-color: ${bgColor}">
            <div class="background-logo">
                <img src="./images/pokeball_bg.png" alt="">
            </div>
            <div class="header-open-card">
                <div class="back-btn" onclick="closePopup()">
                    <img src="./images/arrow_back.png" alt="">
                </div>
                <h2 class="header">${pokemonName}</h2>
                <span class="id">#${pokemonId}</span>
            </div>
            <div class="poke-image-open-card">
                <img src="${pokemonImage}" alt="${pokemonName}" width="350px;">
            </div>
            <div id="previous" onclick="prevPokemon(${pokemonId})">
                <img src="./images/left.png" class="left" alt="">
            </div>
            <div id="next" onclick="nextPokemon(${pokemonId})">
                <img src="./images/right.svg" class="right">
            </div>
            <div class="poke-stats">
                <div class="poke-type">
                    <button disabled="disabled" style="background-color: ${bgColor}">${typeOne}</button>
                </div>
                <div class="about">
                    <h2 style="color: ${bgColor}">About</h2>
                    <div class="about-container">
                        <div class="weight">
                            <div class="weight-subcontainer">
                                <img src="./images/weight.png" alt="">
                                <p>${pokeWeight}kg</p>
                            </div>
                            <span>weight</span>
                            <img class="divider" src="./images/Divider.png" alt="">
                        </div>
                        <div class="height">
                            <div class="height-subcontainer">
                                <img src="./images/height.png" alt="">
                                <p>${pokeHeight}m</p>
                            </div>
                            <span>height</span>
                        </div>
                    </div>
                </div>
                <div class="stat-move-container">

                    <div class="toggle-stat-move">
                    <button id="stats-button" class="low-opacity" style="color: ${bgColor}" onclick="renderStats(${pokemonId}, '${typeOne}');highlightStats()">Stats</button>
                    <button id="moves-button" style="color: ${bgColor}" onclick="renderMoves(${pokemonId}, '${typeOne}' ); highlightMoves()">Moves</button>
                    </div>
                    <div class="base-stats">
                        
                        <div  id="base-stats"></div>
                    </div>
                    <div class="move-container">
                        
                        <div  id="poke-moves" class="hide"></div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }