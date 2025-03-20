import { Route, Routes } from "react-router-dom";
import { adminRoutes, basicRoutes } from "./routes";
import DefaultLayout from "./layouts";
import AdminLayout from "./layouts/AdminLayout";
import useUser from "./hooks/useUser";
import { useEffect, useState } from "react";

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
    if (userInformation?.role === "admin") {
      setIsAdmin(true);
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
