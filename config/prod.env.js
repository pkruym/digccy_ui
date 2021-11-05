// 测试服
const base = require('./base.env')
var obj = {}

// obj = merge(base, {
//     NODE_ENV: '"production"',
//     VERSION_NAME: '"测试版"',
// })


// // 正式服
// obj = merge(base, {
//     NODE_ENV: '"production"',
//     VERSION_NAME: '"正式版"',
//     WsUri: '"ws://applicate.wintonefutures.com:8502/ws"',
//     HttpUri: '"http://applicate.wintonefutures.com"'
// })
base.NODE_ENV = '"production"'
module.exports = base;
