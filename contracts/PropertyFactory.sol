pragma solidity ^0.5.8;
pragma experimental ABIEncoderV2;

contract PropertyFactory {

    struct Property {
        //uint256 id;
        uint256 price;
        uint256 size;
        bytes32 geoAddress;
        bytes32 description;
        bytes32 documents;
        uint256 nbRooms;
        bool selling;
    }

    Property[] public properties;

    mapping (uint => address payable) public propertyToOwner;
    mapping (address => uint) ownerPropertyCount;

    // mettre en vente
    function post(uint256 _price, uint256 _size, bytes32 _geoAddress,
                  bytes32 _description, bytes32 _documents, uint256 _nbRooms) external {
        //uint256 id = properties.length;
        //Property memory property = Property(id, _price, _size, _geoAddress, _description,_documents, _nbRooms, true);
        uint id = properties.push(Property(_price, _size, _geoAddress, _description,_documents, _nbRooms, true));
        //properties.push(property);
        propertyToOwner[id] = msg.sender;
        ownerPropertyCount[msg.sender]++;
    }

    // achat d'une property
    function buy(uint256 _propertyId) external payable {
        require(msg.value == properties[_propertyId].price); // vérif
        propertyToOwner[_propertyId].transfer(msg.value); // transfert
        propertyToOwner[_propertyId] = msg.sender; // changement proprio
        properties[_propertyId].selling = false; // plus en vente
    }

    // propr. de sender ?
    function isMyProperty(uint256 _propertyId) external view returns (bool) {
        return propertyToOwner[_propertyId] == msg.sender;
    }

    // tous les ID des properties de <_owner>
    function getPropertiesIdsByOwner(address _owner) external view returns(uint[] memory) {
        uint[] memory result = new uint[](ownerPropertyCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < properties.length; i++) {
            if (propertyToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

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
