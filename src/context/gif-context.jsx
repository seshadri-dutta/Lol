import { GiphyFetch } from '@giphy/js-fetch-api';
import React, { createContext, useContext, useState,useEffect } from 'react';



const GifContext = createContext();

const GifProvider = ({children}) => {
   const[gifs,setGifs] = useState([]);
   const[filter,setFilter] = useState("gifs");
   const [favorites,setFavorites] = useState([]);
   
   const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);
   

   const addToFavorites = (id) => {
    const gifId = id.toString();
    if(favorites.includes(gifId)) {
        const updatedFavorites = favorites.filter(
            (itemId) => itemId !== gifId
        );
        localStorage.setItem("favoriteGIFs", JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
    } else {
        const updatedFavorites = [...favorites,gifId]
        updatedFavorites.push(id);
        localStorage.setItem("favoriteGIFs",JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
    }
   };

   useEffect(()=> {
   const favorites = JSON.parse(localStorage.getItem("favoriteGIFs")) || [];
   setFavorites(favorites);
   },[]);
    return (
    <GifContext.Provider 
    value={{gf,gifs,setGifs,filter,setFilter,favorites,addToFavorites}}
    >{children}
    </GifContext.Provider>
    );
};
export const GifState =() =>
{
    return useContext(GifContext)
}
export default GifProvider;