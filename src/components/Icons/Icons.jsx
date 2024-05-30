import * as svgIcons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "./Icons.module.scss"

const Icons = () => {
    return (
        <div className={styles.wrapper}>
            {
                Object.entries(svgIcons).map((svgIcon, index) => {
                    return (
                        <div key={index} className={styles.iconInfo}>
                            <FontAwesomeIcon className={styles.icon} icon={svgIcon[1]} />
                            <strong>{svgIcon[1].iconName}</strong>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Icons;