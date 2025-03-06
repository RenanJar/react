const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8081',
  cookieDomain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || 'localhost',
};

export default config;
