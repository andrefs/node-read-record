# read-record

Async generator functions which return records read from a stream,
string or text file using a custom record separator.

In Perl or Awk, by default, files are read line by line, because `\n`
is used as the record or input field separator. If you want to change
this (to read records separated, for example, by ';' you can chage
`$/` (in Perl) or `RS` (in Awk) to ';'.

Node.js `readline` module
[documentation](https://nodejs.org/api/readline.html#readline_rl_symbol_asynciterator)
explains how to use a `for await...of` loop to read lines from a file.
But what if it is not lines you want to read?

## Install

```shell
npm i -S read-record
```

```js
import AVLTree from 'avl-promise';
const rr = require('read-record');
```

[Try it in your browser](https://npm.runkit.com/read-record)


## API

* `rr.records(stream, recsep)`
  * `stream` is a [Readable
  Stream](https://nodejs.org/api/stream.html#stream_readable_streams)
  * `recsep` is either a String or Regular Expression (anything that can
be passed on to `String.split()` method)

* `rr.recordsFromFile(path, recsep)`
  * `path` is a String containing a valid path to a text file.

* `rr.recordsFromString(str, recsep)`
  * `str` is a String.

## Example

```js
const rr = require('read-record');

const records = rr.recordsFromString('This is a string', ' ');

for await (const rec of records){
  console.log(rec);
}

// This
// is
// a
// string
```

## To do

* add option to discard empty records
* add option to define size of `fs.createReadStream` `highWaterMark`
* add option to define size of `fs.createReadStream` `encoding`
  param
* evalutate (and increase) efficiency
* use event 'line' instead of `for await...of` loop
* use `indexOf` instead of regular expressions?


## Bugs and stuff
Open a GitHub issue or, preferably, send me a pull request.

## License

The MIT License (MIT)

Copyright (c) 2019 André Santos <andrefs@andrefs.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
