const fs = require('fs');
const Readable = require('stream').Readable;

async function* records(stream, recsep){
	let leftovers = '';

	for await (const chunk of stream){
		const records = (leftovers+chunk).split(recsep);
		leftovers = records.pop();

 	  yield* records;
	}
  yield leftovers;
}

function _streamFromFile(path){
  return fs.createReadStream(path, {encoding: 'utf8', highWaterMark: 1024});
}

function _streamFromString(str){
  let readStream = new Readable;
  readStream.push(str);
  readStream.push(null);
  return readStream;
}

async function* recordsFromFile(path, recsep){
  yield* records(_streamFromFile(path), recsep);
}


async function* recordsFromString(str, recsep){
  yield* records(_streamFromString(str), recsep);
}

module.exports = {
  records,
  recordsFromFile,
  recordsFromString
};

