import { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Register data:', {
      username,
      email,
      password,
      repeatPassword,
    });
  };

  return (
    <section className="form-page">
      <div className="form-card">
        <h1>Register</h1>

        <form className="auth-form" onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="register-username">Username</label>
            <input
              id="register-username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-repeat-password">Repeat Password</label>
            <input
              id="register-repeat-password"
              type="password"
              placeholder="Repeat your password"
              value={repeatPassword}
              onChange={(event) => setRepeatPassword(event.target.value)}
            />
          </div>

          <button type="submit" className="form-button">
            Register
          </button>
        </form>
      </div>
    </section>
  );
}

export default Register;