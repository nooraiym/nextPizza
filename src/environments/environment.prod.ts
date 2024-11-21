export const environment = {
  production: true,
  apiUrl: process.env['API_URL'] || 'https://next-pizza-backend.vercel.app/api',
  tokenKey: process.env['TOKEN_KEY'] || 'authToken',
};
