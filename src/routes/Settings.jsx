import { Route, Routes } from 'react-router-dom';
import { ProductList } from "../components/Product";
import { SupplierList } from "../components/Suppliers";

const Settings = () => {
    return (
        <div>
            <Routes>
                <Route key={`suppliers`} path={`suppliers`} element={<SupplierList/>} />
                <Route key={`products`} path={`products`} element={<ProductList/>} />
            </Routes>
        </div>
    );
};

export default Settings;
