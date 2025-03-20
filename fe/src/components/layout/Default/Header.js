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

function Header() {
  const [user, setUser] = useUser();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("accessToken");
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <header class="py-4 shadow-sm bg-white">
        <div class="container flex items-center justify-between">
          <Link to="/">
            <img src="assets/images/logo.svg" alt="Logo" class="w-32" />
          </Link>

          <div class="w-full max-w-xl relative flex">
            <span class="absolute left-4 top-3 text-lg text-gray-400">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
            <input
              type="text"
              name="search"
              id="search"
              class="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex"
              placeholder="search"
            />
            <button class="bg-primary items-center border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex">
              Search
            </button>
          </div>

          <div class="flex items-center space-x-4">
            <Link
              to="/cart"
              class="text-center text-gray-700 hover:text-primary transition relative"
            >
              <div class="text-2xl">
                <FontAwesomeIcon icon={faBagShopping} />
              </div>
              <div class="text-xs leading-3">Cart</div>
              <div class="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                2
              </div>
            </Link>
            <Link
              to="/account"
              class="text-center text-gray-700 hover:text-primary transition relative"
            >
              <div class="text-2xl">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div class="text-xs leading-3">Account</div>
            </Link>
          </div>
        </div>
      </header>

      <nav class="bg-gray-800">
        <div class="container flex">
          <div class="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
            <span class="text-white">
              <FontAwesomeIcon icon={faBars} />
            </span>
            <span class="capitalize ml-2 text-white">All Categories</span>

            <div class="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
              <a
                href="#"
                class="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img
                  src="assets/images/icons/sofa.svg"
                  alt="sofa"
                  class="w-5 h-5 object-contain"
                />
                <span class="ml-6 text-gray-600 text-sm">Sofa</span>
              </a>
              <a
                href="#"
                class="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img
                  src="assets/images/icons/terrace.svg"
                  alt="terrace"
                  class="w-5 h-5 object-contain"
                />
                <span class="ml-6 text-gray-600 text-sm">Terarce</span>
              </a>
              <a
                href="#"
                class="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img
                  src="assets/images/icons/bed.svg"
                  alt="bed"
                  class="w-5 h-5 object-contain"
                />
                <span class="ml-6 text-gray-600 text-sm">Bed</span>
              </a>
              <a
                href="#"
                class="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img
                  src="assets/images/icons/office.svg"
                  alt="office"
                  class="w-5 h-5 object-contain"
                />
                <span class="ml-6 text-gray-600 text-sm">office</span>
              </a>
              <a
                href="#"
                class="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img
                  src="assets/images/icons/outdoor-cafe.svg"
                  alt="outdoor"
                  class="w-5 h-5 object-contain"
                />
                <span class="ml-6 text-gray-600 text-sm">Outdoor</span>
              </a>
              <a
                href="#"
                class="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img
                  src="assets/images/icons/bed-2.svg"
                  alt="Mattress"
                  class="w-5 h-5 object-contain"
                />
                <span class="ml-6 text-gray-600 text-sm">Mattress</span>
              </a>
            </div>
          </div>

          <div class="flex items-center justify-between flex-grow md:pl-12 py-5">
            <div class="flex items-center space-x-6 capitalize">
              <Link to="/" class="text-gray-200 hover:text-white transition">
                Home
              </Link>
              <Link
                to="/collection"
                class="text-gray-200 hover:text-white transition"
              >
                Shop
              </Link>
              <a href="#" class="text-gray-200 hover:text-white transition">
                About us
              </a>
              <a href="#" class="text-gray-200 hover:text-white transition">
                Contact us
              </a>
            </div>
            <div>
              {user ? (
                <div className="flex items-center gap-2">
                  <span>Hello, {user.first_name}</span>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              ) : (
                <>
                  <Link
                    class="text-gray-200 hover:text-white transition"
                    to={"/login"}
                  >
                    Login
                  </Link>
                  <Link
                    class=" ml-5 bg-primary border border-primary text-white px-3 py-2 font-medium 
 rounded-md hover:bg-transparent hover:text-primary"
                    to={"/register"}
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
