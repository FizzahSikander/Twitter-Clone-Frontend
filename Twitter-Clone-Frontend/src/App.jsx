import { useState } from 'react';
import { Login } from './pages/Login';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile'; // Import Profile.jsx

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} /> {/* Add Profile route */}

        {/* <Route path="/feed" element={<Feed />} /> */}
      </Routes>
    </>
  );
}

export default App;