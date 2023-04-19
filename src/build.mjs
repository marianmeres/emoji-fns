import fs from "node:fs";
import path from "node:path";
import { mkdirpSync } from "mkdirp";
import { rimrafSync } from "rimraf";
import { totalist } from "totalist/sync";
import minimist from 'minimist';
import { emojiCodeMap } from "@marianmeres/emoji-list";
import { yellow, red, cyan, gray } from "kleur/colors";

const args = minimist(process.argv.slice(2));

const COMMAND = args._[0];

// return early with help?
const isHelp = !!args.h || !!args.help || !COMMAND;
if (isHelp) {
	help();
	process.exit(0);
}

//
const isSilent = args.silent;
const log = (...args) => {
	if (isSilent) return;
	console.log.apply(null, args);
};

// run now
main().catch(onError);

//////////////////////////////////////////////////////////////////////////////////////////
async function main() {
	switch (COMMAND.toLowerCase()) {
		case 'help':
			return help();
		case 'build':
			return await build();
		default:
			throw new Error(`Command "${COMMAND}" not found`);
	}
}

//////////////////////////////////////////////////////////////////////////////////////////
async function build() {
	const DISTDIR = './dist/';
	const config = [
		{
			indir: './src/twemoji/v14.0.2/svg',
			outdir: './twemoji',
			fnPrefix: 'twemoji',
		},
		{
			indir: './src/openmoji/v14.0.0/openmoji-svg-color',
			outdir: './openmoji',
			fnPrefix: 'openmoji',
		},
	];

	rimrafSync(DISTDIR);
	mkdirpSync(DISTDIR);

	let indexdts = '';

	config.forEach(({ indir, outdir, fnPrefix }) => {
		totalist(indir, (name, abs, stats) => {
			if (/\.svg/i.test(name)) {
				mkdirpSync(path.join(DISTDIR, outdir));
				const hexId = path.basename(name, '.svg').toLowerCase();

				// probably skin tone variation or perhaps custom emoji outside of the spec?
				if (!emojiCodeMap[hexId]) {
					// log(`Skipping ${fnPrefix} ${hexId} (not found)...`);
					return;
				}

				//
				let svg = fs.readFileSync(abs, 'utf8').replace(/[\n\r]/g, ' ');

				let size = 16;
				const m = /viewBox=['"](?<viewBox>[^"']+)['"]/.exec(svg);

				if (m?.groups?.viewBox) {
					const [_1, _2, w, h] = m.groups.viewBox.split(' ');
					if (w === h) size = w;
				}

				svg = svg
					.replace(' xmlns="http://www.w3.org/2000/svg"', '')
					.replace(/ width="[^"]+"/, '')
					.replace(/ height="[^"]+"/, '')
					.replace(/ id="[^"]+"/, '')
					.replace(
						'<svg ',
						'<svg style="${style || \'\'}" class="${cls || \'\'}" width="${size || ' + size + '}" height="${size || ' + size + '}" '
					)
					.replace(/>\s+</g, '><')
					.trim();

				const outname = fnPrefix + ucfirst(emojiCodeMap[hexId]);
				let content = `export const ${outname} = (cls = null, size = null, style = null) => \`${svg}\`;\n`;
				log(gray(`    ✔ ${outname}`));
				fs.writeFileSync(path.join(DISTDIR, outdir, outname + '.js'), content);

				// types
				let dts = `export declare const ${outname}: (cls?: string, size?: number, style?: string) => string;\n`;
				fs.writeFileSync(path.join(DISTDIR, outdir, outname + '.d.ts'), dts);
				indexdts += `export { ${outname} } from '${outdir}/${outname}.js';\n`;
			}
		});

		log(gray(`\nDone -> ${path.join(DISTDIR, outdir)}\n`));
	});

	fs.writeFileSync(path.join(DISTDIR, 'index.js'), indexdts);
	fs.writeFileSync(path.join(DISTDIR, 'index.d.ts'), indexdts);

	log(gray(`Done all\n`));
}

function onError(e) {
	console.log('\n' + red(e.toString().trim()) + '\n');
	process.exit(1);
}

function help() {
	const self = path.basename(__filename);
	console.log(`
    This script will wrap emoji svgs as functions. Each fn in a separate file.

    ${yellow('Usage:')}
        node ${self} build

`);
	process.exit();
}

function ucfirst(str) {
	return `${str}`.charAt(0).toUpperCase() + `${str}`.slice(1);
}
