import { useEffect, useState } from "react";
import { GifState } from "../context/gif-context";
import { useParams } from "react-router-dom";
import Gif from "../components/gif";
import FollowOn from "../components/follow-on";

const Category = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { gf } = GifState();
  const { category } = useParams();

  console.log("Category from URL:", category);

  const fetchSearchResults = async () => {
    setLoading(true); 

    try {
        const { data } = await gf.search(query, {
            sort: "relevant",
            lang: 'en',
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
    console.log("useEffect triggered! Category received from URL:", category);
    
    if (category) {
      setSearchResults([]);
      fetchSearchResults(); 
    }
  }, [category]); 
  return (
    <div className="flex flex-col sm:flex-row gap-5 my-4">
      <div className="w-full sm:w-72">
        {searchResults.length > 0 && <Gif gif={searchResults[0]} />}
        <span className="text-gray-400 text-sm pt-2">
          Don&apos;t tell it to me, GIF it to me!
        </span>
        <FollowOn />
        <div className="w-full h-0.5 mt-6 bg-gray-800" />
      </div>
      <div>
        <h2 className="text-4xl pb-1 font-extrabold capitalize">
          {category.split("-").join(" & ")} GIFs
        </h2>
        <h2 className="text-lg text-gray-400 pb-3 font-bold hover:text-gray-50 cursor-pointer">
          @{category}
        </h2>

        {searchResults.length > 0 && (
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
            {searchResults.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
