const API_URL = process.env.WORDPRESS_GRAPHQL_ENDPOINT || 'https://dev-grove-games.pantheonsite.io/graphql';
const REST_URL = process.env.WORDPRESS_REST_API_URL || 'https://dev-grove-games.pantheonsite.io/wp-json/grove-api/v1';

export async function fetchGraphQL(query: string, variables = {}, revalidate = 60, silent = false) {
  const headers = { 'Content-Type': 'application/json' };

  // Cache busting via query param if revalidate is 0
  const cacheBuster = revalidate === 0 ? `?t=${Date.now()}` : '';

  const res = await fetch(API_URL + cacheBuster, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    // Removed 'next: { revalidate }' to avoid client-side issues with unknown props
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
  databaseId: number;
  title: string;
  slug: string;
  gameUrl: string;
  thumbnailUrl: string;
  totalPlays: number;
  gameWidth?: number;
  gameHeight?: number;
  commentStatus?: string;
  comments?: {
    nodes: Array<{
      databaseId: number;
      date: string;
      content: string;
      author: {
        node: {
          name: string;
          avatar: {
            url: string;
          }
        }
      }
    }>
  };
  content: string; // HTML content from WordPress
}

const GAME_FIELDS_FRAGMENT = `
  fragment GameFields on Game {
  databaseId
  title
  slug
  gameUrl
  thumbnailUrl
  totalPlays
  gameWidth
  gameHeight
  content(format: RENDERED)
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
  // Backend does not support sorting by TOTAL_PLAYS in GraphQL schema yet.
  // We fetch a larger batch of recent games and sort them by totalPlays in memory.
  const query = `
    ${GAME_FIELDS_FRAGMENT}
    query GetPopularGamesFallback($first: Int) {
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
    // Fetch 60 games to have enough pool for sorting
    const data = await fetchGraphQL(query, { first: 60 });
    const games = data?.games?.edges?.map((edge: any) => edge.node) || [];

    // Client-side sort by totalPlays
    games.sort((a: Game, b: Game) => (b.totalPlays || 0) - (a.totalPlays || 0));

    return games.slice(0, limit);
  } catch (e) {
    console.error("Failed to fetch popular games", e);
    return [];
  }
}

export async function getGameBySlug(slug: string): Promise<Game | null> {
  const query = `
    query GetGameDetails($slug: String!) {
      game: gameBy(slug: $slug) {
        databaseId
        title
        slug
        content(format: RENDERED)
        
        # --- Custom Fields (Legacy CamelCase) ---
        gameUrl
        thumbnailUrl
        totalPlays
        gameWidth
        gameHeight
        
        # --- Yorumlar Sistemi ---
        commentStatus
        comments(first: 50) {
          nodes {
            databaseId
            date
            content(format: RENDERED)
            author {
              node {
                name
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
`;

  try {
    // Revalidate 0 to ensure fresh play counts
    const data = await fetchGraphQL(query, { slug }, 0);
    return data?.game || null;
  } catch (e) {
    console.error("Failed to fetch game by slug", e);
    return null;
  }
}

export async function incrementPlayCount(databaseId: number): Promise<void> {
  try {
    // New endpoint provided by user
    // e.g. https://dev-grove-games.pantheonsite.io/wp-json/grove/v1/play
    const endpoint = `${REST_URL.replace('/grove-api/v1', '/grove/v1')}/play`;

    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: databaseId.toString() }), // Backend expects 'id'
      cache: 'no-store'
    });
  } catch (e) {
    console.error("Failed to increment play count", e);
  }
}

