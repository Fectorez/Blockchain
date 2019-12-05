pragma solidity ^0.5.8;
// pragma experimental ABIEncoderV2;

contract PropertyFactory {

    struct Property {
        uint256 price;
        uint256 size;
        string geoAddress;
        string description;
        string documents;
        uint256 nbRooms;
        bool selling;
        address payable owner;
    }

    Property[] public properties;

    // mettre en vente (non adapté de renvoyer un objet)
    function post(uint256 _price, uint256 _size, string calldata _geoAddress,
                  string calldata _description, string calldata _documents, uint256 _nbRooms) external returns (uint) {
        properties.push(Property(
            _price,
            _size,
            _geoAddress,
            _description,
            _documents,
            _nbRooms,
            true,
            msg.sender
        ));
    }

    // achat d'une property
    function buy(uint256 _propertyId) external payable {
        require(msg.value == properties[_propertyId].price, "Erreur prix propriété"); // vérif
        properties[_propertyId].owner.transfer(msg.value); // transfert
        properties[_propertyId].owner = msg.sender; // changement proprio
        properties[_propertyId].selling = false; // plus en vente
    }

    // propr. de sender ?
    function isMyProperty(uint256 _propertyId) external view returns (bool) {
        return properties[_propertyId].owner == msg.sender;
    }

    // tous les ID des properties de sender
    /*function getPropertiesIdsByOwner() external view returns(uint[] memory) {
        uint[] memory result = new uint[](ownerPropertyCount[msg.sender]);
        uint counter = 0;
        for (uint i = 0; i < properties.length; i++) {
            if (propertyToOwner[i] == msg.sender) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }*/

    function getNbProperties() external view returns (uint) {
        return properties.length;
    }

    // propr. en vente
    /*function getAvailableProperties() external view returns (Property[] memory) {
        Property[] memory availableProperties;

		uint j = 0;

        for ( uint i = 0 ; i < properties.length ; i++ ) {
            if (availableProperties[i].selling) {
                availableProperties[j] = properties[i];
				j++;
            }
        }
        return availableProperties;
    }*/

	function clearAllProperties() external {
		delete properties;
	}
}
