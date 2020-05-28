var os = require('os')
var path = require('path')

var platform = os.platform()

if (platform !== 'linux' && platform !== 'win' && platform !== 'darwin') {
  console.error('Unsupported platform.', platform);
  process.exit(1)
}

var arch = os.arch()

var basisuPath = path.join(
  __dirname,
  'bin',
  platform,
  arch,
  platform === 'win' ? 'basisu.exe' : 'basisu'
)

exports.path = basisuPath;