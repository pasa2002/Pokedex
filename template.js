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



function openPokemonHtmlTemp(pokemonName, pokemonImage, typeOne, pokemonId) {
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
    <span class="id">${pokemonId}</span>
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
                <p>6,9kg</p>
            </div>
                <span>weight</span>
            <img class="divider" src="./images/Divider.png" alt="">
        </div>

        <div class="height" class="height">
            <div class="height-subcontainer">
            <img src="./images/height.png" alt="">
            <p>0.7m</p>
        </div>
            <span>height</span>
        </div>
    </div>
    </div>

    <div class="base-stats">
        
    </div>
</div>
</div>
    `;
}



{/* <div class="poke-popup poke-popup${pokemonId}">
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
            <a onclick="renderStats(${pokemonId})">Base Stats</a>
            <a onclick="renderMoves(${pokemonId})">Moves</a>
        </div>
        <div id="next" onclick="nextPokemon(${pokemonId})">
            <i class="fa-solid fa-forward"></i>
        </div>
    </div>
    <div id="base-stats"></div>
    <div id="poke-moves" class="hide"></div>
</div>
</div> */}