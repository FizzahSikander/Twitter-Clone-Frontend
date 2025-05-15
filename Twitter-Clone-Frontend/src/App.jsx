import { useEffect, useState } from "react";
import { Login } from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { AuthRedirect } from "./utils/AuthRedirect";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
