import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Inspect from 'vite-plugin-inspect'


import {ElementPlusResolver, TDesignResolver,} from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
let pathSrc = path.resolve(__dirname, "./src");
export default defineConfig({
    base: './',
    resolve: {
        alias: {
            // 添加 @
            "@": pathSrc,
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    plugins: [
        vue(),
        AutoImport({
            // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
            imports: ['vue'],

            resolvers: [
                TDesignResolver({
                    library: 'vue-next'
                }),
                // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
                ElementPlusResolver(),
                IconsResolver({
                    prefix: 'icon',
                    // suffix:'icon'
                }),
            ],
            dts: path.resolve(pathSrc, 'auto-imports.d.ts'),

        }),
        Components({
            dirs: ['src/components'],
            resolvers: [
                TDesignResolver({
                    library: 'vue-next'
                }),
                // 自动导入 Element Plus 组件
                ElementPlusResolver(),
                // 自动注册图标组件
                IconsResolver({
                    enabledCollections: ['ep'],
                }),
            ],
            dts: path.resolve(pathSrc, 'components.d.ts'),
        }),
        Icons({
            autoInstall: true,
        }),
        Inspect(),
    ],
    /*    build: {
            polyfillModulePreload: true, // 是否自动注入 module preload 的 polyfill
            outDir: 'dist', // 指定输出路径
            assetsDir: 'assets', // 指定生成静态文件目录
            assetsInlineLimit: '4096', // 小于此阈值的导入或引用资源将内联为 base64 编码
            cssCodeSplit: true, // 启用 CSS 代码拆分
            sourcemap: false, // 构建后是否生成 source map 文件
            manifest: false, // 当设置为 true，构建后将会生成 manifest.json 文件
            ssrManifest: false, // 构建不生成 SSR 的 manifest 文件
            write: true, // 启用将构建后的文件写入磁盘
            emptyOutDir: true, // 构建时清空该目录
            brotliSize: true, // 启用 brotli 压缩大小报告
            chunkSizeWarningLimit: 500, // chunk 大小警告的限制
        },*/
})
