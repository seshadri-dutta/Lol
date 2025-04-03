import React, { useEffect, useState } from 'react';
import { HiEllipsisVertical, HiMiniBars3BottomRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { GifState } from '../context/gif-context';
import GifSearch from '../components/gif-search';

const Header = () => {
    const [categories, setCategories] = useState([]);
    const [showCategories, setShowCategories] = useState(false);

    const { gf, favorites } = GifState();

    const fetchGifCategories = async () => {
        const { data } = await gf.categories();
        console.log(data);
        setCategories(data);
    };

    useEffect(() => {
        fetchGifCategories();
    }, []);

    return (
        <nav className="relative">
            <div className="flex gap-4 justify-between items-center mb-2">
                <Link to="/" className="flex items-center gap-2">
                    <img src="/logo.svg" className="w-8" alt="Giphy Logo" />
                    <h1 className="text-3xl font-bold tracking-tight cursor-pointer">Lol!</h1>
                </Link>

                <div className="font-bold text-md flex gap-2 items-center">
                    {/* Render categories */}
                    {categories.slice(0, 5).map((category, index) => (
                        <Link 
                            key={category.name_encoded || index} 
                            to={`/category/${encodeURIComponent(category.name_encoded)}`}
                            className="px-1 py-1 hover:gradient border-b-4 hidden lg:block"
                        >
                            {category.name}
                        </Link>
                    ))}

                    <button onClick={() => setShowCategories(!showCategories)}>
                        <HiEllipsisVertical
                            size={35}
                            className={`py-0.5 hover:gradient ${showCategories ? "gradient" : ""} border-b-4 hidden lg:block`}
                        />
                    </button>

                    {favorites.length > 0 && (
                        <div className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded">
                            <Link to="/favorites">Favorite GIFS</Link>
                        </div>
                    )}

                    <button>
                        <HiMiniBars3BottomRight className="text-sky-400 block lg:hidden" size={30} />
                    </button>
                </div>
            </div>

            {/* Dropdown Box (Properly Positioned) */}
            {showCategories && (
                <div className="absolute left-0 right-0 top-full mt-2 px-10 pt-6 pb-9 w-full gradient z-20">
                    <span className="text-3xl font-extrabold">Categories</span>
                    <hr className="bg-gray-100 opacity-50 my-5" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {categories?.map((category, index) => (
                            <Link 
                                key={category.name_encoded || index} 
                                className="font-bold" 
                                to={`/category/${encodeURIComponent(category.name_encoded)}`}
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            
                {/*search*/}
                <GifSearch/>

        
        </nav>
    );
};

export default Header;
