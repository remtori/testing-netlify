const fs = require('fs-extra');
const path = require('path');
const cache = require('./netlify-cache');

(async function() {
	try
	{
		await cache.preBuild();

		await fs.ensureDir('./build');
		const files = await fs.readdir('./build');
		console.log(`Remtori: Found ${files.length} files in build directory`);

		const newFile = `index-${files.length}.html`;

		await fs.writeFile(
			`./build/${newFile}`,
			`
				<div>This is the ${files.length}-th generated file</div>
			`,
		);

		files.push(newFile);

		await fs.writeFile(
			`./build/index.html`,
			files
				.map(p => `<a href="/${p}">${p}</a>`)
				.join(`<br/>`)
		);

		await cache.postBuild();
	}
	catch (e)
	{
		console.log(e);
	}
})();
