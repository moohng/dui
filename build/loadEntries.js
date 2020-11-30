const path = require('path')
const fs = require('fs')


module.exports = function () {
  const entryPath = path.resolve('src/components')
  const entries = fs.readdirSync(entryPath)

  const results = [
    { name: 'pulldown', input: path.resolve('src/tools/pulldown.js') },
    { name: 'pullup', input: path.resolve('src/tools/pullup.js') },
  ]
  for (const dir of entries) {
    const filePath = path.join(entryPath, dir)
    const stats = fs.statSync(filePath)

    // 是目录
    if (stats.isDirectory() && dir !== 'style') {
      results.push({
        name: dir,
        input: path.join(filePath, 'index.js'),
      })
      continue
    }
  }

  return results
}
