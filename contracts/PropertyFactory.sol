pragma solidity ^0.5.8;
//pragma experimental ABIEncoderV2;

contract PropertyFactory {

    struct Property {
        //uint256 id;
        uint256 price;
        uint256 size;
        string geoAddress;
        string description;
        string documents;
        uint256 nbRooms;
        bool selling;
    }

    Property[] public properties;
    //Property[] tmpProperties;

    mapping (uint => address payable) public propertyToOwner;
    mapping (address => uint) ownerPropertyCount;

    // mettre en vente
    function post(uint256 _price, uint256 _size, string calldata _geoAddress,
                  string calldata _description, string calldata _documents, uint256 _nbRooms) external {
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

    // nb total properties
    function getNbProperties() external view returns (uint256) {
        return properties.length;
    }

    // propr. de sender ?
    function isMyProperty(uint256 _propertyId) external view returns (bool) {
        return propertyToOwner[_propertyId] == msg.sender;
    }

    // est en selling
    function isAvailable(uint256 _propertyId) external view returns (bool) {
        return properties[_propertyId].selling;
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

    // toutes les properties
    /*function getMyProperties() external returns (Property[] memory) {
        Property[] memory tmpAvailableHouses;
        tmpProperties = tmpAvailableHouses;
        for ( uint i = 0 ; i < properties.length ; i++ ) {
            if ( propertyToOwner[i] == msg.sender) {
                tmpProperties.push(properties[i]);
            }
        }
        return tmpProperties;
    }

    // propr. en vente
    function getAvailableHouses() external returns (Property[] memory) {
        Property[] memory tmpAvailableHouses;
        tmpProperties = tmpAvailableHouses;
        for ( uint i = 0 ; i < properties.length ; i++ ) {
            if ( properties[i].selling && propertyToOwner[i] != msg.sender) {
                tmpProperties.push(properties[i]);
            }
        }
        return tmpProperties;
    }*/

}
