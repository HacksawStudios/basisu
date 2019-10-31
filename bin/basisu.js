#!/usr/bin/env node
const { execFile } = require('child_process');
const args = process.argv.slice(2);

const os = require('os')
const path = require('path')

let platform = os.platform()
if(platform=='win32') {
  platform = 'win';
}
if (platform !== 'linux' && platform !== 'win') {
  console.error('Unsupported platform.', platform);
  process.exit(1)
}

const arch = os.arch()

const basisuPath = path.join(
  __dirname,
  platform,
  arch,
  platform === 'win' ? 'basisu.exe' : 'basisu'
  )
  
execFile(basisuPath, args, (err, stdout, stderr) => {
    if (err) {
      console.log(`err: ${err}`);
      // node couldn't execute the command
      return;
    }
  
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });