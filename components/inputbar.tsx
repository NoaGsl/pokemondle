import { useEffect, useState } from "react"
import {getPokemonNames} from "@/components/pokemon_function"
import Guess from "./guess";

export default function InputBar() {
    
  const [input, setInput] = useState("");
  const [pokemonList, setPokemonList] = useState<string[]>([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState<string[]>([]);
  const [guesslist, setGuessList] = useState<JSX.Element[]>([]);
  const [visible, setVisible] = useState<boolean>(false);

  function filterPokemonList(){
    if(input === "") return setFilteredPokemonList([]);
    const filteredList = pokemonList.filter(name => name.startsWith(input));
    return setFilteredPokemonList(filteredList);
  }

  const categories = ["nom","image","type1","type2","couleur","evolution","generation","habitat"]; 
  
  async function takeGuess(name:string){
    setInput("");
    setVisible(false);
    pokemonList.splice(pokemonList.indexOf(name),1);
    const data = await fetch(`/api/pokemon?name=${name}`);
    const json = await data.json();
    setGuessList([...guesslist,<Guess name={name} img={json[1]} type1={json[2]} type2={json[3]} color={json[4]} evo={json[5]} gen={json[6]} habitat={json[7]}/>]);
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
    <div className="flex justify-center flex-col">
      <h1 className="text-3xl p-4">Devinez le pokemon</h1>
      <div className="flex justify-center">
        <input onFocus={() => {setVisible(true)}} onBlur={() => setVisible(false)}  type="text" className="flex border-2 border-black text-black w-1/4" onChange={(e) => setInput(e.target.value)} value={input}/>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-[repeat(8,100px)] gap-2 p-2 text-l text-center justify-center items-center">
            {categories.map((categorie,index) => <p className="underline underline-offset-8" key={index}>{categorie}</p>)}
        </div>
      </div>
      {visible ? 
      <div className="absolute m-auto top-24 right-0 left-0 bg-blue-500 w-1/4 flex-col z-40 overflow-y-scroll h-1/6">
        {filteredPokemonList.map((name,index) => <p className="hover:bg-gray-500 hover:cursor-pointer" onMouseDown={() => takeGuess(name)} key={index}>{name}</p>)}
      </div> : <></>}
      <div className="flex justify-center">
        <div className="w-full justify-center">
          {guesslist.map((elt,index) => <div key={index}>{elt}</div>)}
        </div>
      </div>
    </div>
  )
}