#!/usr/bin/env node
const { execFile } = require('child_process');
const args = process.argv.slice(2);
const features = require('cpu-features')();

const os = require('os')
const path = require('path')
const fs = require('fs-extra')

let platform = os.platform()
if (platform == 'win32') {
  platform = 'win';
}
if (platform !== 'linux' && platform !== 'win' && platform !== 'darwin') {
  console.error('Unsupported platform.', platform);
  process.exit(1)
}

const arch = os.arch()

const basisuPath = path.join(
  __dirname,
  platform,
  (features.flags.sse4_1 === true ? `${arch}_sse` : arch),
  platform === 'win' ? 'basisu.exe' : 'basisu'
)

if (platform === 'linux' || platform === 'darwin') {
  fs.chmodSync(basisuPath, 0755);
}

execFile(basisuPath, args, (err, stdout, stderr) => {
  if (err) {
    console.log(`err: ${err}`);
    // node couldn't execute the command
    return;
  }

  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});