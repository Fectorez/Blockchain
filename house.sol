pragma solidity ^0.5.11;
pragma experimental ABIEncoderV2;

contract HouseFactory {

    struct House {
        uint256 id;
        uint256 price;
        uint256 size;
        string geoAddress;
        string description;
        string documents;
        uint256 nbRooms;
        bool selling;
    }

    House[] public houses;
    House[] tmpHouses;

    mapping (uint => address) public houseToOwner;

    function post(uint256 _price, uint256 _size, string memory _geoAddress,
                  string memory _description, string memory _documents, uint256 _nbRooms) public {
        uint256 id = houses.length;
        House memory house = House(id, _price, _size, _geoAddress, _description,_documents, _nbRooms, false);
        houses.push(house);
        houseToOwner[id] = msg.sender;
    }

    // achat d'une propr.
    function buy(uint256 _houseId) public {
        houseToOwner[_houseId] = msg.sender;
        houses[_houseId].selling = false;
    }

    // nb total propr.
    function getNbHouses() public view returns (uint256) {
        return houses.length;
    }

    // propr. de sender ?
    function isMyHouse(uint256 _houseId) public view returns (bool) {
        return houseToOwner[_houseId] == msg.sender;
    }

    // est en selling
    function isAvailable(uint256 _houseId) public view returns (bool) {
        return houses[_houseId].selling;
    }

    // toutes les popr.
    function getMyHouses() public returns (House[] memory) {
        House[] memory tmpAvailableHouses;
        tmpHouses = tmpAvailableHouses;
        for ( uint i = 0 ; i < houses.length ; i++ ) {
            if ( houseToOwner[i] == msg.sender) {
                tmpHouses.push(houses[i]);
            }
        }
        return tmpHouses;
    }

    // propr. en vente
    function getAvailableHouses() public returns (House[] memory) {
        House[] memory tmpAvailableHouses;
        tmpHouses = tmpAvailableHouses;
        for ( uint i = 0 ; i < houses.length ; i++ ) {
            if ( houses[i].selling && houseToOwner[i] != msg.sender) {
                tmpHouses.push(houses[i]);
            }
        }
        return tmpHouses;
    }

}