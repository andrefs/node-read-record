const fs = require('fs');
const Readable = require('stream').Readable;
const chai = require('chai');
const path = require('path');
chai.use(require('chai-generator'));
chai.use(require('chai-as-promised'));

const expect = chai.expect;
const {
  records,
  recordsFromFile,
  recordsFromString} = require('../index.js');

describe('records', () => {
  it('returns expected number of records', async () => {
    let readStream = new Readable();
    readStream.push('This is a sentence');
    readStream.push(null);

    let i=0;
    for await (const item of records(readStream, ' ')){
      i++;
    }
    expect(i).to.equal(4);
  });

  it('returns expected records', async () => {
    let readStream = new Readable();
    readStream.push('This\n\nis\n\na\n\nsentence');
    readStream.push(null);

    const rs = records(readStream, /\n\n/);

    return Promise.all([
      expect(rs.next()).to.eventually.deep.equal({value: 'This'    , done: false}),
      expect(rs.next()).to.eventually.deep.equal({value: 'is'      , done: false}),
      expect(rs.next()).to.eventually.deep.equal({value: 'a'       , done: false}),
      expect(rs.next()).to.eventually.deep.equal({value: 'sentence', done: false}),
      expect(rs.next()).to.eventually.have.property('done', true)
    ]);
  });

  it('returns empty records', async () => {
    let readStream = new Readable();
    readStream.push('\n\n\n\nThis\n\nis\n\na\n\nsentence\n\n');
    readStream.push(null);

    let i=0;
    for await (const item of records(readStream, /\n\n/)){
      i++;
    }
    expect(i).to.equal(7);
  });

  it('splits records with correct record separator', async () => {
    let readStream1 = new Readable();
    readStream1.push('This\n\nis\n\na\n\nsentence');
    readStream1.push(null);

    let readStream2 = new Readable();
    readStream2.push('This\n\nis\n\na\n\nsentence');
    readStream2.push(null);

    let i=0;
    for await (const item of records(readStream1, / /)){
      i++;
    }
    let j=0;
    for await (const item of records(readStream2, /\n\n/)){
      j++;
    }

    return Promise.all([
      expect(i).to.equal(1),
      expect(j).to.equal(4)
    ]);
  });
});

describe('recordsFromString', () => {
  it('reads records from string', () => {
    let string = 'This\n\nis\n\na\n\nsentence';

    const rs = recordsFromString(string, /\n\n/);

    return Promise.all([
      expect(rs.next()).to.eventually.deep.equal({value: 'This'    , done: false}),
      expect(rs.next()).to.eventually.deep.equal({value: 'is'      , done: false}),
      expect(rs.next()).to.eventually.deep.equal({value: 'a'       , done: false}),
      expect(rs.next()).to.eventually.deep.equal({value: 'sentence', done: false}),
      expect(rs.next()).to.eventually.have.property('done', true)
    ]);
  });
});



describe('recordsFromFile', () => {
  it('reads records from file', () => {
    let file = 'file.aux';

    const rs = recordsFromFile(path.join(__dirname, file), /\n\n/);

    return Promise.all([
      expect(rs.next()).to.eventually.deep.equal({value: 'This'    , done: false}),
      expect(rs.next()).to.eventually.deep.equal({value: 'is'      , done: false}),
      expect(rs.next()).to.eventually.deep.equal({value: 'a'       , done: false}),
      expect(rs.next()).to.eventually.deep.equal({value: 'sentence', done: false}),
      expect(rs.next()).to.eventually.deep.equal({value: ''        , done: false}),
      expect(rs.next()).to.eventually.have.property('done', true)
    ]);
  });
});
