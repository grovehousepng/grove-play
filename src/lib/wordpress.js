const API_URL = process.env.WORDPRESS_GRAPHQL_ENDPOINT || 'https://dev-grove-baazar.pantheonsite.io/graphql';

async function fetchGraphQL(query, variables = {}) {
  const headers = { 'Content-Type': 'application/json' };

  if (!API_URL) {
    throw new Error('WORDPRESS_GRAPHQL_ENDPOINT is not defined');
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}

export async function getGeneralSettings() {
  const query = `
    query GeneralSettings {
      generalSettings {
        title
        description
      }
    }
  `;

  const data = await fetchGraphQL(query);
  return data?.generalSettings;
}

export async function getProducts() {
  const query = `
    query GetProducts {
      products(first: 3) {
        nodes {
          id
          slug
          name
          shortDescription
          image {
            sourceUrl
          }
          ... on SimpleProduct {
            price(format: FORMATTED)
            regularPrice(format: FORMATTED)
          }
          ... on VariableProduct {
            price(format: FORMATTED)
            regularPrice(format: FORMATTED)
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL(query);
  return data?.products?.nodes || [];
}

export async function getProductBySlug(slug) {
  const query = `
    query GetProductBySlug($slug: ID!) {
      product(id: $slug, idType: SLUG) {
        id
        name
        slug
        shortDescription
        description
        image {
          sourceUrl
        }
        ... on SimpleProduct {
          price(format: FORMATTED)
          regularPrice(format: FORMATTED)
        }
        ... on VariableProduct {
          price(format: FORMATTED)
          regularPrice(format: FORMATTED)
        }
      }
    }
  `;

  const data = await fetchGraphQL(query, { slug });
  return data?.product;
}

export async function getPageByUri(uri) {
  const query = `
    query GetPageByUri($uri: ID!) {
      page(id: $uri, idType: URI) {
        title
        content
      }
    }
  `;

  const data = await fetchGraphQL(query, { uri });
  return data?.page;
}
