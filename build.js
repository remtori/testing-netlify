const fs = require('fs');

let files = [];

try
{
	files = fs.readdirSync('./build')
}
catch(e) {
	fs.mkdirSync('./build');
}

fs.writeFileSync(`./build/index-${files.length}.html`, `<div>This is the ${files.length}-th generated file</div>`);
