import { NextRequest, NextResponse } from "next/server";

export async function GET (req : NextRequest){

        const params = req.nextUrl.searchParams
        const guessName = params.values().next().value


        const fetchPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${guessName}`,{cache : 'no-store'})
        const pokemon = await fetchPokemon.json()

        const fetchSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${guessName}`,{cache:"no-cache"})
        const species = await fetchSpecies.json();

        async function getTypes(){
                const datatype1 = await fetch(pokemon.types[0].type.url,{cache:"no-cache"})
                const jsonType1 = await datatype1.json();
                if(pokemon.types.length == 1){
                        const type1 = jsonType1.names[3].name;
                        const type2 = "aucun"
                        return [type1,type2]
                }else{
                        const datatype2 = await fetch(pokemon.types[1].type.url,{cache:"no-cache"})
                        const jsonType2 = await datatype2.json();
                        const type1 = jsonType1.names[3].name;
                        const type2 = jsonType2.names[3].name;
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
                if(species.habitat != undefined){
                        const fetchHabitat = await fetch(species.habitat.url,{cache:"no-cache"})
                        const habitat = await fetchHabitat.json()
                        return habitat.names[0].name;
                }
                else{
                        return "aucun";
                }
                }

        async function getGen(){
                if (species.generation.name === "generation-i"){
                        return "1"
                }
                else if(species.generation.name === "generation-ii"){
                        return "2"
                }
                else if(species.generation.name === "generation-iii"){
                        return "3"
                }
                else if(species.generation.name === "generation-iv"){
                        return "4"
                }
                else if(species.generation.name === "generation-v"){
                        return "5"
                }
                else if(species.generation.name === "generation-vi"){
                        return "6"
                }
                else if(species.generation.name === "generation-vii"){
                        return "7"
                }
                else if(species.generation.name === "generation-viii"){
                        return "8"
                }
        }

        async function getColor(){
                const fetchColor = await fetch(species.color.url,{cache:"no-cache"})
                const color = await fetchColor.json()
                return color.names[3].name;
        }

        async function getName(){
                
        }

        const name = species.names[4].name;
        const img = pokemon.sprites.front_default;
        
        const [type1,type2] = await getTypes();

        const color = await getColor();
        const evo = await getEvo();
        const gen = await getGen();
        const habitat = await getHabitat();


        const result = NextResponse.json([name,img,type1,type2,color,evo,gen,habitat]);
        return result ;
}