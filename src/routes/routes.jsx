import { Route, Routes } from "react-router-dom";
import StoreAppLayout from "../components/StoreAppLayout/StoreAppLayout";
import { getAppRoutes } from "./constants/appRoutes";

const routes = getAppRoutes();

const StoreAppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StoreAppLayout />}>
        {routes.map(({ href, componentToDisplay: Component }) => (
          <Route key={href} path={`${href}/*`} element={<Component />} />
        ))}
      </Route>
    </Routes>
  );
};

export default StoreAppRoutes;
