import React, { useEffect, useState } from "react";
import { GifState } from "../context/gif-context";
import Gif from "../components/gif";
import FilterGif from "../components/filter-gif";

const Home = () => {
  const { gf, gifs, setGifs, filter } = GifState();
  const [page, setPage] = useState(1);

  const fetchTrendingGIFS = async () => {
    try {
      const { data } = await gf.trending({
        limit: 20,
        offset: (page - 1) * 20,
        type: filter,
        rating: "g",
      });

      setGifs((prevGifs) => [...prevGifs, ...data]);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    }
  };

  const infiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchTrendingGIFS();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return () => window.removeEventListener("scroll", infiniteScroll);
  }, []);

  return (
    <div className="relative w-full mt-6">
      
      <div className="relative text-center mb-10 py-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
          Different Moods, Different GIFs!
        </h1>
      </div>

      
      <FilterGif showTrending />

      
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {gifs.map((gif, index) => (
          <Gif gif={gif} key={gif.id || index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
