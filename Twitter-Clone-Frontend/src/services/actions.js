export const followUser = async (target, mode) => {
    try {
        const res = await fetch(`http://localhost:3000/users/${target}/${mode}/`, {
            method: 'POST',
            credentials: 'include',
        });

        const data = await res.json();

        if (!data.ok) {
            console.error(data.error);
            return data.error;
        }
        return data.message;
    } catch (err) {
        return err;
    }
};





export const loadProfile = async (username) => {
    try {
        const res = await fetch(`http://localhost:3000/profile/${username}`);
        const data = await res.json();

        if (data.error) {
            console.error(data.error);
            return data.error;
        }

        return { user: data.user, tweets: data.tweetsByUser }
    } catch (err) {
        return err
    }
};
