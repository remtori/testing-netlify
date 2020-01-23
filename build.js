const fs = require('fs-extra');
const cache = require('./netlify-cache');

(async function() {

	await cache.preBuild();

	await fs.ensureDir('./build');
	const files = await fs.readdir('./build');
	console.log(`Remtori: Found ${files.length} files in build directory`);

	await fs.writeFile(
		`./build/index-${files.length}.html`,
		`<div>This is the ${files.length}-th generated file</div>`,
	);

	await cache.postBuild();

})();
