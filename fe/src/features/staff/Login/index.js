import { useFormik } from "formik";
import { Navigate } from "react-router-dom";
import * as Yup from "yup";
import api from "../../../api";
import useUser from "../../../hooks/useUser";
import { decodeJWT } from "../../../utils/jwtUtils";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

function LoginPage() {
  const [userInformation, setUserInformation] = useUser();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await api.login(values);
        const decodedToken = decodeJWT(response.data.token);

        // Kiểm tra response hợp lệ
        if (!response.data || !response.data.userName) {
          throw new Error("Invalid user data from server");
        }

        // Cập nhật context user
        setUserInformation({
          userName: response.data.userName,
          name: response.data.name,
          avatar: response.data.avatar,
          role: response.data.roles[0].authority,
          accessToken: response.data.token,
        });

        // Redirect
        const isAdmin = response.data.roles?.includes("ADMIN");
        window.location.href = isAdmin ? "/admin/dashboard" : "/";
      } catch (error) {
        let errorMessage = "Đăng nhập thất bại";
        console.log(error);
        // Xử lý các loại lỗi khác nhau
        if (error.response) {
          // Lỗi từ server
          errorMessage = error.response.data?.message || errorMessage;
        } else if (error.message.includes("Invalid user data")) {
          errorMessage = "Thông tin người dùng không hợp lệ";
        } else {
          errorMessage = "Lỗi kết nối máy chủ";
        }

        setErrors({ general: errorMessage });
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (userInformation && userInformation?.userName) {
    return <Navigate to="/" replace />;
  } 

  return (
    <>
      <div className="contain py-16">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
          <p className="text-gray-600 mb-6 text-sm">welcome back customer</p>

          {formik.errors.general && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {formik.errors.general}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div className="space-y-2">
              <div>
                <label htmlFor="username" className="text-gray-600 mb-2 block">
                  Username
                </label>
                <input
                  name="username"
                  id="username"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.username}
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                  checked={formik.values.rememberMe}
                  onChange={formik.handleChange}
                />
                <label
                  htmlFor="rememberMe"
                  className="text-gray-600 ml-3 cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <a href="#" className="text-primary">
                Forgot password
              </a>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium disabled:opacity-50"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <div className="mt-6 flex justify-center relative">
            <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
              Or login with
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
            Don't have account?{" "}
            <a href="/register" className="text-primary">
              Register now
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
