import { NextRequest, NextResponse } from "next/server";

export async function GET (req : NextRequest){

        const params = req.nextUrl.searchParams
        const guessName = params.values().next().value


        const fetchPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${guessName}`,{cache : 'no-store'})
        const pokemon = await fetchPokemon.json()

        const fetchSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${guessName}`,{cache:"no-cache"})
        const species = await fetchSpecies.json();

        async function getTypes(){
                if(pokemon.types.length == 1){
                        const type1 = pokemon.types[0].type.name;
                        const type2 = "aucun"
                        return [type1,type2]
                }else{
                        const type1 = pokemon.types[0].type.name;
                        const type2 = pokemon.types[1].type.name;
                        return [type1,type2]
                }
        }

        async function getEvo(){
                const fetchEvoChain = await fetch(species.evolution_chain.url,{cache:"no-cache"})
                const EvoChain = await fetchEvoChain.json()
                if(EvoChain.chain.species.name === pokemon.name){
                        return "1";
                }else if((EvoChain.chain.evolves_to[0].species.name) === pokemon.name){
                        return "2"
                }else{
                        return "3"
                }
        }

        async function getHabitat(){
                if(species.habitat != null){
                        return species.habitat.name;
                }
                else{
                        return "aucun";
                }
                }

        const name = pokemon.name;
        const img = pokemon.sprites.front_default;
        
        const [type1,type2] = await getTypes();

        const color = species.color.name;
        const evo = await getEvo();
        const gen = species.generation.name;
        const habitat = await getHabitat();


        const result = NextResponse.json([name,img,type1,type2,color,evo,gen,habitat]);
        return result ;
}