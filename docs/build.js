console.log("Building docs...");

const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');

const path = './docs/api.md';

jsdoc2md.render({
    files: './src/index.js'
}).then(data => {
    fs.writeFileSync(path, data);
    console.log(`Successfully saved docs to ${path}`);
});
