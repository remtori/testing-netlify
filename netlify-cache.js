const fs = require('fs-extra');
const path = require('path');

module.exports.preBuild = async function()
{
	if (!process.env.NETLIFY_BUILD_BASE) return;

	const cacheDir = path.resolve(
    	process.env.NETLIFY_BUILD_BASE,
		`cache`,
		`remtori`
	);

	await fs.ensureDir(cacheDir);
	const buildDir = path.resolve(__dirname, './build');

	await fs.copy(cacheDir, buildDir);

	console.log(`Remtori: Cached build restored before build`);
}

module.exports.postBuild = async function()
{
	if (!process.env.NETLIFY_BUILD_BASE) return;

	const cacheDir = path.resolve(
    	process.env.NETLIFY_BUILD_BASE,
		`cache`,
		`remtori`
	);

	await fs.ensureDir(cacheDir);
	const buildDir = path.resolve(__dirname, './build');

	await fs.copy(buildDir, cacheDir);

	console.log(`Remtori: Cached build refilled after build`);
}
