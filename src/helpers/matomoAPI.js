const MATOMO_API_URL ="https://mil-yemen-vast-exceptions.trycloudflare.com/matomo/index.php";

const SITE_ID = 2;
const TOKEN_AUTH = '1efec1fd90a8d15c1319b99516d18228'; // Token admin

export async function fetchMatomoEvents({ period = 'day', date = 'today' } = {}) {
  const params = new URLSearchParams({
    module: 'API',
    method: 'Events.getCategory',
    idSite: SITE_ID.toString(),
    period,
    date,
    format: 'JSON',
    token_auth: TOKEN_AUTH
  });

  const url = `${MATOMO_API_URL}?${params.toString()}`;

  console.log('Fetching Matomo Events:', url);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Matomo API error: ${response.status}`);
  }

  return await response.json();
}
