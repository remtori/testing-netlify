const fs = require('fs-extra');
const fetch = require('node-fetch');
const cache = require('./netlify-cache');

(async function() {
	try
	{
		await cache.preBuild();

		await fs.ensureDir('./build');
		const files = await fs.readdir('./build');
		console.log(`Remtori: Found ${files.length} files in build directory`);

		const remoteData = await fetch(
			`https://firestore.googleapis.com/v1/projects/remtori/databases/(default)/documents/blogs`
		).then(r => r.text());

		await fs.writeFile(
			`./build/index-${files.length}.html`,
			`
				<div>This is the ${files.length}-th generated file</div>
				<script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js"></script>
				<pre><code class="prettyprint">${remoteData}</code></pre>
			`,
		);

		await cache.postBuild();
	}
	catch (e)
	{
		console.log(e);
	}
})();
