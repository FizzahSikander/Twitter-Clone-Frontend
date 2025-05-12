export const registerUser = async (params) => {
    try {
        const response = await fetch(`http://localhost:3000/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(params),
        });
        const data = await response.json();
        console.log(data)
        if (data.error) {
            console.error("Error registering user:", data.error)
            return { error: data.error };
        }
        return { message: data.message };

    } catch (err) {
        return err
    }
}

export const loginUser = async (params) => {
    try {
        const response = await fetch(`http://localhost:3000/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(params),
        });

        const data = await response.json();
        console.log(data)
        if (data.error) {
            console.error("Error registering user:", data.error)
            return { error: data.error };
        }
        return { message: data.message };

    } catch (err) {
        return err
    }
}



export const postTweet = async (tweet) => {
    try {
        const response = await fetch(`http://localhost:3000/tweet`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(tweet),
        });

        const data = await response.json();
        console.log(data)
        if (data.error) {
            console.error("Error Posting tweet:", data.error)
            return { error: data.error };
        }
        return { message: data.message };

    } catch (err) {
        return err
    }
}