import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";


    
function LowStock() {
    const [lowStock, setLowStock] = useState([]);
  
    useEffect(() => {
      getLowStock();
    }, []);
  
    const getLowStock = async () => {
      // const check = localStorage.getItem('veggie');
  
      // if (check) {
      //   setVeggie(JSON.parse(check));
      // } else {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=0ebd3d63b0f742c988e9f8f0764797b2&number=9&tags=vegetarian`);
        const data = await api.json();
        // localStorage.setItem('veggie', JSON.stringify(data.recipes));
        setLowStock(data.recipes);
        console.log(data.recipes);
      }
    

    return  (
    
    <div className="m-0 p-0 box-border bg-white-100"><h3 className="text-2xl font-bold mb-4 text-gradient">Low Stock Dishes </h3>
    <div className=" bg-gray-100 wrapper flex flex-wrap hover:flex-wrap-reverse m-4">
    
      {lowStock && lowStock.length > 0 ? (
        <Splide
          options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "5rem",
          }}
        >
          {lowStock.map((recipe) => (
            <SplideSlide key={recipe.id}>
              <div className="min-h-25rem rounded overflow-hidden relative">
              <Link to={'/recipedetail/'+ recipe.id}>
                <div className="absolute z-10 left-0 bottom-0 mb-4 text-center w-full">
                  <p
                    className="text-white text-xl font-semibold"
                    style={{
                      textShadow: "0px 2px 4px rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    {recipe.title}
                  </p>
                </div>
                <img
                  className="mt-2 rounded-xl w-full h-full object-cover border border-gray-200"
                  src={recipe.image}
                  alt={recipe.title}
                  style={{ borderRadius: "2rem" }}
                />
                </Link>
              </div>
            </SplideSlide>
          ))}
        </Splide>
                 ) : (
                <p>Loading...</p>
            )}
        </div>
    </div>
    )
}
;


export default LowStock;