const path = require('path')
const pkg = require('./package.json')

module.exports = [
    'import',
    {
        libraryName: pkg.name,
        customName: path.resolve(__dirname, './customName.js'),
    },
]
