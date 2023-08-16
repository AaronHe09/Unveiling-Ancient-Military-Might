import './PromptLogin.css';
import { Link } from 'react-router-dom';

export default function PromptLogin() {
  return (
    <div id="prompt-login-container">
      <span>
        Please <Link to="/login">login</Link> or{' '}
        <Link to="/signup">make an account</Link> to see and save your favorited
        generals and units
      </span>
    </div>
  );
}
