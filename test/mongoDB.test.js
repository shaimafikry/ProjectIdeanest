const assert = require('assert');
const { expect } = require('chai');
const connection = require('../mongoDB')
const sinon = require('sinon');


// test connectio to db

describe('test mongodb connection to data base', function(){

	let spy;
	beforeEach(( )=> {
		spy = sinon.spy(console, 'log');

	})
  afterEach(()=>{
		spy.restore();
	})

	it (' should print mongodb connected to database', async function () {
		 await connection;
		expect(spy.calledWith('mongodb connected'))
	})
})
