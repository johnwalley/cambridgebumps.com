/// <reference types="astro/client" />

// Injected by `astro.config.mjs` (see the `vite.define` block there) from the
// `.env.<site>` file or the deployment environment.
interface ImportMetaEnv {
  readonly PUBLIC_TITLE: string;
  readonly PUBLIC_BASE_URL: string;
  readonly PUBLIC_GOOGLE_ANALYTICS_TAG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
