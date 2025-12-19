const API_URL = process.env.WORDPRESS_GRAPHQL_ENDPOINT || 'https://dev-grove-games.pantheonsite.io/graphql';
const REST_URL = process.env.WORDPRESS_REST_API_URL || 'https://dev-grove-games.pantheonsite.io/wp-json/grove-api/v1';

export async function fetchGraphQL(query: string, variables = {}, revalidate = 60, silent = false) {
  const headers = { 'Content-Type': 'application/json' };

  // Cache busting for Pantheon/Varnish
  // If we demand fresh data (revalidate=0), add a timestamp to the URL to bypass edge caches
  const cacheBuster = revalidate === 0 ? `?t=${Date.now()}` : '';

  const res = await fetch(API_URL + cacheBuster, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    next: { revalidate },
  });

  const json = await res.json();

  if (json.errors) {
    if (!silent) {
      console.error(json.errors);
    }
    throw new Error('Failed to fetch API');
  }

  return json.data;
}

export interface Game {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  gameUrl: string;
  thumbnailUrl: string;
  totalPlays: number;
  gameWidth: number;
  gameHeight: number;
  content: string; // HTML content from WordPress
}

const GAME_FIELDS_FRAGMENT = `
  fragment GameFields on Game {
  id
  databaseId
  title
  slug
  gameUrl
  thumbnailUrl
  totalPlays
  gameWidth
  gameHeight
  content
}
`;

export async function getGames(limit = 100): Promise<Game[]> {
  const query = `
    ${GAME_FIELDS_FRAGMENT}
    query GetGames($first: Int) {
  games(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...GameFields
      }
    }
  }
}
`;

  try {
    const data = await fetchGraphQL(query, { first: limit });
    return data?.games?.edges?.map((edge: any) => edge.node) || [];
  } catch (e) {
    console.error("Failed to fetch games", e);
    return [];
  }
}

export async function getPopularGames(limit = 5): Promise<Game[]> {
  const queryPopular = `
    ${GAME_FIELDS_FRAGMENT}
    query GetPopularGames($first: Int) {
  games(first: $first, where: { orderby: { field: TOTAL_PLAYS, order: DESC } }) {
        edges {
          node {
            ...GameFields
      }
    }
  }
}
`;

  try {
    // Try to fetch with TOTAL_PLAYS, but silence errors if it fails (plugin likely missing)
    const data = await fetchGraphQL(queryPopular, { first: limit }, 60, true);
    return data?.games?.edges?.map((edge: any) => edge.node) || [];
  } catch (e) {
    console.warn("Primary 'Popular' query failed (likely missing PHP plugin). Falling back to 'Date' sorting.");

    // Fallback: Fetch by Date, THEN sort by Total Plays in memory
    // This ensures we still show "Popular" games even if backend sorting fails
    const queryFallback = `
        ${GAME_FIELDS_FRAGMENT}
        query GetPopularGamesFallback {
          games(first: 60, where: { orderby: { field: DATE, order: DESC } }) {
            edges {
              node {
                ...GameFields
              }
            }
          }
        }
    `;
    try {
      const data = await fetchGraphQL(queryFallback, {});
      const games = data?.games?.edges?.map((edge: any) => edge.node) || [];

      // Client-side sort by totalPlays
      games.sort((a: Game, b: Game) => (b.totalPlays || 0) - (a.totalPlays || 0));

      return games.slice(0, limit);
    } catch (e2) {
      console.error("Fallback query failed too.", e2);
      return [];
    }
  }
}

export async function getGameBySlug(slug: string): Promise<Game | null> {
  const query = `
    ${GAME_FIELDS_FRAGMENT}
    query GetGameBySlug($id: ID!) {
  game(id: $id, idType: SLUG) {
        ...GameFields
  }
}
`;

  try {
    // Revalidate 0 to ensure fresh play counts
    const data = await fetchGraphQL(query, { id: slug }, 0);
    return data?.game || null;
  } catch (e) {
    console.error("Failed to fetch game by slug", e);
    return null;
  }
}

export async function incrementPlayCount(databaseId: number): Promise<void> {
  try {
    // Direct Client-to-WP Call (Static Export Compatible)
    // Note: This requires the WordPress server to allow CORS from the Netlify domain or *
    fetch(`${REST_URL}/play/${databaseId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store'
    }).catch(e => console.error("Increment play count fetch error", e));
  } catch (e) {
    console.error("Failed to increment play count", e);
  }
}

