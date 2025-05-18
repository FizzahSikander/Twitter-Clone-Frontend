import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import './styles/login.css';
import App from './App.jsx';
import { UserProvider } from './utils/UserContext.jsx'; // ✅

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider> {/* ✅ Provide user context to the whole app */}
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
