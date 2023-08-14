import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <a
        href="https://github.com/AaronHe09?tab=overview&from=2023-08-01&to=2023-08-14"
        target="_blank"
        rel="noreferrer">
        <FontAwesomeIcon icon={faGithub} size="4x" />
      </a>
      <a
        href="https://www.linkedin.com/in/aaronhe09/"
        target="_blank"
        rel="noreferrer">
        <FontAwesomeIcon icon={faLinkedin} size="4x" />
      </a>
    </footer>
  );
}
