import {React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Navbar";
import RecipeCategory from "../RecipeCategory";
import RecipeSearch from "../RecipeSearch";

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
                      <h3
                        className="text-lg font-normal"
                        dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
                      <hr className="my-4" />
                      <h3
                        className="text-lg font-normal"
                        dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
                    </div>
                  )}
                  {activeTab === "ingredients" && (
                    <ul>
                      {details.extendIngredients &&
                        details.extendIngredients.map((ingredients) => (
                          <li key={ingredients.id}>{ingredients.original}</li>
                        ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
    
    export default RecipeDetail;