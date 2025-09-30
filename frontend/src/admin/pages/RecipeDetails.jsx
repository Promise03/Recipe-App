// import React, { useState, useEffect, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import {
//   ArrowLeft,
//   BookOpen, // New icon for instructions
//   CookingPot, // New icon for ingredients
// } from "lucide-react";

// // This component fetches all recipes and then finds the specific recipe
// // based on the ID in the URL.
// const RecipeDetail = () => {
//   const { id } = useParams(); // Get the ID from the URL
//   const { token } = useSelector((state) => state.auth);
//   const navigate = useNavigate(); // Hook for navigation

//   // State to manage recipe data, loading status, and any errors.
//   const [recipe, setRecipe] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Use useCallback to memoize the fetch function and avoid re-creating it on every render
//   const fetchRecipe = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await axios.get("http://localhost:5000/api/recipe/all-recipes", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // --- FIX: Updated the code to correctly access the data from res.data.recipeDetails ---
//       const recipesArray = res.data.recipeDetails;
//       if (!recipesArray) {
//         setError("Invalid response from server. Recipes data not found.");
//         setRecipe(null);
//         return;
//       }
      
//       const foundRecipe = recipesArray.find((u) => u._id === id);

//       if (foundRecipe) {
//         setRecipe(foundRecipe);
//       } else {
//         setError("Recipe not found.");
//         setRecipe(null);
//       }
//     } catch (e) {
//       console.error("Error fetching recipes:", e.message);
//       setError(e.response?.data?.message || "Failed to load recipe list.");
//       setRecipe(null);
//     } finally {
//       // --- FIX: Ensure loading is set to false in the finally block ---
//       setLoading(false);
//     }
//   }, [id, token]); // The fetch function depends on the ID and token

//   useEffect(() => {
//     if (token) {
//       fetchRecipe();
//     } else {
//       setLoading(false);
//       setError("Authentication token not found.");
//     }
//   }, [fetchRecipe, token]);

//   // Conditional rendering for loading, error, and data
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
//         <p>Loading recipe details...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-900 text-red-400">
//         <p>{error}</p>
//       </div>
//     );
//   }

//   if (!recipe) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-400">
//         <p>Recipe not found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-white px-4 py-10 flex flex-col items-center">
//       <div className="w-full max-w-4xl">
//         {/* Back button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 mb-6 text-teal-400 hover:text-white transition"
//         >
//           <ArrowLeft size={18} /> Back
//         </button>

//         {/* Card */}
//         <div className="bg-gray-800 rounded-2xl shadow-md p-6 md:p-8">
//           {/* Recipe header with image and title */}
//           <div className="md:flex md:space-x-8 items-center">
//             <div className="md:w-1/2">
//               <img
//                 src={recipe.image || 'https://placehold.co/800x400/cccccc/333333?text=No+Image'}
//                 alt={recipe.title}
//                 className="w-full h-auto rounded-lg object-cover shadow-lg mb-6 md:mb-0"
//               />
//             </div>

//             {/* Recipe details */}
//             <div className="md:w-1/2 flex flex-col justify-center">
//               <h2 className="text-4xl font-bold text-white mb-2">{recipe.title}</h2>
//               <p className="text-lg text-gray-400 mb-4">by {recipe.author}</p>
//               <p className="text-gray-300 leading-relaxed">{recipe.description}</p>
//             </div>
//           </div>

//           {/* Ingredients section */}
//           <div className="mt-8">
//             <h3 className="flex items-center gap-2 text-2xl font-semibold text-white mb-4">
//               <CookingPot size={24} className="text-teal-400" /> Ingredients
//             </h3>
//             <ul className="list-disc list-inside space-y-2 text-gray-300">
//               {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 ? (
//                 recipe.ingredients.map((ingredient, index) => (
//                   <li key={index}>{ingredient}</li>
//                 ))
//               ) : (
//                 <li>No ingredients listed.</li>
//               )}
//             </ul>
//           </div>

//           {/* Instructions section */}
//           <div className="mt-8">
//             <h3 className="flex items-center gap-2 text-2xl font-semibold text-white mb-4">
//               <BookOpen size={24} className="text-teal-400" /> Instructions
//             </h3>
//             <ol className="list-decimal list-inside space-y-4 text-gray-300">
//               {Array.isArray(recipe.instructions) && recipe.instructions.length > 0 ? (
//                 recipe.instructions.map((instruction, index) => (
//                   <li key={index}>{instruction}</li>
//                 ))
//               ) : (
//                 <li>No instructions available.</li>
//               )}
//             </ol>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipeDetail;


import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { ArrowLeft, BookOpen, CookingPot, Loader2 } from "lucide-react";

const RecipeDetail = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const { token } = useSelector((state) => state.auth); // Get auth token from Redux
  const navigate = useNavigate(); // Hook for navigation

  const [recipe, setRecipe] = useState(null); // Store recipe data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  // Base URL for images (adjust to match your backend's image serving path)
  const IMAGE_BASE_URL = "http://localhost:5000/uploads/";

  // Fetch all recipes and filter by ID
  const fetchRecipe = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:5000/api/recipe/all-recipes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("API Response:", res.data); // Debug: Log API response
      const recipesArray = res.data.recipeDetails || res.data.recipes || res.data;
      if (!Array.isArray(recipesArray)) {
        setError("Invalid response from server. Recipes data not found.");
        setRecipe(null);
        return;
      }
      const foundRecipe = recipesArray.find((u) => u._id === id);
      if (foundRecipe) {
        // Transform ingredients and instructions into arrays if they are strings
        const transformedRecipe = {
          ...foundRecipe,
          ingredients: typeof foundRecipe.ingredients === "string"
            ? foundRecipe.ingredients.split(",").map(item => item.trim())
            : Array.isArray(foundRecipe.ingredients)
              ? foundRecipe.ingredients
              : [],
          instructions: typeof foundRecipe.instructions === "string"
            ? foundRecipe.instructions.split(",").map(item => item.trim())
            : Array.isArray(foundRecipe.instructions)
              ? foundRecipe.instructions
              : [],
          image: foundRecipe.image ? `${IMAGE_BASE_URL}${foundRecipe.image}` : null,
        };
        setRecipe(transformedRecipe);
      } else {
        setError("Recipe not found.");
        setRecipe(null);
      }
    } catch (e) {
      console.error("Error fetching recipes:", e.message); // Debug: Log error
      setError(e.response?.data?.message || "Failed to load recipe list.");
      setRecipe(null);
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  // Fetch recipe when component mounts or ID/token changes
  useEffect(() => {
    if (!token) {
      setError("Please log in to view recipe details.");
      setLoading(false);
      navigate("/login"); // Redirect to login if no token
    } else {
      fetchRecipe();
    }
  }, [fetchRecipe, token, navigate]);

  // Conditional rendering for loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <Loader2 className="animate-spin" size={24} />
        <p className="ml-2">Loading recipe details...</p>
      </div>
    );
  }

  // Conditional rendering for error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-red-400">
        <p>{error}</p>
        <button
          onClick={fetchRecipe}
          className="ml-4 text-teal-400 hover:text-white transition"
        >
          Retry
        </button>
      </div>
    );
  }

  // Conditional rendering for no recipe found
  if (!recipe) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-400">
        <p>Recipe not found.</p>
      </div>
    );
  }

  // Main recipe content
  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-teal-400 hover:text-white transition"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* Recipe card */}
        <div className="bg-gray-800 rounded-2xl shadow-md p-6 md:p-8">
          {/* Recipe header with image and title */}
          <div className="md:flex md:space-x-8 items-center">
            <div className="md:w-1/2">
              <img
                src={recipe.image || "https://placehold.co/800x400/cccccc/333333?text=No+Image"}
                alt={recipe.title || "Recipe Image"}
                className="w-full h-auto rounded-lg object-cover shadow-lg mb-6 md:mb-0"
              />
            </div>

            {/* Recipe details */}
            <div className="md:w-1/2 flex flex-col justify-center">
              <h2 className="text-4xl font-bold text-white mb-2">
                {recipe.title || "Untitled Recipe"}
              </h2>
              {/* Removed author and description since they're not in the response */}
            </div>
          </div>

          {/* Ingredients section */}
          <div className="mt-8">
            <h3 className="flex items-center gap-2 text-2xl font-semibold text-white mb-4">
              <CookingPot size={24} className="text-teal-400" /> Ingredients
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {recipe.ingredients.length > 0 ? (
                recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))
              ) : (
                <li>No ingredients listed.</li>
              )}
            </ul>
          </div>

          {/* Instructions section */}
          <div className="mt-8">
            <h3 className="flex items-center gap-2 text-2xl font-semibold text-white mb-4">
              <BookOpen size={24} className="text-teal-400" /> Instructions
            </h3>
            <ol className="list-decimal list-inside space-y-4 text-gray-300">
              {recipe.instructions.length > 0 ? (
                recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))
              ) : (
                <li>No instructions available.</li>
              )}
            </ol>
          </div>

          {/* Video section (optional) */}
          {recipe.videoUrl && (
            <div className="mt-8">
              <h3 className="flex items-center gap-2 text-2xl font-semibold text-white mb-4">
                <BookOpen size={24} className="text-teal-400" /> Video Tutorial
              </h3>
              <iframe
                width="100%"
                height="315"
                src={recipe.videoUrl}
                title="Recipe Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;