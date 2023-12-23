import { useEffect, useState } from "react"
import {getPokemonNames} from "@/components/pokemon_function"
import Guess from "./guess";

export default function InputBar() {
    
  const [input, setInput] = useState("");
  const [pokemonList, setPokemonList] = useState<string[]>([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState<string[]>([]);

  function filterPokemonList(){
    if(input === "") return setFilteredPokemonList([]);
    const filteredList = pokemonList.filter(name => name.startsWith(input));
    return setFilteredPokemonList(filteredList);
  }
  
  function takeGuess(name:string){
    console.log(name)
    return "oui"
  }

  useEffect(() =>{

    async function loadContent(){
    if(pokemonList.length === 0){
      setPokemonList(await getPokemonNames());
    }
    return filterPokemonList();
    }
    loadContent();
  },[input])

  return (
    <div className="bloc">
      <input type="text" className="border-2 border-black" onChange={(e) => setInput(e.target.value)} value={input}/>
      <div className="flex flex-col">
        {filteredPokemonList.map((name,index) => <p onClick={() => takeGuess(name)} key={index}>{name}</p>)}
      </div>
    </div>
  )
}