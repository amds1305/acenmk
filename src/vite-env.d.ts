
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MYSQL_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
