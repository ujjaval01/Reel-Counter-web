import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

/**
 * Vite plugin that emulates Vercel Serverless Functions (/api/*) in local development.
 * Automatically executes the TypeScript handlers in Node.js and feeds them environment variables.
 */
function vercelApiDevPlugin(): Plugin {
  return {
    name: 'vercel-api-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/')) {
          return next();
        }

        try {
          const url = new URL(req.url, 'http://localhost');
          const pathname = url.pathname;

          // Parse query parameters
          const query: Record<string, string> = {};
          url.searchParams.forEach((v, k) => {
            query[k] = v;
          });
          (req as any).query = query;

          // Parse POST body if present
          if (req.method === 'POST') {
            const chunks: any[] = [];
            for await (const chunk of req) {
              chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
            }
            const rawBody = Buffer.concat(chunks).toString();
            try {
              (req as any).body = JSON.parse(rawBody);
            } catch {
              (req as any).body = rawBody;
            }
          }

          // Polyfill Vercel Response helpers
          if (!res.status) {
            (res as any).status = function (statusCode: number) {
              this.statusCode = statusCode;
              return this;
            };
          }
          if (!res.json) {
            (res as any).json = function (payload: any) {
              this.setHeader('Content-Type', 'application/json');
              this.end(JSON.stringify(payload));
              return this;
            };
          }

          // Resolve TypeScript route file
          let filePath = path.resolve(process.cwd(), `.${pathname}.ts`);
          if (pathname === '/api/admin' || pathname.startsWith('/api/admin/')) {
            const routeName = pathname.replace(/^\/api\/admin\/?/, '').split('?')[0];
            query.route = routeName || 'overview';
            filePath = path.resolve(process.cwd(), './api/admin.ts');
          }

          try {
            const mod = await server.ssrLoadModule(filePath);
            if (typeof mod.default === 'function') {
              await mod.default(req, res);
              return;
            }
          } catch (fileErr: any) {
            console.error(`[API Dev Server] Error running ${pathname}:`, fileErr);
            (res as any).status(500).json({
              success: false,
              error: `API Dev Server Error: ${fileErr.message}`,
            });
            return;
          }

          next();
        } catch (err: any) {
          console.error('[API Dev Server] Middleware exception:', err);
          next(err);
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Populate process.env for Node-based serverless handlers in dev
  Object.assign(process.env, env);

  return {
    plugins: [react(), vercelApiDevPlugin()],
    base: '/',
  };
});
