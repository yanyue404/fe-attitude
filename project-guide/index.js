const path = require('path')
const fs = require('fs')
const { spawnSync } = require('child_process')
const _ = require('lodash')
const PackageJSON = require('../../../package.json')

// 运行命令
const execute = function(command, args = [], options = {}) {
  console.log(`EXEC ${command} ${args.join(' ')}`)
  spawnSync(command, args, {
    stdio: 'inherit',
    encoding: 'utf-8',
    ...options
  })
}

// execute(process.platform === 'win32' ? 'npm.cmd' : 'npm', [
//   'install',
//   'shelljs',
//   '--dev'
// ])

// 这个端口可以传参
const PackageJSONResult = _.merge(PackageJSON, {
  config: {
    commitizen: {
      path: 'node_modules/cz-customizable'
    }
  },
  scripts: {
    prepare: 'husky install',
    lint: 'eslint --ext .vue pages/ --ext .vue components/prd --ext .js store/',
    prettier: 'prettier pages/** store/* components/prd/*  --write',
    'lint:fix': 'npm run lint -- --fix'
  },
  'lint-staged': {
    'pages/*.vue': ['eslint --fix', 'prettier --write', 'git add'],
    'store/*.js': ['eslint --fix', 'prettier --write', 'git add']
  }
})
fs.writeFile(
  'package.json',
  JSON.stringify(PackageJSONResult, null, 2),
  'utf-8',
  () => {}
)
