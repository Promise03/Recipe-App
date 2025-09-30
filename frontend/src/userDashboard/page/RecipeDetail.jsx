import {
  ArrowLeft,
} from 'lucide-react';

// The Recipe Detail Page component to view a single recipe.
const RecipeDetail = ({ recipe, onBack }) => {
  if (!recipe) {
    return (
      <div className="space-y-8 p-8 flex items-center justify-center h-full">
        <p className="text-xl text-gray-500">No recipe selected.</p>
      </div>
    );
  }

  return (
   <div>
  
     <div className="space-y-8 p-8 max-w-5xl mx-auto">
      <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
        <ArrowLeft className="h-5 w-5 mr-2" />
        Go Back
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl font-extrabold text-gray-900">{recipe.title}</h1>
            <p className="mt-2 text-lg text-gray-600">{recipe.description}</p>
            <p className="mt-1 text-sm text-gray-500">by {recipe.author}</p>
            
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Ingredients</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img src={recipe.image} alt={recipe.title} className="w-full rounded-xl shadow-md" />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
   </div>
  );
};

export default RecipeDetail