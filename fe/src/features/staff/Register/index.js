import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../api";
import { Navigate } from "react-router-dom";
import useUser from "../../../hooks/useUser";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string().required("Required"),
  username: Yup.string().required("Required"),
  dateOfBirth: Yup.date().required("Required"),
  address: Yup.string().required("Required"),
  gender: Yup.boolean().required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

function RegisterPage() {
  const [userInformation] = useUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    agreement: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      username: "",
      dateOfBirth: "",
      address: "",
      gender: true,
      password: "",
      confirmPassword: "",
      avatar: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        setLoading(true);
        await api.register({
          email: values.email,
          phoneNumber: values.phoneNumber,
          username: values.username,
          dateOfBirth: values.dateOfBirth,
          address: values.address,
          gender: values.gender,
          password: values.password,
          avatar: values.avatar,
          name: values.name,
          confirmPassword: values.confirmPassword,
        });
        // Redirect to login after successful registration
        window.location.href = "/login";
      } catch (error) {
        setErrors({
          general: error.response?.data?.message || "Registration failed",
        });
        setError(error.response?.data?.message || "Registration failed");
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });
  if (userInformation && userInformation?.userName) {
    return <Navigate to="/" replace />;
  }  
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate form
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirm
    ) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (formData.password !== formData.confirm) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    if (!formData.agreement) {
      setError("Vui lòng đồng ý với điều khoản và điều kiện");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/api/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setSuccess("Đăng ký tài khoản thành công!");
      // Có thể chuyển hướng người dùng đến trang đăng nhập sau vài giây
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      setError(
        error.response?.data?.message || "Đăng ký thất bại, vui lòng thử lại"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contain py-16">
      <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1">
          Create an account
        </h2>
        <p className="text-gray-600 mb-6 text-sm">Register for new cosutumer</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} method="post" autoComplete="off">
          <div className="space-y-2">
            <div>
              <label htmlFor="name" className="text-gray-600 mb-2 block">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                placeholder="John"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="username" className="text-gray-600 mb-2 block">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                placeholder="johndoe123"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.username}
                </div>
              ) : null}
            </div>
            <div>
              <label htmlFor="email" className="text-gray-600 mb-2 block">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                placeholder="youremail.@domain.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div>
              <label htmlFor="phoneNumber" className="text-gray-600 mb-2 block">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                placeholder="0983431215"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.phoneNumber}
                </div>
              ) : null}
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="text-gray-600 mb-2 block">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.dateOfBirth}
                </div>
              ) : null}
            </div>
            <div>
              <label htmlFor="address" className="text-gray-600 mb-2 block">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                placeholder="Your address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.address}
                </div>
              ) : null}
            </div>
            <div>
              <label className="text-gray-600 mb-2 block">Gender</label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    id="genderMale"
                    value="true"
                    checked={formik.values.gender === true}
                    onChange={() => formik.setFieldValue("gender", true)}
                    className="mr-2"
                  />
                  <label htmlFor="genderMale">Male</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    id="genderFemale"
                    value="false"
                    checked={formik.values.gender === false}
                    onChange={() => formik.setFieldValue("gender", false)}
                    className="mr-2"
                  />
                  <label htmlFor="genderFemale">Female</label>
                </div>
              </div>
              {formik.touched.gender && formik.errors.gender ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.gender}
                </div>
              ) : null}
            </div>
            <div>
              <label htmlFor="password" className="text-gray-600 mb-2 block">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                placeholder="*******"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="text-gray-600 mb-2 block"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                placeholder="*******"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            <div>
              <label htmlFor="avatar" className="text-gray-600 mb-2 block">
                Avatar (Optional)
              </label>
              <input
                type="file"
                name="avatar"
                id="avatar"
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary"
                onChange={(event) => {
                  // formik.setFieldValue("avatar", event.currentTarget.files[0]);
                  formik.setFieldValue("avatar", "");
                }}
              />
            </div>
          </div>
          <div className="mt-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="agreement"
                id="agreement"
                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                checked={formData.agreement}
                onChange={handleChange}
              />
              <label
                htmlFor="agreement"
                className="text-gray-600 ml-3 cursor-pointer"
              >
                I have read and agree to the{" "}
                <a href="#" className="text-primary">
                  terms & conditions
                </a>
              </label>
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
              disabled={loading || formik.isSubmitting}
            >
              {loading ? "Processing..." : "create account"}
            </button>
          </div>
        </form>

        <div className="mt-6 flex justify-center relative">
          <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
            Or signup with
          </div>
          <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
        </div>
        <div className="mt-4 flex gap-4">
          <a
            href="#"
            className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700"
          >
            facebook
          </a>
          <a
            href="#"
            className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500"
          >
            google
          </a>
        </div>

        <p className="mt-4 text-center text-gray-600">
          Already have account?{" "}
          <a href="/login" className="text-primary">
            Login now
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
