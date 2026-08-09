import tanstackRouter from '@tanstack/router-plugin/vite';
import reactSWC from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import * as path from 'node:path';


// https://vite.dev/config/
export default defineConfig({
    server: {
        cors: {
            origin: true,
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        },
    },
    plugins: [
        tanstackRouter({
            target: 'react',
            autoCodeSplitting: true,
            routesDirectory: './src/app/routes',
            generatedRouteTree: './src/generated/routes/routeTree.gen.ts',
            quoteStyle: 'single',
        }),
        reactSWC(),
        svgr(),
    ],
    css: {
        modules: {
            localsConvention: 'dashes',
        },
    },
    resolve: {
        alias: {
            '@/app': path.resolve(import.meta.dirname, './src/app'),
            '@/pages': path.resolve(import.meta.dirname, './src/pages'),
            '@/widgets': path.resolve(import.meta.dirname, './src/widgets'),
            '@/features': path.resolve(import.meta.dirname, './src/features'),
            '@/entities': path.resolve(import.meta.dirname, './src/entities'),
            '@/shared': path.resolve(import.meta.dirname, './src/shared'),
            '@/generated': path.resolve(import.meta.dirname, './src/generated'),
        },
    },
});
