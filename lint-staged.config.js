module.exports = {
  '*.md': filenames => {
    const list = filenames.map(filename => `'markdown-toc -i ${filename}`)
    list.push('git add')
    return list
  },
  '*.js': ['standard --fix', 'git add'],
  '*.{yml,yaml}': ['yaml-validator']
}