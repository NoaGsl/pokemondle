import { NextResponse } from "next/server";

export async function GET (){

        const fetchPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=809&offset=0`,{cache:'no-store'})
        const json = await fetchPokemon.json()
        const names = json.results.map((pokemon:any) => pokemon.name)
        const result = NextResponse.json(names);
        return result;
}