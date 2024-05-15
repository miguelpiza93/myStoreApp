import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import "./StoreAppLayout.css";


const StoreAppLayout = ( ) => {
  return (
    <div id="container">
      <div id="body">
        <Sidebar />
        <main><Outlet /></main>
      </div>
    </div>
  );
};

StoreAppLayout.propTypes = {
  children: PropTypes.node
};

export default StoreAppLayout;