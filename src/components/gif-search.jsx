import React from 'react';
import {useState} from "react";
import { HiOutlineMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const GifSearch = () => {
    const [query, setQuery ] =useState("");
    const navigate = useNavigate();

    const searchGIFs = async () => {
        if (query.trim()== "") {
            console.log("Search aborted: Query is empty");
            return ;
        }
        console.log("Navigating to:",`/search/${query}`);
        navigate(`/search/${query}`);
    }
  return (
    <div className="flex relative">
        <input
          type = "text"
          value = {query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchGIFs()} 
          placeholder="Search all the GIFS and Stickers"
          className="w-full pl-4 pr-14 py-5 text-xl text-black rounded-tl border border-gray-300 outline-none"/>

          {query && (
            <button
            onClick={() => setQuery("")}
            className="absolute bg-gray-300 opacity-90 rounded-full right-20 mr-2 top-6">
                <HiMiniXMark size={22} />
            </button>
          )}

          <button 
             onClick = {() => {
                console.log("Search button clicked");
                searchGIFs();
             }}
             className="bg-gradient-to-tr from-pink-600 to-pink-400 text-white px-4 py-2 rounded-br">
                <HiOutlineMagnifyingGlass size={35} className="-scale-x-100"/>
             </button>
    </div>

  )
}

export default GifSearch;