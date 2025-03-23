import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Edit } from "lucide-react";
import api from "../../../api";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await api.getUserById(id);
        setUser(response.data);
      } catch (error) {
        setError("Failed to fetch user details");
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center p-8">Loading user details...</div>
    );
  if (error) return <div className="text-red-500 p-8">{error}</div>;
  if (!user) return <div className="p-8">User not found</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Link to="/admin/user-management" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">User Details</h1>
        </div>
        <Link
          to={`/admin/users/${id}/edit`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Edit size={16} />
          Edit User
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
              <img
                src={user.avatar || "https://via.placeholder.com/150"}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.code}</p>
            <div className="mt-2">
              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  user.actived
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {user.actived ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>

        <div className="md:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-b pb-2">
              <p className="text-gray-500 text-sm">Username</p>
              <p className="font-medium">{user.userName}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-gray-500 text-sm">Phone Number</p>
              <p className="font-medium">{user.phoneNumber}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-gray-500 text-sm">Gender</p>
              <p className="font-medium">{user.gender ? "Male" : "Female"}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-gray-500 text-sm">Date of Birth</p>
              <p className="font-medium">
                {new Date(user.dateOfBirth).toLocaleDateString()}
              </p>
            </div>
            <div className="border-b pb-2">
              <p className="text-gray-500 text-sm">Authentication Method</p>
              <p className="font-medium capitalize">{user.oAuthProvider}</p>
            </div>
            <div className="border-b pb-2 md:col-span-2">
              <p className="text-gray-500 text-sm">Address</p>
              <p className="font-medium">{user.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
