import './Login.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { postSignin } from '../../data';
import { useContext } from 'react';
import UserContext from '../../Components/UserContext';

export default function Login({ setUserInfo }) {
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [loginError, setLoginError] = useState(undefined);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const data = await postSignin(username, password);
      const { payload, token } = data;
      const obj = { username: payload.username, token };
      localStorage.setItem('token', JSON.stringify(obj));
      setUserInfo(data);
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
