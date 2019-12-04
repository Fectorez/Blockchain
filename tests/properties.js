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

	/*it('Count of properties should be 0', async () => {
		const properties = await instance.properties.call();
		console.log(properties);

		assert.equal(properties.length, 0);
	});*/
	
	it('Post, result should be equal than posted info', async () => {
		await instance.post(1, 20, "20 rue Montorgueil", "un petit appartement", 'Attestation sécurité, ...', 2);

		var res = await instance.properties.call(0);

		assert.equal(res['price'], 1);
		assert.equal(res['size'], 20);
		assert.equal(res['geoAddress'], '20 rue Montorgueil');
		assert.equal(res['description'], 'un petit appartement');
		assert.equal(res['documents'], 'Attestation sécurité, ...');
		assert.equal(res['nbRooms'], 2);
		assert.equal(res['selling'], true);

		assert.equal(await instance.getNbProperties(), 1);
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

	it('Nb properties should be 0', async () => {
		assert.equal(await instance.getNbProperties(), 0);
	});
});