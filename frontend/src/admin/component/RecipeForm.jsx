import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecipeForm = ({ onSave, onCancel }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    image: '',
    videoUrl: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchRecipeData = async () => {
      if (!token) {
        toast.error("Authentication token is missing. Please log in.");
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/recipes/recipe-details/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData({
          title: response.data.recipe.title || '',
          description: response.data.recipe.description || '',
          ingredients: response.data.recipe.ingredients || '',
          instructions: response.data.recipe.instructions || '',
          image: response.data.recipe.image || '',
          videoUrl: response.data.recipe.videoUrl || '',
        });
      } catch (e) {
        console.error("Error fetching recipe data:", e.response?.data || e.message);
        if (e.response?.status === 404) {
          toast.error("Recipe not found.");
          navigate('/recipes');
        } else {
          toast.error("Failed to load recipe data.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id && token) {
      fetchRecipeData();
    }
  }, [id, token, BASE_URL, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files[0]) {
      setImageFile(files[0]);
      setFormData((prevData) => ({ ...prevData, image: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const isEditing = !!id;
    const method = isEditing ? 'PATCH' : 'POST';
    const apiUrl = isEditing
      ? `${BASE_URL}/api/recipes/update-recipe/${id}`
      : `${BASE_URL}/api/recipes/create-recipe`;

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('ingredients', formData.ingredients);
    formDataToSend.append('instructions', formData.instructions);
    if (formData.image instanceof File) {
      formDataToSend.append('image', formData.image);
    } else if (isEditing && formData.image) {
      formDataToSend.append('image', formData.image);
    }
    formDataToSend.append('videoUrl', formData.videoUrl);

    try {
      const response = await axios({
        method: method,
        url: apiUrl,
        data: formDataToSend,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success(isEditing ? "Recipe updated successfully!" : "Recipe added successfully!");
      if (onSave) {
        onSave(response.data.recipe || response.data); // Handle both create and update responses
      }
      navigate('/recipes');
    } catch (err) {
      console.error("Error submitting form:", err.response?.data || err.message);
      const errorMessage =
        err.response?.data?.message ||
        `An unknown error occurred while trying to ${isEditing ? 'update' : 'add'} the recipe.`;
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (id && loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-xl text-gray-700">Loading recipe...</h2>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900">{id ? 'Edit Recipe' : 'Add New Recipe'}</h2>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
            Ingredients (comma-separated or one per line)
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            rows="5"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
            Instructions
          </label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows="7"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image
          </label>
          {id && formData.image && !imageFile ? (
            <div>
              <p>Current Image: <a href={formData.image} target="_blank" rel="noopener noreferrer">View Image</a></p>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>
          ) : (
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              required={!id}
            />
          )}
        </div>
        <div>
          <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">
            Video URL (Optional)
          </label>
          <input
            type="url"
            id="videoUrl"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;