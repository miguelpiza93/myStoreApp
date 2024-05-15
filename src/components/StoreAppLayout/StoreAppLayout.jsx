import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import "./StoreAppLayout.scss";


const StoreAppLayout = ( ) => {
  return (
    <div id="container">
      <Sidebar />
      <div id="body">
        <main><Outlet /></main>
      </div>
    </div>
  );
};

StoreAppLayout.propTypes = {
  children: PropTypes.node
};

export default StoreAppLayout;