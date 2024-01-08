import { NextResponse } from "next/server";

export async function GET (){

        const names = [];
        for(let i = 1; i < 722; i++){
                const fetchPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`,{cache:'force-cache'})
                const pokemon = await fetchPokemon.json()
                if(pokemon.names[4] != undefined && pokemon.names[4].language.name === "fr"){
                        const name = pokemon.names[4].name;
                        names.push({name:name, id:i});
                }
                else{
                        for(let tab = 0; tab < pokemon.names.length; tab++){
                                if(pokemon.names[tab].language.name === "fr"){
                                        const name = pokemon.names[tab].name;
                                        names.push({name:name, id:i});
                                }
                        }
                }
        }
        const result = NextResponse.json(names);
        return result;
}