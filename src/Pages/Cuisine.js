import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NavBar from '../Navbar';


function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  const getCuisine = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=fafd9ff6a143416a83ad19289ee5490d&cuisine=${name}`
    );
    const recipes = await data.json();
    console.log(recipes);
    setCuisine(recipes.results);
  };

  useEffect(() => {
    getCuisine(params.type);
    console.log(params.type);
  }, [params.type]);

  return (
    <><NavBar /><div className="flex justify-center">
      <div className="h-full ml-14 mr-14 mt-14 mb-10 md:ml-20 md:mr-20 w-screen">
        <div className="mt-5 m-8 grid grid-cols-5 gap-10">
          {cuisine && cuisine.length > 0 ? (
            cuisine.map((item) => (

              <div key={item.id} className="card">
                <Link to={'/recipedetail/' + item.id}>
                  <img src={item.image} alt="" className="h-0.5w-full rounded-2xl" />
                  <h4 className="text-center py-4">{item.title}</h4>
                </Link>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div></>

  );
}


export default Cuisine;