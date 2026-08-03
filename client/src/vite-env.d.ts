/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
    readonly VITE_API_PROTOCOL: string;
    readonly VITE_API_HOST: string;
    readonly VITE_API_PORT: number;
    readonly VITE_API_BASE_ROUTE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
