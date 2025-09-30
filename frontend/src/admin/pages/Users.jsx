import { useState, useEffect, useCallback } from "react";
import { Eye, Edit, Trash2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Header from "../component/Reusables/header";
import Sidebar from "../component/Reusables/sidebar";
import { toast } from "react-toastify";
import EditUserModal from "../component/EditUserModa";

// Debounce utility to prevent rapid API calls
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const UsersAdmin = () => {
  const { token } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userToEditId, setUserToEditId] = useState(null);

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const fetchUsers = useCallback(
    debounce(async () => {
      if (!token) {
        toast.error("Session expired. Please log in.");
        navigate("/login");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/api/user/all-users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(Array.isArray(res.data.userDetails) ? res.data.userDetails : []);
      } catch (e) {
        console.error("Error fetching users:", e);
        const errorMessage =
          e.response?.data?.message || e.message || "Failed to fetch users.";
        toast.error(errorMessage);
        if (e.response?.status === 401) {
          navigate("/login");
        }
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    [token, BASE_URL, navigate]
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const viewDetails = (id) => {
    navigate(`/user-details/${id}`);
  };

  const handleUpdate = (id) => {
    setUserToEditId(id);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setUserToEditId(null);
  };

  const handleDelete = (id) => {
    setUserToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/user/delete-user/${userToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("User deleted successfully!");
      fetchUsers();
    } catch (e) {
      console.error("Error deleting user:", e);
      const errorMessage =
        e.response?.data?.message || e.message || "Failed to delete user.";
      toast.error(errorMessage);
      if (e.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <Sidebar />
      <main className="space-y-6 lg:ml-64 pt-20 px-4" aria-label="User Management">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-500 text-lg mx-auto" aria-live="polite">
            <Loader2 className="animate-spin m-auto" aria-hidden="true" />
            <span>Loading users...</span>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-lg mx-auto" aria-live="polite">
            No users found.
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200" aria-describedby="user-table">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S/N
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => viewDetails(user._id)}
                        className="text-green-600 hover:text-green-800 mr-4"
                        title="View user details"
                        aria-label={`View details for ${user.name || "user"}`}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleUpdate(user._id)}
                        className="text-blue-600 hover:text-blue-800 mr-4"
                        title="Edit user"
                        aria-label={`Edit ${user.name || "user"}`}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-600 hover:text-red-800 mr-4"
                        title="Delete user"
                        aria-label={`Delete ${user.name || "user"}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-modal-title"
        >
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 mx-4">
            <h2 id="delete-modal-title" className="text-xl font-bold text-gray-900 mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-700 mb-6">Are you sure you want to delete this user? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                aria-label="Cancel deletion"
              >
                No, Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                aria-label="Confirm deletion"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && userToEditId && (
        <EditUserModal
          userId={userToEditId}
          onClose={handleCloseEditModal}
          onSuccess={fetchUsers}
        />
      )}
    </div>
  );
};

export default UsersAdmin;