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
    console.log("scrollHeight:", document.documentElement.scrollHeight);
    console.log("innerHeight:", window.innerHeight);
    console.log("scrollTop:", document.documentElement.scrollTop);

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
    <div>
      <img src="/banner.gif" alt="earth banner" className="mt-2 rounded w-full" />
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
