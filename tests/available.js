const PropertyFactory = artifacts.require('./PropertyFactory.sol');
const assert = require('assert');
const uuid = require('uuid');

contract('PropertyFactory', async function(accounts) {
	var instance;	

	beforeEach('Init', async () => {
		instance = await PropertyFactory.deployed();
		await instance.clearAllProperties();
	});

	it('Count of available properties should be 0', async function() {
		var instance = await PropertyFactory.deployed();
		await instance.clearAllProperties();

		var properties = await instance.getAvailableHouses();
		console.log(properties);

		assert.equal(properties.length, 0);
	});
});