import spartanIcon from '../images/spartan-icon-white.png';
import './NavBar.css';
import { Outlet, Link } from 'react-router-dom';
import UserContext from './UserContext';
import { useContext } from 'react';
import Footer from './Footer';

export default function NavBar() {
  const user = useContext(UserContext);

  return (
    <>
      <header>
        <div className="column-half img-wrapper">
          <Link to="/">
            <img src={spartanIcon} alt="Spartan Icon" />
          </Link>
        </div>
        <nav className="column-half">
          <ul>
            <li>
              <Link to="/login">{user ? user.username : 'Login'}</Link>
            </li>
            <li>
              <Link to="/factions">Factions</Link>
            </li>
            <li>
              <Link to="/build-your-army">Army</Link>
            </li>
            <li>
              <Link to="battlefield">Battlefield</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
      <Footer />
    </>
  );
}
