# cut

![Tests](https://github.com/dnlup/cut/workflows/Tests/badge.svg)

> A stream size validator

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  * [cut([options])](#cutoptions)

<!-- tocstop -->

## Installation

```bash
$ npm i @dnlup/cut
```

## Usage
```js
const cut = require('@dnlup/cut')
const { pipeline } = require('stream')

const readable = getReadableSomeHow()

pipeline([
  readable,
  cut() // Default max size is 1024 * 1024 bytes
  // ...Other streams in the pipeline here
], error => {
  if (error) {
    if (error.message === 'Maximum size reached') {
      console.error('File exceeded size limit')
    }
  }
})
```

## API

### cut([options])

> create a new validator

* **options:** `Object`. Configuration options.
   * **options.size:** `Number`. The maximum number of bytes that are allowed to flow in the stream.
   * **options.*:** See [stream.Transform options](https://nodejs.org/dist/latest-v12.x/docs/api/stream.html#stream_new_stream_transform_options).
