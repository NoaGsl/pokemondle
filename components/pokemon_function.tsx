
const electedPokemon = Math.floor(Math.random() * 721 +1);

async function getPokemonNames(){
    const fetchNames = await fetch("/api/pokemonlist")
    const pokemonNames = await fetchNames.json()
    console.log(pokemonNames)
    return pokemonNames
}

async function getElectedPokemon(){
    const fetchData = await fetch(`/api/pokemon?name=${electedPokemon}`)
    const pokemondata = await fetchData.json()
    console.log(pokemondata)
    return pokemondata;
}

export { getElectedPokemon, getPokemonNames }