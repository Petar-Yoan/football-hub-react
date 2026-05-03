import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    const result = login({ email, password });

    if (!result.success) {
      setError(result.message);
      return;
    }

    setError('');
    navigate('/profile');
  };

  return (
    <section className="form-page">
      <div className="form-card">
        <h1>Login</h1>

        <form className="auth-form" onSubmit={submitHandler}>
          {error && <p className="form-error">{error}</p>}

          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button type="submit" className="form-button">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;