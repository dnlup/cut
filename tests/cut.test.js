const test = require('ava')
const { pipeline, Readable } = require('stream')
const { promisify } = require('util')
const cut = require('../')

const pipe = promisify(pipeline)

test('invalid configuration', t => {
  const list = [
    {
      options: {
        size: -1
      },
      message: 'Cut size parameter must be a number grater than zero.'
    },
    {
      options: {
        size: 0
      },
      message: 'Cut size parameter must be a number grater than zero.'
    },
    {
      options: {
        size: '0'
      },
      message: 'Cut size parameter must be a number grater than zero.'
    }
  ]
  for (const item of list) {
    const error = t.throws(() => cut(item.options), { instanceOf: Error })
    t.is(item.message, error.message)
  }
})

test('cut stream if size is reached', async t => {
  const readable = new Readable()
  readable.push(Buffer.alloc(1024 * 1024 * 2))
  readable.push(null)
  const error = await t.throwsAsync(pipe([
    readable,
    cut()
  ]))
  t.is('Maximum size reached', error.message)
})

test('do not cut stream if size is less then max size', async t => {
  const readable = new Readable()
  readable.push(Buffer.alloc(1024 * 1024 * 1))
  readable.push(null)
  await pipe([
    readable,
    cut()
  ])
  t.pass()
})

test('cut custom size', async t => {
  const readable = new Readable()
  readable.push(Buffer.alloc(1024 * 1024 * 2))
  readable.push(null)
  const error = await t.throwsAsync(pipe([
    readable,
    cut({ size: 1024 * 1024 * 0.7 })
  ]))
  t.is('Maximum size reached', error.message)
})
