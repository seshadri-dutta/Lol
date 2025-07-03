import React, { useState, useEffect } from "react";
import { GifState } from "../context/gif-context";
import { useParams } from "react-router-dom";
import FilterGif from "../components/filter-gif";
import Gif from "../components/gif.jsx";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { gf, filter } = GifState();
  const { query } = useParams();

  const fetchSearchResults = async () => {
    setLoading(true);

    try {
      
      const normalizedQuery = decodeURIComponent(query).toLowerCase();

      const { data } = await gf.search(normalizedQuery, {
        sort: "relevant",
        lang: "en",
        type: filter,
        limit: 20,
      });

      setSearchResults(data);
    } catch (err) {
      console.error("Search failed:", err);
    }

    setLoading(false);
  };

  
  useEffect(() => {
    fetchSearchResults();
  }, [query, filter]);

  return (
    <div className="my-4">
      <h2 className="text-5xl pb-3 font-extrabold capitalize">{query}</h2>

      <FilterGif alignLeft={true} />

      {loading ? (
        <p className="text-gray-400 mt-4">Loading...</p>
      ) : searchResults.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {searchResults.map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
      ) : (
        <span className="text-gray-500">
          No GIFs found for <strong>{query}</strong>. Try searching for stickers instead?
        </span>
      )}
    </div>
  );
};

export default SearchPage;
