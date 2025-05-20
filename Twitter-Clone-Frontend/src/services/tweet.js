export const createTweet = async (params) => {
  try {
    const response = await fetch(`http://localhost:3000/tweet`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      return { error: `HTTP ${response.status}` };
    }

    const data = await response.json();

    if (data.error) {
      return { error: data.error };
    }
    return { message: data.message };
  } catch (err) {
    return { error: err.message || "Unexpected error" };
  }
};

export const addComment = async (params) => {
  console.log(params, "params");
  try {
    const response = await fetch(`${__BASE_URL__}/comment`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      return { error: `HTTP ${response.status}` };
    }

    const data = await response.json();

    if (data.error) {
      return { error: data.error };
    }
    return { message: data.message };
  } catch (err) {
    return { error: err.message || "Unexpected error" };
  }
};

export const getTimeAgo = (dateString) => {
  const now = new Date();
  const created = new Date(dateString);
  const diff = Math.floor((now - created) / 1000); // difference in seconds

  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} months ago`;

  return `${Math.floor(diff / 31536000)} years ago`;
};
