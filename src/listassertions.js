var chai = require('chai')
var assert = chai.assert
var x = Object.getOwnPropertyNames(assert).filter(function (p) {
    return typeof assert[p] === 'function';
  })
  console.log(JSON.stringify(x))
