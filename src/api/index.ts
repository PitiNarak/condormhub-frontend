import createClient, { Middleware } from 'openapi-fetch';
import type { paths } from '../types/api';
import { auth } from '@/lib/auth';

const client = createClient<paths>({
  baseUrl: process.env.BACKEND_URL,
});

const middleware: Middleware = {
  onRequest: async ({ request }) => {
    const session = await auth();
    if (session) {
      request.headers.set('Authorization', `Bearer ${session.access_token}`);
    }
    return request;
  },
};

client.use(middleware);

export default client;
