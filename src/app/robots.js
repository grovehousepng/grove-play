export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'PerplexityBot',
          'Google-Extended',
          'CCBot',
          'Omgilibot'
        ],
        allow: '/',
      }
    ],
    sitemap: 'https://grovemediacreative.com.tr/sitemap.xml',
  };
}
