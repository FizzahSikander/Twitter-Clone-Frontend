import { useState, useEffect } from "react";
import { getFetchHandler } from "../../utils/FetchHandler";
import { getTimeAgo } from "../../services/tweet";

function UserInfo({ id, createdAt }) {
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
          <b>{user.name}</b> @{user.nickname} - {getTimeAgo(createdAt)}
        </>
      )}
    </div>
  );
}

export default UserInfo;
