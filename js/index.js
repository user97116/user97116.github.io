var cardGrid = document.querySelector(".card-grid")


const url = "https://pokeapi.co/api/v2/pokemon/"

initApi();

async function initApi() {
    try {
        var result = await axios.get(url);
        var pokemonNamesList = result.data.results
    } catch (error) {
        console.log("Server error!")
    }
    await pokemonNamesList.forEach(async el => {
        await getPokemon(el.url)
    })
}

async function getPokemon(url) {
    try {
        var result = await axios.get(url);
        var card = document.createElement("div")
        card.className = "card"
        var img = document.createElement("div")
        img.className = "image"
        console.log(result.data.sprites.front_default);
        img.style.backgroundImage = `url(${result.data.sprites.front_default})`
        card.appendChild(img)
        var text = document.createElement("div")
        text.className = "text"
        text.innerText = result.data.name
        card.appendChild(text)
        cardGrid.appendChild(card)
    } catch (error) {
        console.log("Server error!")
    }
}