import AccountPage from "../features/staff/Account";
import CartPage from "../features/staff/Cart";
import CollectionPage from "../features/staff/Collection";
import HomePage from "../features/staff/Home";
import LoginPage from "../features/staff/Login";
import ProductPage from "../features/staff/Product";
import RegisterPage from "../features/staff/Register";
import { adminRoutes } from "./admin";

const basicRoutes = [
  { path: "/", element: HomePage },
  { path: "/login", element: LoginPage },
  { path: "/register", element: RegisterPage },
  { path: "/collection", element: CollectionPage },
  { path: "/product", element: ProductPage },
  { path: "/cart", element: CartPage },
  { path: "/account", element: AccountPage },

]

export { 
  basicRoutes,
  adminRoutes
}

