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
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=b547eeba93b64b919c846a7549289de9`
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
    <div>
       <h2>{details.title}</h2> 
       <img src={details.image} alt=""/>
        </div>
    <div>
        <button className={activeTab === 'instructions' ? 'active': ''} onClick={() => setActiveTab('instructions')}>Instructions</button>


        <button className={activeTab === 'ingredients' ? 'active': ''} onClick={() => setActiveTab('ingredients')}>Ingredients</button>
    </div>
    <div>
        <h3 dangerouslySetInnerHTML={{__html: details.summary }} ></h3>
        <h3 dangerouslySetInnerHTML={{__html: details.instructions }} ></h3>
    </div>
    <ul>
        {details.extendIngredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
        ))}
    </ul>
    </>
  )
}

export default RecipeDetail