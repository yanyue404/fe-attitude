const { spawnSync } = require('child_process')

// 运行命令
const execute = function(command, args = [], options = {}) {
  console.log(`EXEC ${command} ${args.join(' ')}`)
  spawnSync(command, args, {
    stdio: 'inherit',
    encoding: 'utf-8',
    ...options
  })
}

// git
execute('git pull', [], { shell: true })

// npm scripts
execute(
  process.platform === 'win32' ? 'npm.cmd' : 'npm',
  ['run', 'test:rollup'],
  {
    env: {
      ...process.env,
      PATH_TYPE: 'trial'
    }
  }
)
