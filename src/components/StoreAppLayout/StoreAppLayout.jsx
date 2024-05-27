import cn from 'classnames';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Sidebar from "../LeftSidebar/LeftSidebar";
import styles from "./StoreAppLayout.module.scss";


const StoreAppLayout = ( ) => {
  return (
    <div className={styles.appLayout}>
      {/* <header className={styles.appHeader}></header> */}
      <Sidebar className={cn(styles.sidebar, styles.leftSide)}></Sidebar>
      <main className={styles.appContent}><Outlet/></main>
      {/* <footer className={styles.appFooter}></footer> */}
    </div>
  );
};

StoreAppLayout.propTypes = {
  children: PropTypes.node
};

export default StoreAppLayout;