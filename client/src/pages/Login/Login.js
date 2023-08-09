import './Login.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { postSignin } from '../../data';

export default function Login() {
  const [usernamee, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [loginError, setLoginError] = useState(undefined);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const data = await postSignin(usernamee, password);
      setLoginError(undefined);
      e.target.reset();
    } catch {
      setLoginError('Invalid username or password');
    }
  }

  return (
    <main>
      <div id="login-container">
        <form id="login" onSubmit={(e) => handleLogin(e)}>
          <fieldset>
            <legend>Login</legend>
            <p className="login-error">{loginError}</p>
            <div>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button>Login</button>
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </fieldset>
        </form>
      </div>
    </main>
  );
}