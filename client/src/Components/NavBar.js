import spartanIcon from '../images/spartan-icon-white.png';
import './NavBar.css';
import { Outlet, Link } from 'react-router-dom';
import UserContext from './UserContext';
import { useContext } from 'react';

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
              <Link to="/build-your-army">Build Your Army</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
