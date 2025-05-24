import { createTweet, addComment, getTimeAgo } from '../services/tweet';

// For tests for addComment, ensure __BASE_URL__ is defined globally:
global.__BASE_URL__ = "http://localhost:3000";

describe('createTweet', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns message when the tweet is created successfully', async () => {
    const successMessage = 'Tweet created successfully';
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ message: successMessage }),
    });

    const params = { content: 'Hello world' };
    const response = await createTweet(params);
    
    expect(response).toEqual({ message: successMessage });
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/tweet', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
  });

  it('returns an error if the HTTP response is not ok', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 400,
    });

    const response = await createTweet({ content: 'Hello world' });
    expect(response).toEqual({ error: 'HTTP 400' });
  });

  it('returns an error if the returned JSON has an error field', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ error: 'Some error occurred' }),
    });

    const response = await createTweet({ content: 'Hello world' });
    expect(response).toEqual({ error: 'Some error occurred' });
  });

  it('handles fetch exceptions and returns an error', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'));

    const response = await createTweet({ content: 'Hello world' });
    expect(response).toEqual({ error: 'Network error' });
  });
});

describe('addComment', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns message when the comment is added successfully', async () => {
    const successMessage = 'Comment added successfully';
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ message: successMessage }),
    });

    const params = { tweetId: 1, content: 'Nice tweet' };
    const response = await addComment(params);

    expect(response).toEqual({ message: successMessage });
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/comment', {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
  });

  it('returns an error if the HTTP response is not ok', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 500,
    });

    const params = { tweetId: 1, content: 'Nice tweet' };
    const response = await addComment(params);
    expect(response).toEqual({ error: 'HTTP 500' });
  });

  it('returns an error if the returned JSON contains an error field', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ error: 'Invalid comment' }),
    });

    const params = { tweetId: 1, content: 'Nice tweet' };
    const response = await addComment(params);
    expect(response).toEqual({ error: 'Invalid comment' });
  });

  it('handles fetch exceptions and returns an error', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'));

    const params = { tweetId: 1, content: 'Nice tweet' };
    const response = await addComment(params);
    expect(response).toEqual({ error: 'Network error' });
  });
});

describe('getTimeAgo', () => {
  it('returns seconds ago when the time difference is less than 60 seconds', () => {
    const now = new Date();
    const thirtySecondsAgo = new Date(now.getTime() - 30000).toISOString(); // 30 seconds ago
    expect(getTimeAgo(thirtySecondsAgo)).toMatch(/sec ago/);
  });

  it('returns minutes ago when the time difference is less than 3600 seconds', () => {
    const now = new Date();
    const twoMinutesAgo = new Date(now.getTime() - 2 * 60000).toISOString(); // 2 minutes ago
    expect(getTimeAgo(twoMinutesAgo)).toMatch(/min ago/);
  });

  it('returns hours ago when the time difference is less than 86400 seconds', () => {
    const now = new Date();
    const threeHoursAgo = new Date(now.getTime() - 3 * 3600000).toISOString(); // 3 hours ago
    expect(getTimeAgo(threeHoursAgo)).toMatch(/hours ago/);
  });

  it('returns days ago when the time difference is less than 2592000 seconds', () => {
    const now = new Date();
    const fiveDaysAgo = new Date(now.getTime() - 5 * 86400000).toISOString(); // 5 days ago
    expect(getTimeAgo(fiveDaysAgo)).toMatch(/days ago/);
  });

  it('returns months ago when the time difference is less than 31536000 seconds', () => {
    const now = new Date();
    // Approximately 2 months ago (assuming 30 days per month)
    const twoMonthsAgo = new Date(now.getTime() - 2 * 30 * 86400000).toISOString();
    expect(getTimeAgo(twoMonthsAgo)).toMatch(/months ago/);
  });

  it('returns years ago when the time difference is more than 31536000 seconds', () => {
    const now = new Date();
    // Approximately 3 years ago
    const threeYearsAgo = new Date(now.getTime() - 3 * 31536000000).toISOString();
    expect(getTimeAgo(threeYearsAgo)).toMatch(/years ago/);
  });
});
