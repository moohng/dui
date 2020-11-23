import path from 'path'
import fs from 'fs'


export default () => {
  const entryPath = path.resolve('src/components')
  const entries = fs.readdirSync(entryPath)

  const results = [
    { name: 'pulldown', input: path.resolve('src/tools/pulldown.js') },
    { name: 'pullup', input: path.resolve('src/tools/pullup.js') },
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
