export function Login() {
  return (
    <div className="login-container">
      <img src="/twitter.png" alt="Twitter" className="logo" />
      <h1 className="title">Sign in to Twitter</h1>

      <div className="form">
        <input
          type="text"
          className="input"
          placeholder="Phone, email address or username"
        />
        <button className="next">Next</button>
        <button className="forgot">Forgot password?</button>
      </div>

      <p className="signup">
        Don’t have an account? <a href="#">Sign up</a>
      </p>
    </div>
  );
}
