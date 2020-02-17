'use strict'

const { Transform } = require('stream')
const kSize = Symbol('Max size')
const kBufferLength = Symbol('Buffer size reached so far')

class Cut extends Transform {
  constructor ({ size = 1024 * 1024 * 1, ...opts }) {
    if (typeof size !== 'number' || size <= 0) {
      throw new Error('Cut size parameter must be a number grater than zero.')
    }
    super(opts)
    this[kSize] = Math.round(size)
    this[kBufferLength] = 0
  }

  _transform (chunk, encoding, cb) {
    this[kBufferLength] += chunk.length
    if (this[kBufferLength] > this[kSize]) {
      const error = new Error('Maximum size reached')
      return cb(error)
    }
    this.push(chunk)
    cb()
  }

  _flush (done) {
    done()
  }
};

module.exports = (opts = {}) => new Cut(opts)
