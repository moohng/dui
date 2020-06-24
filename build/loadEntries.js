const path = require('path')
const fs = require('fs')


module.exports = function () {
  const entryPath = path.resolve('src/components')
  const entries = fs.readdirSync(entryPath)

  const results = [
    { name: 'lazyload', input: path.join('../', 'src/tools/lazyload.js') },
    { name: 'pulldown', input: path.join('../', 'src/tools/pulldown.js') },
    { name: 'pullup', input: path.join('../', 'src/tools/pullup.js') },
  ]
  for (const dir of entries) {
    const filePath = path.join(entryPath, dir)
    const stats = fs.statSync(filePath)

    // console.log('file path', filePath)

    // 是目录
    if (stats.isDirectory()) {
      results.push({
        name: dir,
        input: path.join(filePath, 'index.js'),
        // style: path.join(filePath, `${dir}.scss`),
      })
      continue
    }
  }

  return results
}
