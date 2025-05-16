export const Auth = async () => {
  try {
    const response = await fetch(`http://localhost:3000/validate`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();

    if (data.error) {
      console.error("user is not valid:", data.error);
      return { error: data.error };
    }
    return data.user
  } catch (err) {
    return err;
  }
};
