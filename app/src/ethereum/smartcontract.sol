pragma solidity ^0.4.25;

contract Plataforma {
    
    /** Atributos, eventos, etc */
    
    uint256 private numberID;
    struct Solicitud {
        uint256 id;
        string info;
        address owner;
        address provider;
    }
    
    Solicitud[] solicitudes;
    mapping (uint256 => uint256) positionToNumberID;
    mapping (uint256 => Solicitud) numberIDtoSolicitud;
    
    // eventos
    event NuevaSolicitud (uint256 id, string info, address owner);
    event SolicitudCubierta (uint256 id, string info, address owner, address from);
    event SolicitudValidada (uint256 id, string info, address owner, bool status);
    
    constructor() public{
        numberID = 0;
    }
    

    /* GETS */
    function getNecesidadByID(uint256 _numberID) public view returns(uint256 id, string info, address owner, address provider){
        uint lenght = solicitudes.length;
        for (uint i=0; i<lenght; i++){
            if (solicitudes[i].id == _numberID) return (solicitudes[i].id,solicitudes[i].info, solicitudes[i].owner, solicitudes[i].provider);
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
    
    // Añadir necesidad
    function solicitar(string _info) public {
        uint _position = solicitudes.push(Solicitud(numberID, _info, msg.sender, 0x0)) -1;
        positionToNumberID[_position] = numberID;
        emit NuevaSolicitud(numberID, _info, msg.sender);
        numberID++;

    }
    
    // Funcion de cubrir necesidad
    function cubrir(uint _numberID) public{
        require( solicitudes[positionToNumberID[_numberID]].provider == 0x0);
        solicitudes[positionToNumberID[_numberID]].provider = msg.sender;
        emit SolicitudCubierta(_numberID, solicitudes[positionToNumberID[_numberID]].info, solicitudes[positionToNumberID[_numberID]].owner, msg.sender);
    }
    
    function validar(uint256 _numberID, bool _state) public{
        require(msg.sender == getNecesidadOwner(_numberID));
        if(_state){ 
            delete solicitudes[positionToNumberID[_numberID]];
            emit SolicitudValidada(_numberID, solicitudes[positionToNumberID[_numberID]].info, solicitudes[positionToNumberID[_numberID]].owner, _state);
         }else{ 
            solicitudes[positionToNumberID[_numberID]].provider = 0x0;
            emit SolicitudValidada(_numberID, solicitudes[positionToNumberID[_numberID]].info, solicitudes[positionToNumberID[_numberID]].owner, _state);
         }
    }
}