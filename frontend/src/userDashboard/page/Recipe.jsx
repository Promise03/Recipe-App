import {
  CookingPot,
} from 'lucide-react';
import Sidebar from '../component/Reuseable/SiderBar';
import Header from '../component/Reuseable/Header';
import RecipeDetail from './RecipeDetail';
import { useState } from 'react';

// The Recipes Page component with a grid of recipe cards.
const Recipe = () => { // Removed onSelectRecipe prop here as it's managed internally
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe); // Set the selected recipe to display its details
  };

  // Function to go back to the list of recipes
  const handleBackToRecipes = () => {
    setSelectedRecipe(null);
  };

  const recipes = [
    {
      id: 1,
      title: 'Spaghetti Carbonara',
      author: 'John Doe',
      image: 'https://placehold.co/400x200/cccccc/333333?text=Spaghetti+Carbonara',
      description: 'A classic Italian pasta dish from Rome made with eggs, hard cheese, cured pork, and black pepper.',
      ingredients: ['300g spaghetti', '150g guanciale or pancetta', '2 large eggs', '50g pecorino romano cheese', 'black pepper'],
      instructions: ['Cook spaghetti according to package directions.', 'While pasta cooks, crisp the guanciale.', 'Whisk eggs and cheese together.', 'Drain pasta and combine with guanciale.', 'Quickly mix in the egg and cheese mixture off the heat.'],
    },
    {
      id: 2,
      title: 'Classic Lasagna',
      author: 'Jane Smith',
      image: 'https://placehold.co/400x200/cccccc/333333?text=Classic+Lasagna',
      description: 'Layers of pasta, rich meat sauce, and creamy béchamel.',
      ingredients: ['Lasagna noodles', 'Ground beef', 'Tomato sauce', 'Ricotta cheese', 'Mozzarella cheese', 'Parmesan cheese'],
      instructions: ['Prepare meat sauce and béchamel.', 'Layer noodles, meat sauce, béchamel, and cheese.', 'Repeat layers and bake until bubbly and golden brown.'],
    },
    {
      id: 3,
      title: 'Chicken Tikka Masala',
      author: 'Chef Sona',
      image: 'https://placehold.co/400x200/cccccc/333333?text=Chicken+Tikka+Masala',
      description: 'A popular Indian dish of roasted chicken chunks in a spiced sauce.',
      ingredients: ['Chicken breast', 'Yogurt', 'Garlic', 'Ginger', 'Garam masala', 'Tomato puree', 'Cream'],
      instructions: ['Marinate chicken in spices and yogurt.', 'Roast chicken and set aside.', 'Sauté onions, garlic, and ginger.', 'Add spices, tomato puree, and cream.', 'Combine chicken with the sauce and simmer.'],
    },
  ];

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="space-y-8 px-8 lg:ml-64 pt-20">
        <h1 className="text-4xl font-extrabold text-gray-900">Recipes</h1>

        {/* Conditionally render the Recipe list or RecipeDetail based on selectedRecipe state */}
        {selectedRecipe ? (
          <RecipeDetail recipe={selectedRecipe} onBack={handleBackToRecipes} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transform transition-transform hover:scale-105">
                <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{recipe.title}</h3>
                    <p className="mt-2 text-gray-600">{recipe.description}</p>
                    <p className="mt-1 text-sm text-gray-500">by {recipe.author}</p>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => handleSelectRecipe(recipe)} 
                      className="w-full flex items-center justify-center p-3 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                    >
                      <CookingPot className="h-5 w-5 mr-2" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipe;