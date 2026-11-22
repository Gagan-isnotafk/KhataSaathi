import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import { createApiApp } from './server/app.ts';
import { openDatabase } from './server/db/database.ts';
import { seedDatabaseIfEmpty } from './server/db/seed.ts';

async function startServer() {
  const db = openDatabase();
  seedDatabaseIfEmpty(db);

  const app = createApiApp({ db });
  const isProduction = process.env.NODE_ENV === 'production';
  const port = Number(process.env.PORT || 3000);

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    if (fs.existsSync(distDir)) {
      app.use(express.static(distDir));
      app.get('/{*path}', (_req, res) => {
        res.sendFile(path.join(distDir, 'index.html'));
      });
    }
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`KhataSaathi server listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start KhataSaathi server:', err);
  process.exit(1);
});
