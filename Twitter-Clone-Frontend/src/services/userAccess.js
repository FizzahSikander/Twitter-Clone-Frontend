export const registerUser = async (params) => {
  try {
    const formData = new FormData();
    Object.entries(params).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    const response = await fetch(`http://localhost:3000/register`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await response.json();
    if (data.error) return { error: data.error };
    return { message: data.message, user: data.user }; // ✅ include backend user
  } catch (err) {
    return { error: "Registration failed" };
  }
};


export const loginUser = async (params) => {
  try {
    const response = await fetch(`http://localhost:3000/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(params),
    });

    const data = await response.json();
    console.log(data)
    if (data.error) {
      console.error("Error registering user:", data.error);
      return { error: data.error };
    }
    return { message: data.message, username: data.user.nickname };
  } catch (err) {
    return err;
  }
};



// export const postTweet = async (tweet) => {
//   try {
//     const response = await fetch(`http://localhost:3000/tweet`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ tweet }),
//     });

//     const data = await response.json();
//     console.log(data);
//     if (data.error) {
//       console.error("Error registering user:", data.error);
//       return { error: data.error };
//     }
//     return { message: data.message };
//   } catch (err) {
//     return err;
//   }
// };
