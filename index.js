var os = require('os')
var path = require('path')
const features = require('cpu-features')();

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
  (features.flags.sse4_1 === true ? `${arch}_sse` : arch),
  platform === 'win' ? 'basisu.exe' : 'basisu'
)

exports.path = basisuPath;