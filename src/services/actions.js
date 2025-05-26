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

        return { user: data.user, tweets: data.tweetsByUser };
    } catch (err) {
        return err;
    }
};

export const getTags = async () => {
    try {
        const res = await fetch('http://localhost:3000/tags');
        const data = await res.json();
        return data?.trending;
    } catch (err) {
        return err;
    }
};


export const editProfile = async ({ banner, image }) => {

    const formData = new FormData();
    if (banner) formData.append('banner', banner);
    if (image) formData.append('image', image);



    try {
        const res = await fetch(`http://localhost:3000/edit-profile`, {
            method: 'PATCH',
            credentials: 'include',
            body: formData
        });

        const data = await res.json();
        console.log(data)
        if (data.error) {
            console.error(data.error);
            return data.error;
        }
        return data.message;
    } catch (err) {
        return err;
    }
};
