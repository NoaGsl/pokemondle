import { useEffect, useState } from "react"
import {getPokemonNames} from "@/components/pokemon_function"
import Guess from "./guess";

export default function InputBar() {

  type Pokemon = {
    name: String;
    id: number;
  };
    
  const [input, setInput] = useState("");
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState<String[]>([]);
  const [guesslist, setGuessList] = useState<JSX.Element[]>([]);
  const [visible, setVisible] = useState<boolean>(false);

  function filterPokemonList(){
    if(input === "") return setFilteredPokemonList([]);
    const filteredList = pokemonList.map(name => name.name.toLowerCase().normalize()).filter(name => name.startsWith(input.toLowerCase().normalize()));
    return setFilteredPokemonList(filteredList);
  }

  const categories = ["nom","image","type1","type2","couleur","evolution","generation","habitat"]; 
  
  async function takeGuess(id:number,name:string){
    setInput("");
    setVisible(false);
    const data = await fetch(`/api/pokemon?name=${id}`);
    const json = await data.json();
    setGuessList([...guesslist,<Guess key={guesslist.length+1} name={name} img={json[1]} type1={json[2]} type2={json[3]} color={json[4]} evo={json[5]} gen={json[6]} habitat={json[7]} number={guesslist.length+1}/>]);
  }

  useEffect(() =>{

    async function loadContent(){
    if(pokemonList.length === 0){
      setPokemonList(await getPokemonNames());
    }
    return filterPokemonList();
    }
    loadContent();
// eslint-disable-next-line react-hooks/exhaustive-deps
  },[input])

  return (
    <div className="absolute left-0 right-0 flex-col top-0">
      <div className="sticky top-0 justify-center items-center z-30 bg-black">
        <h1 className="text-3xl p-4 text-white">Devinez le pokemon</h1>
        <input onFocus={() => {setVisible(true)}} onBlur={() => setVisible(false)}  type="text" className="border-2 border-black text-black w-1/4" onChange={(e) => setInput(e.target.value)} value={input}/>
        <div className="grid grid-cols-[repeat(8,100px)] gap-2 p-2 text-l text-center justify-center items-center">
            {categories.map((categorie) => <p className="text-white underline underline-offset-8" key={categorie}>{categorie}</p>)}
        </div>
      </div>
      <div className="flex justify-center">
      </div>
      {visible && input != "" ? 
      <div className={`sticky m-auto top-24 right-0 left-0 bg-blue-500 w-1/4 flex-col z-40 overflow-y-scroll max-h-28 z-50`}>
        {filteredPokemonList.map((name,index) => <p className="hover:bg-gray-500 hover:cursor-pointer h-5 p-px" onMouseDown={() => takeGuess((pokemonList.map(e => e.name.toLowerCase()).indexOf(name.toLowerCase())+1),name.toLowerCase())} key={index}>{name}</p>)}
      </div> : <></>}
      <div className="flex justify-center bg-black">
        <div className="w-full justify-center">
          {guesslist.map((elt,index) => <div key={index}>{elt}</div>)}
        </div>
      </div>
    </div>
  )
}