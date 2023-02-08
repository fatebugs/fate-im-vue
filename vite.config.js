import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver,ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
    // 添加 @
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    plugins: [
        vue(),
        AutoImport({
            resolvers: [
                TDesignResolver({
                    library: 'vue-next'
                }),
                ElementPlusResolver(),
            ],
        }),
        Components({
            resolvers: [
                TDesignResolver({
                    library: 'vue-next'
                }),
                ElementPlusResolver(),
            ],
        }),
    ],
})
