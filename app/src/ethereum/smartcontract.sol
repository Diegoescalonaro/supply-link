pragma solidity ^0.4.25;

contract Plataforma {
    
    /* Atributes */
    uint256 private numberID;
    
    struct Solicitud {
        uint256 id;
        string info;
        uint256 price;
        address owner;
        address provider;
    }
    
    Solicitud[] solicitudes;
    
    mapping (uint256 => uint256) positionToNumberID;
    mapping (uint256 => Solicitud) numberIDtoSolicitud;
    
    /* Events */
    event NuevaSolicitud (uint256 id, string info, uint256 price, address owner);
    event SolicitudCubierta (uint256 id, string info, uint256 price, address owner, address from);
    event SolicitudValidada (uint256 id, string info, uint256 price, address owner);
    event SolicitudCancelada (uint256 id, string info, uint256 price, address owner);
    
    /* Constructor */
    constructor() public{
        numberID = 0;
    }
    
    /* GETS */
    function getNecesidadByID(uint256 _numberID) public view returns(uint256 id, string info, uint256 price, address owner, address provider){
        uint lenght = solicitudes.length;
        for (uint i=0; i<lenght; i++){
            if (solicitudes[i].id == _numberID) return (solicitudes[i].id, solicitudes[i].info, solicitudes[i].price, solicitudes[i].owner, solicitudes[i].provider);
        }
    }
    function getNecesidadOwner(uint256 _numberID) public view returns(address owner){
        uint lenght = solicitudes.length;
        for (uint i=0; i<lenght; i++){
            if (solicitudes[i].id == _numberID) return (solicitudes[i].owner);
        }
    }
    function getLength() public view returns(uint count) {
        return solicitudes.length;
    }

    /* FUNCIONES */
    
    // Funcion de crear una nueva necesidad de cliente
    function solicitar(string _info, uint256 _price) public {
        uint _position = solicitudes.push(Solicitud(numberID, _info, _price, msg.sender, 0x0)) -1;
        positionToNumberID[_position] = numberID;
        emit NuevaSolicitud(numberID, _info, _price, msg.sender);
        numberID++;
    }
    
    // Funcion de cubrir necesidad por un proveedor
    function cubrir(uint _numberID) public{
        require( solicitudes[positionToNumberID[_numberID]].provider == 0x0);
        solicitudes[positionToNumberID[_numberID]].provider = msg.sender;
        emit SolicitudCubierta(_numberID, solicitudes[positionToNumberID[_numberID]].info, solicitudes[positionToNumberID[_numberID]].price, solicitudes[positionToNumberID[_numberID]].owner, msg.sender);
    }
    
    // Funcion de validar una necesidad cubierta
    function validar(uint256 _numberID) payable public{
        require(msg.sender == getNecesidadOwner(_numberID));
        require(msg.value >= solicitudes[positionToNumberID[_numberID]].price);
        address destination = solicitudes[positionToNumberID[_numberID]].provider;
        // transfer ether to pay the product
        destination.transfer(solicitudes[positionToNumberID[_numberID]].price);
        //TODO: DELETE FROM THE ARRAY????? delete solicitudes[positionToNumberID[_numberID]]; ???
        emit SolicitudValidada(_numberID, solicitudes[positionToNumberID[_numberID]].info, solicitudes[positionToNumberID[_numberID]].price, solicitudes[positionToNumberID[_numberID]].owner);
    }
    
    //Funcion para cancelar una necesidad de cliente
    function cancelar(uint256 _numberID, bool _delete) public{
        require(msg.sender == getNecesidadOwner(_numberID));
        if(_delete){
            delete solicitudes[positionToNumberID[_numberID]];
        }else{
            solicitudes[positionToNumberID[_numberID]].provider = 0x0;
        }
        emit SolicitudCancelada(_numberID, solicitudes[positionToNumberID[_numberID]].info, solicitudes[positionToNumberID[_numberID]].price, solicitudes[positionToNumberID[_numberID]].owner);
    }
}