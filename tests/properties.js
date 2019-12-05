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

	it('Just post', async () => {
		await instance.post.call(price, size, geoAddress, description, documents, rooms);
	});

	it('Post, nb properties should be 1', async () => {
		await instance.post(price, size, geoAddress, description, documents, rooms);
		assert.equal(await instance.getNbProperties(), 1);
	});
	
	it('Post, id should be 0 & result should be equal than posted info', async () => {
		await instance.post(price, size, geoAddress, description, documents, rooms);

		var res = await instance.properties.call(0);

		assert.equal(res['price'], price);
		assert.equal(res['size'], size);
		assert.equal(res['geoAddress'], geoAddress);
		assert.equal(res['description'], description);
		assert.equal(res['documents'], documents);
		assert.equal(res['nbRooms'], rooms);
		assert.equal(res['selling'], true);
	});

	it('2 Post, 2nd result should be equal than posted info, nb properties should be 2', async () => {
		await instance.post(price, size, geoAddress, description, documents, rooms);
		await instance.post(price+100, size+10, geoAddress, description, documents, rooms+1);

		var res = await instance.properties.call(1);

		assert.equal(res['price'], price+100);
		assert.equal(res['size'], size+10);
		assert.equal(res['geoAddress'], geoAddress);
		assert.equal(res['description'], description);
		assert.equal(res['documents'], documents);
		assert.equal(res['nbRooms'], rooms+1);
		assert.equal(res['selling'], true);

		assert.equal(await instance.getNbProperties(), 2);
	});

	it('Should be my property', async () => {
		await instance.post(price, size, geoAddress, description, description, rooms);

		assert.equal(await instance.isMyProperty(0), true);
	});

	it('Nb properties should be 0', async () => {
		assert.equal(await instance.getNbProperties(), 0);
	});
});