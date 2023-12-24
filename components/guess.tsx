import { getElectedPokemon } from "@/components/pokemon_function";
import Image from "next/image";
import { useEffect,useState } from "react";

type GuessProps = {
    name: string;
    img: string;
    type1: string;
    type2: string;
    color: string;
    evo: string;
    gen: string;
    habitat: string;
  };
  

  export default function Guess({name, img, type1, type2, color, evo, gen, habitat}: GuessProps) {

    const [electedPokemon, setElectedPokemon] = useState<String[]>([]);

async function fetchData() {
  const electedPokemonData = await getElectedPokemon();
  return electedPokemonData;
}

useEffect(() =>{

    async function loadContent(){
        setElectedPokemon(await fetchData());
    }
    loadContent();
},[])

 function BGColor(elt:string, index:number){
    if(elt.toLowerCase() === electedPokemon[index].toLowerCase()){
        return "bg-green-500"
    }else{
        return "bg-red-500"
    }
}

    return (
        electedPokemon.length === 0 ?
        (<div>Chargement ...</div>):
        <div className="flex justify-center">
            <div className="grid grid-cols-8 gap-2 p-2 m-2 text-m text-center justify-center items-center bg-white">
                <div className={BGColor(name,0)+" w-[100px] h-[100px] flex items-center justify-center"}>
                    <p>{name}</p>
                </div>
                <div className={BGColor(img,1)+" w-[100px] h-[100px] flex items-center justify-center"}>
                    <Image src={img} alt={name} width={100} height={100}/>
                </div>
                <div className={BGColor(type1,2)+" w-[100px] h-[100px] flex items-center justify-center"}>
                    <p>{type1}</p>
                </div>
                <div className={BGColor(type2,3)+" w-[100px] h-[100px] flex items-center justify-center"}>
                    <p>{type2}</p>
                </div>
                <div className={BGColor(color,4)+" w-[100px] h-[100px] flex items-center justify-center"}>
                    <p>{color}</p>
                </div>
                <div className={BGColor(evo,5)+" w-[100px] h-[100px] flex items-center justify-center"}>
                    <p>{evo}</p>
                </div>
                <div className={BGColor(gen,6)+" w-[100px] h-[100px] flex items-center justify-center"}>
                    <p>{gen}</p>
                </div>
                <div className={BGColor(habitat,7)+" w-[100px] h-[100px] flex items-center justify-center"}>
                    <p>{habitat}</p>
                </div>
            </div>
        </div>
    );
}