import express from 'express';
import path from 'path';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createCellsRouter } from './routes/cells';

export const serve = (port: number, filename: string, dir: string) => {
	const app = express();

	app.use(createCellsRouter(filename, dir));

	const packagePath = require.resolve('@dani-rcp/rcp-client/build/index.html');
	app.use(express.static(path.dirname(packagePath)));

	return new Promise<void>((resolve, reject) => {
		app.listen(port, resolve).on('error', reject);
	});
};
