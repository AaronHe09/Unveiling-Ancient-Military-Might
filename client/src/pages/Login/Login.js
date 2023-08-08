import './Login.css';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <main>
      <div id="login-container">
        <form id="login">
          <fieldset>
            <legend>Login</legend>
            <div>
              <input type="text" placeholder="Username" required />
            </div>
            <div>
              <input type="text" placeholder="Password" required />
            </div>
            <button>Login</button>
            <p>
              Don't have an account? <Link>Sign Up</Link>
            </p>
          </fieldset>
        </form>
      </div>
    </main>
  );
}
