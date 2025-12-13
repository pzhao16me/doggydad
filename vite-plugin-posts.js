import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Helper to copy directory recursively
function copyDirSync(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDirSync(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

export function postsManifestPlugin() {
    return {
        name: 'posts-manifest',

        configureServer(server) {
            // 开发模式：动态生成 manifest
            server.middlewares.use((req, res, next) => {
                if (req.url === '/posts-manifest.json') {
                    const manifest = generateManifest();
                    res.setHeader('Content-Type', 'application/json');
                    res.setHeader('Cache-Control', 'no-cache');
                    res.end(JSON.stringify(manifest));
                    return;
                }
                next();
            });
        },

        buildStart() {
            // 构建时生成 manifest 到 public 目录
            const manifest = generateManifest();
            const publicDir = path.resolve(__dirname, 'public');

            // 确保 public 目录存在
            if (!fs.existsSync(publicDir)) {
                fs.mkdirSync(publicDir, { recursive: true });
            }

            fs.writeFileSync(
                path.join(publicDir, 'posts-manifest.json'),
                JSON.stringify(manifest, null, 2)
            );

            console.log(`📝 Generated manifest with ${manifest.posts.length} posts`);
        },

        // Copy posts folder to dist after build
        closeBundle() {
            const postsDir = path.resolve(__dirname, 'posts');
            const distPostsDir = path.resolve(__dirname, 'dist', 'posts');

            if (fs.existsSync(postsDir)) {
                copyDirSync(postsDir, distPostsDir);
                console.log(`📁 Copied posts folder to dist`);
            }
        }
    };
}

function generateManifest() {
    const postsDir = path.resolve(__dirname, 'posts');
    const posts = [];

    try {
        const categories = fs.readdirSync(postsDir);

        for (const category of categories) {
            const categoryPath = path.join(postsDir, category);
            const stat = fs.statSync(categoryPath);

            // 跳过文件，只处理目录
            if (!stat.isDirectory()) continue;

            const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.md'));

            for (const file of files) {
                posts.push({
                    category,
                    file,
                    path: `posts/${category}/${file}`
                });
            }
        }
    } catch (err) {
        console.warn('Warning: Could not read posts directory:', err.message);
    }

    return {
        posts,
        generated: new Date().toISOString()
    };
}
