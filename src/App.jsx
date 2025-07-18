import { useEffect, useState } from "react";
import { Login } from "./pages/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { AuthRedirect } from "./utils/AuthRedirect";
import Home from "./pages/Home";
import { Auth } from "./services/authentication";
import { useUser } from "./utils/UserContext";
import { Footer } from "./components/Footer";
import { SideBar } from "./components/SideBar";
import { SearchResults } from "./components/SearchResults";

function App() {
  const { user, setUser } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    const validateUser = async () => {
      const currentUser = await Auth();
      if (!currentUser || currentUser.error) {
        navigate("/login");
        return;
      }
      setUser(currentUser);
    };
    validateUser();
  }, [setUser]);

  return (
    <>
      <div className="container">
        {user && <SideBar />}
        <div className="wrapper">
          <Routes>
            <Route path="/" element={<AuthRedirect />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </div>
      </div>
      {user && <Footer />}
    </>
  );
}

export default App;
