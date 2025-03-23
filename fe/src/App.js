import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import useUser from "./hooks/useUser";
import DefaultLayout from "./layouts";
import AdminLayout from "./layouts/AdminLayout";
import { adminRoutes, basicRoutes } from "./routes";

function App() {
  const [userInformation] = useUser();

  const [isAdmin, setIsAdmin] = useState(false);
  const Layout = isAdmin ? AdminLayout : DefaultLayout;
  const RoutesByRoles = isAdmin ? adminRoutes : basicRoutes;
  
  const RoutesComponent = RoutesByRoles.map((route, index) => {
    const { path, element } = route;
    const ContentComponent = element;
    return (
      <Route key={index} path={path} element={<Layout><ContentComponent /></Layout>} />
    );
  });


  useEffect(() => {
    if (userInformation?.role === "ROLE_ADMIN") {
      setIsAdmin(true);
      if (!window.location.href.includes("admin")) {
        window.location.href = "/admin";
      }
    }
  }, [userInformation]);

  return (
    <>
      <Routes>
        {RoutesComponent}
      </Routes>
    </>
  );
}

export default App;
