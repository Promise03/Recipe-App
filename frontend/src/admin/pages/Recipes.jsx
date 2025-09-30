
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import your custom components
import Header from "../component/Reusables/header";
import Sidebar from "../component/Reusables/sidebar";

// This component handles the display, creation, editing, and deletion of recipes.
const Recipes = () => {
  // State for storing the list of recipes.
  const [recipes, setRecipes] = useState([]);
  
  // State for showing a loading indicator while fetching data.
  const [loading, setLoading] = useState(true);

  // Get the auth token from the Redux state.
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Function to fetch all recipes from the backend.
  // Using useCallback to memoize this function and prevent infinite loops in the useEffect.
  const fetchRecipes = useCallback(async () => {
    setLoading(true); // Set loading to true before the API call
    try {
      const res = await axios.get("http://localhost:5000/api/recipes/all-recipes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // The API response data is under `res.data.recipeDetails`.
      if (Array.isArray(res.data.recipeDetails)) {
        setRecipes(res.data.recipeDetails);
      } else {
        setRecipes([]); // Set to an empty array to prevent TypeError
        console.error("API response is not an array:", res.data);
      }
    } catch (e) {
      console.error("Failed to fetch recipes:", e.message);
      setRecipes([]);
    } finally {
      setLoading(false); // Set loading to false after the API call is complete
    }
  }, [token]);

  // Fetch recipes when the component mounts or when the token changes.
  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  // Handler for navigating to the form to add a new recipe.
  const handleAddClick = () => {
    navigate('/add-recipe');
  };

  // Handler for navigating to the form to edit an existing recipe.
  const handleEditClick = (recipe_Id) => {
    navigate(`/edit-recipe/${recipe_Id}`);
  };

  // Handler for deleting a recipe.
  const handleDeleteRecipe = async (id) => {
    // A simple confirmation dialog is used here. For a better UI, use a custom modal.
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await axios.delete(`http://localhost:5000/api/recipe/delete-recipe/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Recipe deleted successfully!");
        fetchRecipes(); // Refresh the list after deleting
      } catch (e) {
        console.error("Failed to delete recipe:", e.message);
        toast.error("Failed to delete recipe.");
      }
    }
  };

  // Handler for navigating to the recipe details page.
  const handleViewRecipe = (id) => {
    navigate(`/recipe-details/${id}`);
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="space-y-6 lg:ml-64 pt-20 px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Recipes</h1>
          <button
            onClick={handleAddClick}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Recipe
          </button>
        </div>

        {/* Conditional rendering for loading state, or the recipe list */}
        {loading ? (
          <div className="text-center py-10 text-gray-500 text-lg">
            Loading recipes...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Conditional check to render a message if there are no recipes */}
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <div key={recipe._id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                  <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{recipe.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">by {recipe.author}</p>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => handleViewRecipe(recipe._id)}
                        className="flex-1 flex items-center justify-center p-2 text-sm font-medium text-purple-600 bg-purple-100 rounded-md hover:bg-purple-200 transition-colors"
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        View
                      </button>
                      <button
                        onClick={() => handleEditClick(recipe._id)}
                        className="flex-1 flex items-center justify-center p-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors"
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRecipe(recipe._id)}
                        className="flex-1 flex items-center justify-center p-2 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10 text-gray-500 text-lg">
                No recipes found. Add a new recipe to get started!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;
