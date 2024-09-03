/* eslint-disable react/prop-types */

import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PAGESTATE } from "../constants";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Loader from "./Loader";

export default function SearchPage() {
  const navigate = useNavigate();

  const [pageState, setPageState] = useState(null);
  const [searchResults, setSearchResullts] = useState(null);
  const [searchQuery, setSearchQuery] = useState("chicken");
  const [imageLoading, setImageLoading] = useState(true);
  const [favRecipe, setFavRecipe] = useState([]);

  const handleClick = ({ uri }) => {
    const id = uri.split("_")[1] || uri;
    navigate(`/${id}`);
  };

  console.log(searchResults);

  async function fetchData() {
    if (searchQuery.length < 3) {
      window.alert("Enter atleast 3 characters to search");
      return;
    }

    setImageLoading(true);
    setPageState(PAGESTATE.LOADING);
    const options = {
      method: "GET",
      url: `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=da84d3cb&app_key=07766072aed6038895f0acbed0418547`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.request(options);
      setSearchResullts(response.data.hits);
      setPageState(PAGESTATE.SUCCESS);
    } catch (error) {
      console.log("Error searching recipes", error);
      console.error(PAGESTATE.ERROR);
    }
  }

  useEffect(() => {
    if (favRecipe.length > 0) {
      localStorage.setItem("favRecipe", JSON.stringify(favRecipe));
    }
  }, [favRecipe]);

  useEffect(() => {
    setFavRecipe(JSON.parse(localStorage.getItem("favRecipe")) || []);
  }, []);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleFav = ({ uri, label, image }) => {
    const id = uri?.split("_")[1] || uri;
    setFavRecipe((prevFavRecipe) => {
      const index = prevFavRecipe.findIndex((recipe) => recipe.id === id);
      if (index >= 0) {
        return prevFavRecipe.filter((recipe) => recipe.id !== id);
      } else {
        return [...prevFavRecipe, { label, id, image }];
      }
    });
  };
  console.log(favRecipe);

  return (
    <div className="bg-[url('/bg.jpg')] bg-cover bg-fixed min-h-[100vh] w-full flex flex-col items-center">
      <div className="mt-8 mb-8 text-center">
        <h1 className="mb-4 font-bold text-4xl">Search Recipes</h1>
        <div className="flex justify-center">
          <input
            className="border-2 border-black w-full rounded px-4 py-2 bg-transparent"
            value={searchQuery}
            placeholder="Enter recipe"
            onChange={(e) => {
              fetchData();
              setSearchQuery(e.currentTarget.value);
            }}
          ></input>
        </div>
      </div>
      {searchResults === null && (
        <div className="mb-10">
          <h3>Enter atleast 3 characters to search...</h3>
        </div>
      )}

      {favRecipe?.length > 0 && <h2 className="text-2xl font-semibold">Favourite Recipes</h2>}
      {favRecipe?.length > 0 && (
        <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 md:gap-6 lg:gap-8 p-4 sm:p-6 md:p-8 lg:p-10 justify-items-center">
          {favRecipe.map((recipe, index) => {
            return (
              <div key={index} className="relative w-64 xs:w-56 rounded-md flex flex-col items-center justify-between shadow-lg cursor-pointer bg-white p-4 gap-1">
                {imageLoading && <Skeleton width={"200px"} height={"200px"} count={1} />}
                <img src={recipe.image} alt="" onLoad={handleImageLoad} style={{ display: `${imageLoading ? "none" : "block"}` }} onClick={() => handleClick({ uri: recipe.id })} />
                <p className="text-center w-3/4 content-center grow">{recipe.label}</p>
                <div className="absolute bottom-4 right-4" onClick={() => handleFav({ uri: recipe.id, label: recipe.label, image: recipe.image })}>
                  <FaHeart color="red" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {pageState === PAGESTATE.LOADING ? (
        <Loader />
      ) : pageState === PAGESTATE.ERROR ? (
        <div>Something went wrong! We&apos;re working on it</div>
      ) : (
        pageState === PAGESTATE.SUCCESS &&
        (searchResults?.length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold">Search result for {searchQuery}</h2>
            <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 md:gap-6 lg:gap-8 p-4 sm:p-6 md:p-8 lg:p-10 justify-items-center">
              {searchResults?.map((recipe, index) => {
                return (
                  <div key={index} className="relative w-64 xs:w-56 rounded-md flex flex-col items-center justify-between shadow-lg cursor-pointer bg-white p-4 gap-1">
                    {imageLoading && <Skeleton count={1} width={"200px"} height={"200px"} />}
                    <img src={recipe.recipe.images.SMALL.url} onLoad={handleImageLoad} style={{ display: imageLoading ? "none" : "block" }} onClick={() => handleClick({ uri: recipe.recipe.uri })} />
                    <p className="text-center w-3/4 content-center grow">{recipe.recipe.label}</p>
                    <div className="absolute bottom-4 right-4" onClick={() => handleFav({ uri: recipe.recipe.uri, label: recipe.recipe.label, image: recipe.recipe.images.SMALL.url })}>
                      {favRecipe.some((rec) => recipe.recipe.uri.split("_")[1] === rec.id) ? <FaHeart color="red" /> : <FaRegHeart />}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div>
            <h3>No recipe matched your search query!!</h3>
          </div>
        ))
      )}
    </div>
  );
}
