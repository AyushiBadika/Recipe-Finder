import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { PAGESTATE } from "../constants";
import Skeleton from "react-loading-skeleton";
import Loader from "./Loader";

export default function FoodItem() {
  const [recipe, setRecipe] = useState();

  const [pageState, setPageState] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);

  const { id } = useParams();
  let isFirst = true;
  async function fetchRecipe() {
    setPageState(PAGESTATE.LOADING);
    const options = {
      method: "GET",
      url: `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=da84d3cb&app_key=07766072aed6038895f0acbed0418547`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.request(options);

      setPageState(PAGESTATE.SUCCESS);
      setRecipe(response.data.recipe);
    } catch (error) {
      console.error(error);
      setPageState(PAGESTATE.ERROR);
    }
  }

  useEffect(() => {
    if (id !== null && id !== "" && id !== undefined && isFirst) {
      isFirst = false;
      fetchRecipe();
    }
  }, [id]);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <RecipeContainer>
      {pageState === PAGESTATE.LOADING ? (
        <div>
          <Loader />
        </div>
      ) : pageState === PAGESTATE.ERROR ? (
        <div>Something went wrong! We&apos;re working on it</div>
      ) : PAGESTATE.SUCCESS ? (
        <>
          <div className="flex flex-col sm:flex-row items-center justify-between w-full my-6">
            <Link to={"/"} className="flex w-fit gap-2 justify-center items-center font-bold underline text-blue-950 ">
              <Img src="./goback.png" />
              Go back
            </Link>
            <RecipeTitle>{recipe.label}</RecipeTitle>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-12 sm:gap-24">
            <div className="sm:self-start self-center">
              <p className="mb-5 font-bold">
                Source : <span className="underline">{recipe.source}</span>
              </p>
              {imageLoading && <Skeleton count={1} width={"500px"} height={"500px"} />}
              {<RecipeImage src={recipe.image} alt={recipe.title} onLoad={handleImageLoad} style={{ display: `${imageLoading} ? "none" : "block"` }} />}
            </div>

            <div>
              <Ingredients>
                <h3>Ingredients:</h3>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <div className="flex gap-5 mb-5" key={index}>
                      {imageLoading && <Skeleton count={1} width={"40px"} height={"40px"} baseColor="grey" />} {<img src={ingredient.image} onLoad={handleImageLoad} style={{ display: `${imageLoading} ? "none" : "block"` }} />}
                      <li key={index}>{ingredient.text}</li>
                    </div>
                  ))}
                </ul>
              </Ingredients>
              <Instructions>
                <h3>Cooking Instructions:</h3>
                <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                  View Full Instructions
                </a>
              </Instructions>
            </div>
          </div>
        </>
      ) : (
        <div>
          <h3>No recipe matched your search query!!</h3>
        </div>
      )}
    </RecipeContainer>
  );
}

// Container for the entire Recipe component
const RecipeContainer = styled.div`
  width: 85%;
  margin: auto;
  padding-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

// Recipe title
const RecipeTitle = styled.h2`
  font-size: 32px;
  font-weight: 600;
  color: #000;
  text-shadow: 1px 1px grey;
  margin: 5px 0;
  text-align: center;
  position: relative;
  flex-grow: 1;
`;

// Image section
const RecipeImage = styled.img`
  max-width: 500px;
  border-radius: 10px;
  object-fit: cover;
`;

// Ingredients section
const Ingredients = styled.div`
  margin-bottom: 2rem;
  h3 {
    font-size: 24px;
    color: #555;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    align-items: center;

    li {
      font-size: 14px;
      color: #666;
      margin: 5px 0;
      width: 180px;
    }
    img {
      width: 50px;
      border-radius: 5px;
    }
  }
`;

// Instructions section
const Instructions = styled.div`
  text-align: center;

  a {
    font-size: 18px;
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// Go Back Arrow Image
const Img = styled.img`
  self-align: start;
  height: 16px;
`;
