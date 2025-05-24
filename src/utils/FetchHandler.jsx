export const getFetchHandler = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json", ...options.headers },
      ...options,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error(`Fetch error at ${url}:`, error.message);
    return null;
  }
};
