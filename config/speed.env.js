'use strict'
// const merge = require('webpack-merge')
const base = require('./base.env')
base.NODE_ENV = '"speed"' //极速版
module.exports = base;
