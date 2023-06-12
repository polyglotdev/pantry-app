import {React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Navbar";
import RecipeCategory from "../RecipeCategory";
import RecipeSearch from "../RecipeSearch";
import { Link } from "react-router-dom";

function RecipeDetail() {

    let params = useParams();
    const [details, setDetails]=useState({});
    const [activeTab, setActiveTab] =useState('instructions');

   const fetchDetails = async() => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=0ebd3d63b0f742c988e9f8f0764797b2`
        );
        const detailData = await data.json();
        setDetails(detailData);
    }
    
    useEffect(() => {
        fetchDetails();
    }, [params.name])


    return (
      <>
      <NavBar />
      <RecipeSearch />
      <RecipeCategory />
      <div className="flex justify-center mt-8">
        <div className="bg-white rounded-lg shadow-lg w-3/4">
          <div className="flex">
            <img
              src={details.image}
              alt=""
              className="rounded-l-lg w-64 h-64 object-cover"
            />
            <div className="flex flex-col justify-center p-6">
              <h2 className="text-2xl font-bold mb-2">{details.title}</h2>
              <hr className="my-4" />
              <div className="flex justify-center mb-4">
                <button
                  className={`mr-2 py-2 px-4 rounded ${
                    activeTab === "instructions" ? "bg-c1dbe3" : "bg-gray-400"
                  }`}
                  onClick={() => setActiveTab("instructions")}
                >
                  Instructions
                </button>
                <button
                  className={`ml-2 py-2 px-4 rounded ${
                    activeTab === "ingredients" ? "bg-c1dbe3" : "bg-gray-400"
                  }`}
                  onClick={() => setActiveTab("ingredients")}
                >
                  Ingredients
                </button>
              </div>
              {activeTab === "instructions" && (
                <div>
                  <h2 className="font-extrabold text-shadow text-gray-500 text-xl">Recipe Summary</h2>
                  <h3
                    className="mt-4 mb-10 text-lg font-normal"
                    dangerouslySetInnerHTML={{ __html: details.summary?.replace(/<b>|<\/b>/g, '') }}></h3>
                  <hr className="my-4" />
                  <h2 className="font-extrabold text-shadow text-gray-500 text-xl">Instructions</h2>
                  <h3
                    className="mt-4 mb-10 text-lg font-normal"
                    dangerouslySetInnerHTML={{ __html: details.instructions }}>
                      
                    </h3>
                </div>
              )}
              {activeTab === "ingredients" && (
                <ul className="mt-2">
                  {details.extendedIngredients &&
                    details.extendedIngredients.map((ingredients) => (
                      <li className="text-lg leading-10" key={ingredients.id}>{ingredients.original}</li>
                    ))}
                </ul>
              )}
            </div>
          </div>
          <div className='flex justify-center'>
                <p>
                <Link to="/recipes" className="font-medium text-teal-900 hover:text-teal-800">
                Return to the Recipe Page
                <span aria-hidden="true"> &rarr;</span>
              </Link>
              </p>
              </div>
        </div>
      </div>
    </>
  );
}

export default RecipeDetail;