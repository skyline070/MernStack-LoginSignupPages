import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <h1 className={styles.logo}>MyApp</h1>
            <div className={styles.links}>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/profile">Profile</Link>
            </div>
        </nav>
    );
};

export default Navbar;
