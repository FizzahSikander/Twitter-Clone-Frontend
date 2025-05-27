import { useState, useEffect } from "react";
import { getFetchHandler } from "../../utils/FetchHandler";

function UserImg({ id, createdAt }) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (!id) return;
    const getUserInfo = async (id) => {
      const userInfo = await getFetchHandler(`${__BASE_URL__}/user?id=${id}`);
      setUser(userInfo);
    };
    getUserInfo(id);
  }, [id]);

  return (
    <div>
      {user && (
        <>
          <img
            src={
              user.image ||
              "https://toihid.com/wp-content/uploads/2025/05/avatar.jpg"
            }
            alt="User Image"
            className="round-image"
          />
        </>
      )}
    </div>
  );
}

export default UserImg;
