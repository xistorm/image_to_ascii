import tanstackRouter from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';


// https://vite.dev/config/
export default defineConfig({
    plugins: [
        tanstackRouter({
            target: 'react',
            autoCodeSplitting: true,
            routesDirectory: './src/app/routes',
            generatedRouteTree: './src/generated/routes/routeTree.gen.ts',
            quoteStyle: 'single',
        }),
        react(),
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
