declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BACKEND_URL: string;
      NEXTAUTH_SECRET: string;
      NEXTAUTH_URL: string;
      NEXT_PUBLIC_BACKEND_URL: string;
    }
  }
}

export {};
