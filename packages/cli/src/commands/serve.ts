import path from 'path';
import { Command } from 'commander';
import { serve } from '@dani-rcp/rcp-api';

interface Options {
	port: string;
	filename: string;
	dir: string;
}
const isProd = process.env.NODE_ENV !== 'production';

export const serveCommand = new Command()
	.command('serve [filename]')
	.description('Open a file for editing')
	.option('-p, --port <number>', 'port to run the server on', '4005')
	.action(async (filename = 'notebook.json', options: Options) => {
		try {
			const dir = path.join(process.cwd(), path.dirname(filename));
			await serve(parseInt(options.port), path.basename(filename), dir, useProxy);
			console.log(`Opened ${filename}. Navigate to http://localhost:${options.port}`);
		} catch (err: any) {
			if (err.code === 'EADDRINUSE')
				console.error(
					`Port ${options.port} is in use. Try running on a different port.`
				);
			else console.error('An error has occoured', err.message);

			process.exit(1);
		}
	});
