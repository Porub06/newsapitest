require('dotenv').config();

describe('NewsAPI web API', () => {

  const params = new URLSearchParams({
    q: 'technology',
    pageSize: '5',
    language: 'en',
  });

  const apiFetch = (parameters, apiKey) => fetch(
    `https://newsapi.org/v2/everything?${parameters.toString()}`,
    {
      headers: {
        'X-API-KEY': apiKey,
        Accept: 'application/json',
      },
    },
  );

  test('returns live articles when a valid API key is configured', async () => {
    const apiKey = process.env.NEWS_API_KEY;

    const response = await apiFetch(params, apiKey);

    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);

    const result = await response.json();
    expect(Array.isArray(result.articles)).toBe(true);
    expect(result.articles.length).toBeGreaterThan(0);
    expect(result.articles[0]).toHaveProperty('title');
  }, 20000);

  // ervenytelen api key eset:

  test('testing invalid API key', async () => {
     
    const apiKey = "";

    const response = await apiFetch(params, apiKey);

    expect(response.ok).toBe(false);
    expect(response.status).toBe(401);

    const result = await response.json();
    expect(result.articles).toBeUndefined();

  }, 20000);


  



});
