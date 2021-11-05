'use strict'
// const merge = require('webpack-merge')
const base = require('./base.env')

// let obj = {}
// obj = merge(base, {
//     NODE_ENV: '"development"',
//     VERSION_NAME: '"开发版"',
//     // WsUri: '"ws://wintonefutures.com:9095/websocket"', // 这个是测试服的
//     // HttpUri: '"http://wintonefutures.com"'
// })

base.NODE_ENV = '"development"'
module.exports = base;
