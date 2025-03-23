import DashboardPage from "../features/admin/Dashboard";
import UsersPage from "../features/admin/User";
import ProductPage from "../features/admin/Product";
import OrderPage from "../features/admin/Order";
import Page404 from "../features/page404";

export const adminRoutes = [
  { path: "/admin", element: DashboardPage },  
  { path: "/admin/dashboard", element: DashboardPage },  
  { path: "/admin/order-management", element: OrderPage },
  { path: "/admin/user-management", element: UsersPage },
  { path: "/admin/product-management", element: ProductPage },  
  { path: "/admin/*", element: Page404 },
];