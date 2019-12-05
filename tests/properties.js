const PropertyFactory = artifacts.require('./PropertyFactory.sol');
const assert = require('assert');

contract('PropertyFactory', async function(accounts) {
	var instance;

	const price = 1;
	const size = 20;
	const geoAddress = '20 rue Montorgueil';
	const description = 'un petit appartement';
	const documents = 'Attestation sécurité, ...';
	const rooms = 2

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
		await instance.post(price, size, geoAddress, description, documents, rooms);

		var res = await instance.properties.call(0);

		assert.equal(res['price'], price);
		assert.equal(res['size'], size);
		assert.equal(res['geoAddress'], geoAddress);
		assert.equal(res['description'], description);
		assert.equal(res['documents'], documents);
		assert.equal(res['nbRooms'], rooms);
		assert.equal(res['selling'], true);

		assert.equal(await instance.getNbProperties(), 1);
	});

	it('Get, result should be equal than posted info', async () => {
		await instance.post(price, size, geoAddress, description, documents, rooms);
		await instance.post(price, size, geoAddress, description, documents, rooms);

		var res = await instance.properties.call(1);

		assert.equal(res['price'], price);
		assert.equal(res['size'], size);
		assert.equal(res['geoAddress'], geoAddress);
		assert.equal(res['description'], description);
		assert.equal(res['documents'], documents);
		assert.equal(res['nbRooms'], rooms);
		assert.equal(res['selling'], true);

		assert.equal(await instance.getNbProperties(), 2);
	});

	/*it('Post, Count of properties should be 2', async () => {
		await instance.post(a1[0], a1[1], a1[2], a1[3], a1[4], a1[5]);
		await instance.post(a2[0], a2[1], a2[2], a2[3], a2[4], a2[5]);
		
		assert.equal(await instance.getNbProperties(), 2);
	});
*/
	it('Should be my property', async () => {
		await instance.post(price, size, geoAddress, description, description, rooms);

		assert.equal(await instance.isMyProperty(0), true);
	});

	it('Nb properties should be 0', async () => {
		assert.equal(await instance.getNbProperties(), 0);
	});
});