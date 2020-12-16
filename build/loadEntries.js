const path = require('path')
const fs = require('fs')


module.exports = function () {
  const entryPath = path.resolve('src/components')
  const entries = fs.readdirSync(entryPath)

  const results = [
    { name: 'pulldown', input: path.resolve('src/tools/pulldown.ts') },
    { name: 'pullup', input: path.resolve('src/tools/pullup.ts') },
  ]
  for (const dir of entries) {
    const filePath = path.join(entryPath, dir)
    const stats = fs.statSync(filePath)

    // 是目录
    if (stats.isDirectory() && dir !== 'style') {
      let input
      try {
        input = path.join(filePath, 'index.ts')
        fs.statSync(input)
      } catch {
        input = path.join(filePath, 'index.tsx')
      }
      results.push({
        name: dir,
        input: input,
      })
      continue
    }
  }

  return results
}
