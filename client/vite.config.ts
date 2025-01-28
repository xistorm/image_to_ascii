import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';


// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		modules: {
			localsConvention: 'camelCaseOnly',
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@pages': path.resolve('./src/pages'),
			'@features': path.resolve('./src/features'),
			'@assets': path.resolve('./src/assets'),
			'@shared': path.resolve('./src/shared'),
			'@services': path.resolve('./src/services'),
		},
	},
});
