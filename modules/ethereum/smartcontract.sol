/* Primera version de smart contract para plataforma */

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
    event Necesidad();
    event NecesidadCubierta();
    event NecesidadValidada();
    
    constructor() public{
        numberID = 0;
    }
    
    /*struct SolicitudCubierta{
        string info;
        address proveedor;
    }

    /* GETS */
    
    // getNecesidad
    //function getNecesidad(uint256 _position) public view returns(uint256 id, string info, address owner){
    //    return (solicitudes[_position].id, solicitudes[_position].info, solicitudes[_position].owner);
    //}
    
    function getNecesidadByID(uint256 _numberID) public view returns(string info, address owner, address provider){
        uint lenght = solicitudes.length;
        for (uint i=0; i<lenght; i++){
            if (solicitudes[i].id == _numberID) return (solicitudes[i].info, solicitudes[i].owner, solicitudes[i].provider);
        }
    }
    function getNecesidadOwner(uint256 _numberID) public view returns(address owner){
        uint lenght = solicitudes.length;
        for (uint i=0; i<lenght; i++){
            if (solicitudes[i].id == _numberID) return (solicitudes[i].owner);
        }
    }

    /* FUNCIONES */
    
    // Añadir necesidad
    function solicitar(string _info) public {
        uint _position = solicitudes.push(Solicitud(numberID, _info, msg.sender, 0x0)) -1;
        positionToNumberID[_position] = numberID;
        numberID++;
        // emit event
    }
    
    // Funcion de cubrir necesidad
    function cubrir(uint _numberID) public{
        require( solicitudes[positionToNumberID[_numberID]].provider == 0x0);
        solicitudes[positionToNumberID[_numberID]].provider = msg.sender;
        // emit event
    }
    
    function validar(uint256 _numberID, bool _state) public{
        require(msg.sender == getNecesidadOwner(_numberID));
        if(_state) delete solicitudes[positionToNumberID[_numberID]];
            // emit event
         else solicitudes[positionToNumberID[_numberID]].provider = 0x0;
            // emit event
    }
}