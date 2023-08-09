import { Link } from 'react-router-dom';
import './Signup.css';
import { useState } from 'react';
import { postSignup } from '../../data';

export default function SignUp() {
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  async function handleSignup(e) {
    e.preventDefault();
    try {
      await postSignup(username, password);
    } catch (err) {
      alert(err.message);
    }
    e.target.reset();
  }

  return (
    <main>
      <div id="signup-container">
        <form id="signup" onSubmit={(e) => handleSignup(e)}>
          <fieldset>
            <legend>Sign up</legend>
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
            <button type="submit">Create Account</button>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </fieldset>
        </form>
      </div>
    </main>
  );
}
