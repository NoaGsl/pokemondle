"use client"

import InputBar from "@/components/inputbar"
import {getElectedPokemon,getPokemonNames} from "@/components/pokemon_function"
import {useEffect} from "react"

export default function Home() {

  useEffect(() =>{

    async function loadContent(){
      await getElectedPokemon();
    }
    loadContent();
  },[])

  return (
    <div className="flex flex-col justify-center h-screen bg-black text-center w-full">
      <InputBar />
    </div>
  )
}
