import { useState } from 'react';
import { logoutUser } from '../services/logout';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../utils/UserContext';
import '../styles/footer.css';

export function Footer() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const { user } = useUser();

  console.log(user);

  if (!user) return null;
  return (
    <>
      <footer
        style={{
          bottom: 0,
          width: '100%',

          padding: '15px',
          boxShadow: '0 -1px 6px rgba(0,0,0,0.03)',
        }}
      >
        <div
          style={{
            display: 'flex',
            maxWidth: 300,
            margin: '0 auto',
          }}
        >
          <img
            src={user.image}
            alt='avatar'
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              cursor: 'pointer',
              marginRight: 12,
            }}
            onClick={() => navigate(`/profile/${user.nickname}`)}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: 16,
                lineHeight: 1.1,
              }}
            >
              {user.name}
            </div>
            <div className='footer-handle' onClick={() => navigate(`/profile/${user.nickname}`)}>
              @{user.nickname}
            </div>
          </div>
          <span
            style={{
              fontSize: 28,
              cursor: 'pointer',
              fontWeight: 700,
              userSelect: 'none',
              letterSpacing: 6,
              transform: 'translateY(-10px)',
            }}
            onClick={() => setShowPopup(true)}
          >
            ...
          </span>
        </div>
      </footer>

      {showPopup && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(56,68,77,0.7)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 18,
              padding: '36px 32px 32px 32px',
              minWidth: 350,
              boxShadow: '0 0 0 1px #d6d9db,0 6px 36px 0 rgba(0,0,0,0.20)',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <img src='/twitter.png' alt='' style={{ width: 32, height: 32, marginBottom: 16 }} />
              <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 24 }}>
                Log out of Twitter?
              </div>
              <button
                style={{
                  background: '#14171a',
                  color: '#fff',
                  width: '100%',
                  border: 'none',
                  borderRadius: 24,
                  fontWeight: 700,
                  fontSize: 16,
                  padding: '12px 0',
                  marginBottom: 12,
                  cursor: 'pointer',
                }}
                onClick={async () => {
                  await logoutUser();
                  navigate('/login');
                }}
              >
                Log out
              </button>
              <button
                style={{
                  background: '#fff',
                  border: '1px solid #d6d9db',
                  color: '#0f1419',
                  width: '100%',
                  borderRadius: 24,
                  fontWeight: 700,
                  fontSize: 16,
                  padding: '12px 0',
                  cursor: 'pointer',
                }}
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
