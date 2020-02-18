const fs = require('fs-extra');

async function build() {
	const files = await fs.readdir('./static');
	const $html = files
		.filter(f => !f.endsWith('.html'))
		.map(p => `<img src="/${p}" loading="lazy" />`)
		.join('\n');

	await fs.writeFile('./static/index.html', $html, 'utf8');
}

build().catch(console.log);
