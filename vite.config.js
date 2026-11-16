import { normalizePath } from 'vite'

export default {
    root: 'src/',
    base: './',
    publicDir: '../public/',
    server: {
        open: true,
        host: true
    },
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true
    },
    plugins: [
        {
            name: 'reload-on-static-change',
            configureServer(server) {
                server.watcher.on('all', (event, file) => {
                    if (normalizePath(file).startsWith(server.config.publicDir))
                        server.ws.send({ type: 'full-reload' })
                })
            }
        }
    ]
}