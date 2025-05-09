import RegisterForm from '../components/RegisterForm';

export function Register() {
  return (
    <div className="login-container">
      <img src="/twitter.png" alt="Twitter" className="logo" />
      <h1 className="title">Create an account</h1>
      <RegisterForm />
    </div>
  );
}
