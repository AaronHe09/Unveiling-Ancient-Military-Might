import spartanIcon from '../../images/spartan-icon-white.png';
import './Header.css';

export default function Header() {
  return (
    <header>
      <div className="column-half img-wrapper">
        <img src={spartanIcon} alt="Spartan Icon" />
      </div>
      <div className="column-half header-dirc">
        <ul>
          <li>Login</li>
          <li>Factions</li>
          <li>Build Your Army</li>
        </ul>
      </div>
    </header>
  );
}
