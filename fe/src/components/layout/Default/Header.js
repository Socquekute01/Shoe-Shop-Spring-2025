import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHeart,
  faBagShopping,
  faUser,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import api from "../../../api";
import useUser from "../../../hooks/useUser";
import axios from "axios";

function Header() {
  const [userInformation, setUserInformation] = useUser();

  const handleLogout = async () => {
    try {
      await api.logout;
      setUserInformation(null);
      localStorage.removeItem("userData");
      delete axios.defaults.headers.common["Authorization"];
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <header className="py-4 shadow-sm bg-white">
        <div className="container flex items-center justify-between">
          <Link to="/">
            <img src="assets/images/logo.svg" alt="Logo" className="w-32" />
          </Link>

          <div className="w-full max-w-xl relative flex">
            <span className="absolute left-4 top-3 text-lg text-gray-400">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
            <input
              type="text"
              name="search"
              id="search"
              className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex"
              placeholder="search"
            />
            <button className="bg-primary items-center border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex">
              Search
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="text-center text-gray-700 hover:text-primary transition relative"
            >
              <div className="text-2xl">
                <FontAwesomeIcon icon={faBagShopping} />
              </div>
              <div className="text-xs leading-3">Cart</div>
              <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                2
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/account"
                className="text-center text-gray-700 hover:text-primary transition relative"
              >
                <div className="text-2xl">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="text-xs leading-3">Account</div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-gray-800">
        <div className="container flex">
          <div className="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
            <span className="text-white">
              <FontAwesomeIcon icon={faBars} />
            </span>
            <span className="capitalize ml-2 text-white">All Categories</span>

            <div className="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
              <a
                href="#"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img
                  src="assets/images/icons/sofa.svg"
                  alt="sofa"
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm">Sofa</span>
              </a>
              <a
                href="#"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img
                  src="assets/images/icons/terrace.svg"
                  alt="terrace"
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm">Terarce</span>
              </a>
              <a
                href="#"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img
                  src="assets/images/icons/bed.svg"
                  alt="bed"
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm">Bed</span>
              </a>
              <a
                href="#"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img
                  src="assets/images/icons/office.svg"
                  alt="office"
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm">office</span>
              </a>
              <a
                href="#"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img
                  src="assets/images/icons/outdoor-cafe.svg"
                  alt="outdoor"
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm">Outdoor</span>
              </a>
              <a
                href="#"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img
                  src="assets/images/icons/bed-2.svg"
                  alt="Mattress"
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm">Mattress</span>
              </a>
            </div>
          </div>

          <div className="flex items-center justify-between flex-grow md:pl-12 py-5">
            <div className="flex items-center space-x-6 capitalize">
              <Link
                to="/"
                className="text-gray-200 hover:text-white transition"
              >
                Home
              </Link>
              <Link
                to="/collection"
                className="text-gray-200 hover:text-white transition"
              >
                Shop
              </Link>
              <a href="#" className="text-gray-200 hover:text-white transition">
                About us
              </a>
              <a href="#" className="text-gray-200 hover:text-white transition">
                Contact us
              </a>
            </div>
            <div>
              {userInformation && userInformation?.userName ? (
                <div className="flex items-center gap-2">
                  <span className="text-gray-200">
                    Hello,&ensp;
                    <b className="text-primary">
                      {userInformation.name || userInformation.username}
                    </b>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="ml-5 bg-primary border border-primary text-white px-3 py-2 font-medium rounded-md hover:bg-transparent hover:text-primary"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    className="text-gray-200 hover:text-white transition"
                    to="/login"
                  >
                    Login
                  </Link>
                  <Link
                    className="ml-5 bg-primary border border-primary text-white px-3 py-2 font-medium rounded-md hover:bg-transparent hover:text-primary"
                    to="/register"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
