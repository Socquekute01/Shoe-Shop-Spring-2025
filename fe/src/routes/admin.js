import DashboardPage from "../features/admin/Dashboard";
import UsersPage from "../features/admin/User";
import UserDetail from "../features/admin/User/UserDetail";
import UserForm from "../features/admin/User/UserForm";
import ProductPage from "../features/admin/Product";
import OrderPage from "../features/admin/Order";
import Page404 from "../features/page404";

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
  { path: "/admin/*", element: Page404 },
];