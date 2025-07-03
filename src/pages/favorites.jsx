import React, { useState,useEffect } from "react";
import {GifState} from "../context/gif-context";
import Gif from "../components/gif";
const Favorites = () =>
{
    const [favoriteGIFs, setFavoriteGIFs] = useState([]);
    const {gf, favorites}= GifState();

    const fetchFavoriteGIFs = async () => {
    try {
        if (favorites.length === 0) {
            console.warn("No favorite GIFs to fetch.");
            return;
        }

        const { data: gifs } = await gf.gifs(favorites);

        if (!gifs || gifs.length === 0) {
            console.warn("No GIFs returned from Giphy.");
            setFavoriteGIFs([]);
            return;
        }

        setFavoriteGIFs(gifs);
    } catch (error) {
        console.error("Failed to fetch favorite GIFs:", error);
        setFavoriteGIFs([]); 
    }
};

    useEffect(() => {
        fetchFavoriteGIFs();
    }, []);
    return (
    <div className="mt-2">
        <span className="faded-text">My Favorites</span>
        <div className="columns-2 md:columns-3 lg:columns-3 xl:columns-5 gap-2 mt-2">
            {favorites?.length === 0 ? (
            <p className="text-gray-500">You have no favorites yet!</p>
             ) : favoriteGIFs?.length > 0 ? (
            favoriteGIFs.map((gif) => <Gif gif={gif} key={gif.id} />)
            ) : (
           <p className="text-gray-400">Loading your favorite GIFs...</p>
        )}

        </div>
    </div>
    );
};
export default Favorites;