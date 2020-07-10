const path = require('path')
const fs = require('fs')
const glob = require('glob')
const pkg = require('./package.json')

const prefix = path.join(pkg.name, 'dist')

const files = glob.sync('**/*.js', { cwd: path.join(__dirname, 'dist') })

console.log(files)

module.exports = function customName(name) {
    return `antd/lib/${name}`
}
