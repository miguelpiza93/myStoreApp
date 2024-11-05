import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboardList, faCashRegister, faBox, faGear } from '@fortawesome/free-solid-svg-icons';
import styles from "./SidebarItem.module.scss";

const iconMap = {
  HomeIcon: faHome,
  PurchaseIcon: faClipboardList,
  StockIcon: faBox,
  SalesIcon: faCashRegister,
  SettingsIcon: faGear,
};

const SidebarItem = ({ icon, label, rightBadge, className, onClick }) => {
  const iconObject = iconMap[icon];

  return (
    <div className={styles.wrapper} onClick={onClick}>
      {iconObject && <FontAwesomeIcon icon={iconObject} />}
      <span>{label}</span>
      {rightBadge}
    </div>
  );
};

SidebarItem.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
  rightBadge: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default SidebarItem;
