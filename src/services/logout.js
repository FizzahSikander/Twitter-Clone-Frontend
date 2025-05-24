export const logoutUser = async (params) => {
    try {
        const response = await fetch(`http://localhost:3000/logout`, {
            method: "GET",
            credentials: "include",
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
