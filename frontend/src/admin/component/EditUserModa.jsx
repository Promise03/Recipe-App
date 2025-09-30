import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * A modal component for editing a user's profile.
 */
function EditUserModal({ userId, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    role: 'regular', // Default to match backend
  });
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/user/get-user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { name = '', username = '', role = 'regular' } = response.data;
        const fetchedData = { name, username, role, password: '' };
        setFormData(fetchedData);
        setInitialData(fetchedData);
      } catch (e) {
        console.error('Error fetching user data:', e);
        toast.error('Failed to load user data.');
      } finally {
        setIsLoading(false);
      }
    };

    if (userId && token) {
      fetchUserData();
    }
  }, [userId, token, BASE_URL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Name is required.');
      return false;
    }
    if (!formData.username.trim()) {
      toast.error('Username is required.');
      return false;
    }
    if (formData.password && formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return false;
    }
    if (!['regular', 'admin'].includes(formData.role)) {
      toast.error('Please select a valid role.');
      return false;
    }
    return true;
  };

  const getChangedFields = () => {
    if (!initialData) return formData;
    const changed = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== initialData[key] && (key !== 'password' || formData.password)) {
        changed[key] = formData[key];
      }
    });
    return changed;
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const changedData = getChangedFields();
      if (Object.keys(changedData).length === 0) {
        toast.info('No changes to update.');
        onClose();
        return;
      }

      console.log('Sending update with data:', changedData); // Debug log
      await axios.patch(
        `${BASE_URL}/api/user/update-profile/${userId}`,
        changedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('User updated successfully!');
      onSuccess();
      onClose();
    } catch (e) {
      console.error('Error updating user:', e);
      const errorMessage =
        e.response?.data?.message ||
        e.response?.data?.error ||
        'An unknown error occurred.';
      toast.error(`Failed to update user: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Edit User</h2>
        {isLoading ? (
          <div className="text-center py-4">
            <p className="text-gray-500">Loading user data...</p>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleUpdateUser}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password (leave blank to keep unchanged)
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                id="role"
                value={formData.role}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              >
                <option value="regular">Regular</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting ? 'Updating...' : 'Update User'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditUserModal;