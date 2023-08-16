import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { postSignin } from '../../data';
import UserContext from '../../Components/UserContext';

export default function Login({ setUserInfo }) {
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [loginError, setLoginError] = useState(undefined);
  const navigate = useNavigate();
  const user = useContext(UserContext);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const data = await postSignin(username, password);
      const { payload, token } = data;
      const obj = { username: payload.username, token };
      localStorage.setItem('token', JSON.stringify(obj));
      setUserInfo(obj);
      setLoginError(undefined);
      e.target.reset();
      navigate('/');
    } catch {
      setLoginError('Invalid username or password');
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setUserInfo(undefined);
    navigate('/login');
  }

  function handleGuestLogin() {
    setUsername('testuser3');
    setPassword('1234');
  }

  return (
    <main>
      {!user && (
        <div id="login-container">
          <form id="login" onSubmit={handleLogin}>
            <fieldset>
              <legend>Login</legend>
              <p className="login-error">{loginError}</p>
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  defaultValue={username}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  defaultValue={password}
                  required
                />
              </div>
              <button type="submit">Login</button>
              <button type="button" onClick={handleGuestLogin}>
                Guest Login
              </button>
              <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </fieldset>
          </form>
        </div>
      )}
      {user && (
        <div id="logout">
          <p>Welcome, {user.username}</p>
          <button type="button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      )}
    </main>
  );
}
