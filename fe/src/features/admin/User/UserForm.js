import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Loader } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../api";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  userName: Yup.string().required("Username is required"),
  dateOfBirth: Yup.date().required("Date of birth is required"),
  gender: Yup.boolean(),
  actived: Yup.boolean(),
});

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      userName: "",
      dateOfBirth: "",
      gender: true,
      actived: true,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);

        // Handle avatar upload if there's a new file
        let avatarUrl = values.avatar;
        // if (avatarFile) {
        //   const formData = new FormData();
        //   formData.append("file", avatarFile);
        //   const uploadResponse = await api.post("/upload", formData);
        //   avatarUrl = uploadResponse.data.url;
        // }

        const userData = {
          ...values,
          avatar: avatarUrl,
        };

        if (isEditMode) {
          await api.updateUserById(id, userData);
        } else {
          await api.post("/users", userData);
        }

        navigate(`/admin/user-management/${id}`);
      } catch (error) {
        console.error("Error saving user:", error);
        setError(error.response?.data?.message || "Failed to save user");
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchUser = async () => {
        try {
          const response = await api.getUserById(id);
          const userData = response.data;

          formik.setValues({
            name: userData.name || "",
            email: userData.email || "",
            phoneNumber: userData.phoneNumber || "",
            address: userData.address || "",
            userName: userData.userName || "",
            dateOfBirth: userData.dateOfBirth
              ? userData.dateOfBirth.split("T")[0]
              : "",
            gender: userData.gender,
            actived: userData.actived,
            avatar: userData.avatar || "",
          });

          setAvatarPreview(userData.avatar);
        } catch (error) {
          console.error("Error fetching user:", error);
          setError("Failed to fetch user data");
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [id, isEditMode]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading)
    return <div className="flex justify-center p-8">Loading user data...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <Link to={`/admin/users/${id}`} className="text-gray-500 hover:text-gray-700">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">
          {isEditMode ? "Edit User" : "Create User"}
        </h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-2 bg-gray-200 flex items-center justify-center">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </div>
            <label className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded cursor-pointer">
              Upload Avatar
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              className={`w-full px-3 py-2 border rounded-lg ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="userName"
              className={`w-full px-3 py-2 border rounded-lg ${
                formik.touched.userName && formik.errors.userName
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isEditMode} // Username shouldn't be editable in edit mode
            />
            {formik.touched.userName && formik.errors.userName && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.userName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className={`w-full px-3 py-2 border rounded-lg ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              className={`w-full px-3 py-2 border rounded-lg ${
                formik.touched.phoneNumber && formik.errors.phoneNumber
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.phoneNumber}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              className={`w-full px-3 py-2 border rounded-lg ${
                formik.touched.dateOfBirth && formik.errors.dateOfBirth
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.dateOfBirth}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Gender</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="true"
                  checked={formik.values.gender === true}
                  onChange={() => formik.setFieldValue("gender", true)}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="false"
                  checked={formik.values.gender === false}
                  onChange={() => formik.setFieldValue("gender", false)}
                  className="mr-2"
                />
                Female
              </label>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1">Address</label>
            <textarea
              name="address"
              rows="3"
              className={`w-full px-3 py-2 border rounded-lg ${
                formik.touched.address && formik.errors.address
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.address && formik.errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.address}
              </p>
            )}
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="actived"
                checked={formik.values.actived}
                onChange={() =>
                  formik.setFieldValue("actived", !formik.values.actived)
                }
                className="mr-2"
              />
              Active Account
            </label>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Link
            to="/admin/users"
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <>
                <Loader size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save User
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
