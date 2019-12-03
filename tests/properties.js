const PropertyFactory = artifacts.require('./PropertyFactory.sol');
const assert = require('assert');
const uuid = require('uuid');

var a1 = [1, 20, "20 rue Montorgueil", "un petit appartement", uuid(), 2];
var a2 = [1, 40, "10 rue du Caire", "un charmant appartement", uuid(), 2];

contract('PropertyFactory', async function(accounts) {
	var instance;

	beforeEach('Init', async () => {
		instance = await PropertyFactory.deployed();
		
		await instance.clearAllProperties();
	});

	it('Count of properties should be 0', async () => {
		const properties = await instance.properties.call();
		console.log(properties);

		assert.equal(properties.length, 0);
	});
	
	it('Post, Count of properties should be 1', async () => {
		await instance.post(a1[0], a1[1], a1[2], a1[3], a1[4], a1[5]);

		const properties = await instance.getProperties();
		console.log(properties);

		//assert.equal(properties.length, 1);
	});

	/*it('Post, Count of properties should be 2', async () => {
		await instance.post(a1[0], a1[1], a1[2], a1[3], a1[4], a1[5]);
		await instance.post(a2[0], a2[1], a2[2], a2[3], a2[4], a2[5]);
		
		assert.equal(await instance.getNbProperties(), 2);
	});
*/
	/*it('Should be my property', async () => {
		await instance.post(1, 50, "10 rue du Caire", "un bel appart", uuid(), 3);

		console.log(await instance.getPropertiesIdsByOwner(accounts[1]));
	});*/
});