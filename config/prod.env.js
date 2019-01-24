'use strict'
let customEnv
switch (process.argv[2]) {
  case 'test':
    customEnv = '"test"'
    break
  default:
    customEnv = '"production"'
    break
}
module.exports = {
  NODE_ENV: customEnv
}
