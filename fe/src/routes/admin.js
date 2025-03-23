import DashboardPage from "../features/admin/Dashboard";
import UsersPage from "../features/admin/User";
import UserDetail from "../features/admin/User/UserDetail";
import UserForm from "../features/admin/User/UserForm";
import ProductPage from "../features/admin/Product";
import OrderPage from "../features/admin/Order";
import Page404 from "../features/page404";
import ProductDetail from "../features/admin/Product/ProductDetail";
import ProductForm from "../features/admin/Product/ProductForm";
import BlogPage from "../features/admin/Blog";
import BlogDetail from "../features/admin/Blog/BlogDetail";
import BlogForm from "../features/admin/Blog/BlogForm";

export const adminRoutes = [
  { path: "/admin", element: DashboardPage },
  { path: "/admin/dashboard", element: DashboardPage },
  { path: "/admin/order-management", element: OrderPage },
  //user
  { path: "/admin/user-management", element: UsersPage },
  { path: "/admin/users/:id", element: UserDetail },
  { path: "/admin/users/create", element: UserForm },
  { path: "/admin/users/:id/edit", element: UserForm },
  //product
  { path: "/admin/product-management", element: ProductPage },
  { path: "/admin/products/:id", element: ProductDetail },
  { path: "/admin/products/create", element: ProductForm },
  { path: "/admin/products/:id/edit", element: ProductForm },
  { path: "/admin/*", element: Page404 },
  //blog
  { path: "/admin/blog-management", element: BlogPage },
  { path: "/admin/blog/:id", element: BlogDetail },
  { path: "/admin/blog/create", element: BlogForm },
  { path: "/admin/blog/:id/edit", element: BlogForm },
];
