import LoginForm from '../components/LoginForm';

export function Login() {
  return (
    <div className="login-container">
      <img src="/twitter.png" alt="Twitter" className="logo" />
      <h1 className="title">Sign in to Twitter</h1>
      <LoginForm />
    </div>
  );
}
