import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/userAccess";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    nickname: "",
    about: "",
    occupation: "",
    hometown: "",
    homepage: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    if (!form.name || !form.email || !form.nickname)
      return setError("Missing fields");
    if (form.password !== form.confirm) return setError("Passwords no match");
    setError("");
    setMessage("");

    const res = await registerUser(form);
    res.message ? setMessage(res.message) : setError(res.error);
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          id="imageUpload"
          hidden
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />
        {!message && (
          <div className="img-container">
            <label htmlFor="imageUpload" className="upload-pic">
              {form.image
                ? "Change Profile Picture:"
                : "Upload Profile Picture"}
            </label>

            {form.image instanceof File && (
              <div className="preview">
                <img src={URL.createObjectURL(form.image)} alt="pic" />
                <span onClick={() => setForm({ ...form, image: null })}>✕</span>
              </div>
            )}
          </div>
        )}
        {message && (
          <Stack
            sx={{
              width: "100%",
            }}
            spacing={2}
          >
            <Alert severity="success" variant="filled" color="info">
              {message}
            </Alert>
          </Stack>
        )}
        {error && (
          <Stack
            sx={{
              width: "100%",
            }}
            spacing={2}
          >
            <Alert severity="error">{error}</Alert>
          </Stack>
        )}
        <div className="input-container">
          <input
            type="text"
            className="input"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            maxLength={30}
            name="name"
          />
          <span className="char-count">{form.name.length} / 30</span>
        </div>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          name="email"
        />
        <input
          type="text"
          className="input"
          placeholder="Nickname"
          value={form.nickname}
          onChange={(e) => setForm({ ...form, nickname: e.target.value })}
          maxLength={30}
          name="nickname"
        />
        <div className="input-container">
          <input
            type={showPassword ? "text" : "password"}
            className="input"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            name="password"
          />
          <span
            className="toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            👁
          </span>
        </div>
        <input
          type={showPassword ? "text" : "password"}
          className="input"
          placeholder="Confirm password"
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          maxLength={30}
          name="confirm_password"
        />
        <input
          type="text"
          className="input"
          placeholder="About   (optional)"
          value={form.about}
          onChange={(e) => setForm({ ...form, about: e.target.value })}
          maxLength={30}
          name="about"
        />
        <input
          type="text"
          className="input"
          placeholder="Occupation   (optional)"
          value={form.occupation}
          onChange={(e) => setForm({ ...form, occupation: e.target.value })}
          maxLength={30}
          name="occupation"
        />
        <input
          type="text"
          className="input"
          placeholder="Hometown   (optional)"
          value={form.hometown}
          onChange={(e) => setForm({ ...form, hometown: e.target.value })}
          maxLength={30}
          name="home_town"
        />
        <input
          type="text"
          className="input"
          placeholder="Website   (optional)"
          value={form.homepage}
          onChange={(e) => setForm({ ...form, homepage: e.target.value })}
          maxLength={30}
          name="website"
        />{" "}
        <button type="submit" className="next btn" name="submit">
          Sign up
        </button>
      </form>

      <p className="signup">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </>
  );
}
