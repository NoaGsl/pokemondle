import { getElectedPokemon } from "@/components/pokemon_function";
import Image from "next/image";

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
  

  export default async function Guess({name, img, type1, type2, color, evo, gen, habitat}: GuessProps) {

    const electedPokemonData = await getElectedPokemon();

 function BGColor(elt:string, index:number){
    if(elt === electedPokemonData[index]){
        return "bg-green-500"
    }else{
        return "bg-red-500"
    }
}

    return (
        <div>
            <div className="flex grid grid-cols-8 gap-4 p-4 text-xl text-center justify-center items-center">
                <div className={BGColor(name,0)+" w-[200px] h-[200px] flex items-center justify-center"}>
                    <p>{name}</p>
                </div>
                <div className={BGColor(img,1)}>
                    <Image src={img} alt={name} width={200} height={200}/>
                </div>
                <div className={BGColor(type1,2)+" w-[200px] h-[200px] flex items-center justify-center"}>
                    <p>{type1}</p>
                </div>
                <div className={BGColor(type2,3)+" w-[200px] h-[200px] flex items-center justify-center"}>
                    <p>{type2}</p>
                </div>
                <div className={BGColor(color,4)+" w-[200px] h-[200px] flex items-center justify-center"}>
                    <p>{color}</p>
                </div>
                <div className={BGColor(evo,5)+" w-[200px] h-[200px] flex items-center justify-center"}>
                    <p>{evo}</p>
                </div>
                <div className={BGColor(gen,6)+" w-[200px] h-[200px] flex items-center justify-center"}>
                    <p>{gen}</p>
                </div>
                <div className={BGColor(habitat,7)+" w-[200px] h-[200px] flex items-center justify-center"}>
                    <p>{habitat}</p>
                </div>
            </div>
        </div>
    );
}