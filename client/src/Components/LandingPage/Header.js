import spartanIcon from '../../images/spartan-icon-white.png';
import './Header.css';

export default function Header() {
  return (
    <header>
      <div className="column-half img-wrapper">
        <img src={spartanIcon} alt="Spartan Icon" />
      </div>
      <nav className="column-half">
        <ul>
          <li>Login</li>
          <li>Factions</li>
          <li>Build Your Army</li>
        </ul>
      </nav>
    </header>
  );
}
