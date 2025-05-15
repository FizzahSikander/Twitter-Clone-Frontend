import { useState } from "react";
import { Login } from "./pages/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import { Register } from "./pages/Register";
import Home from "./pages/Home";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />

        {/* <Route path="/feed" element={<Feed />} />
      <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </>
  );
}

export default App;
