pragma solidity ^0.4.25;

contract Plataforma {
    
    /* Variables */
    uint256 private numberID;
    enum Status {pendiente, cubierta, validada}
    
    struct Solicitud {
        uint256 id;
        string producto;
        uint256 precio;
        address owner;
        address proveedor;
        Status status;
    }
    
    Solicitud[] solicitudes;
    
    mapping (uint256 => uint256)    positionToNumberID;
    mapping (uint256 => Solicitud)  numberIDtoSolicitud;
    
    /* Eventos */
    event NuevaSolicitud    (uint256 id, string producto, uint256 precio, address owner);
    event SolicitudCubierta (uint256 id, string producto, uint256 precio, address owner, address from);
    event SolicitudValidada (uint256 id, string producto, uint256 precio, address owner);
    event SolicitudCancelada(uint256 id, string producto, uint256 precio, address owner, bool eliminado);
    
    /* Metodo constructor */
    constructor() public{
        numberID = 0;
    }
    
    /* GETS */
    
    function getSolicitudByID(uint256 _numberID) public view returns (uint256 id, string producto, uint256 precio, address owner, address proveedor, Status status){
        uint lenght = solicitudes.length;
        for (uint i=0; i<lenght; i++){
            if (solicitudes[i].id == _numberID) return (solicitudes[i].id, solicitudes[i].producto, solicitudes[i].precio, solicitudes[i].owner, solicitudes[i].proveedor, solicitudes[i].status);
        }
    }
    function getSolicitudOwner(uint256 _numberID) private view returns (address owner){
        uint lenght = solicitudes.length;
        for (uint i=0; i<lenght; i++){
            if (solicitudes[i].id == _numberID) return (solicitudes[i].owner);
        }
    }
    function getLength() public view returns (uint count) {
        return solicitudes.length;
    }

    /* FUNCIONES */
    
    /** 
    *  Funcion de crear una demanda de producto (cliente) 
    **/
    function solicitar(string _producto, uint256 _precio) public {
        uint _position = solicitudes.push(Solicitud(numberID, _producto, _precio, msg.sender, 0x0, Status.pendiente)) -1;
        positionToNumberID[_position] = numberID;
        emit NuevaSolicitud(numberID, _producto, _precio, msg.sender);
        numberID++;
    }
    
    /** 
    *  Funcion de cubrir una demanda de producto (proveedor) 
    **/
    function cubrir(uint _numberID) public{
        require( solicitudes[positionToNumberID[_numberID]].proveedor == 0x0);
        solicitudes[positionToNumberID[_numberID]].proveedor = msg.sender;
        solicitudes[positionToNumberID[_numberID]].status = Status.cubierta;
        emit SolicitudCubierta(_numberID, solicitudes[positionToNumberID[_numberID]].producto, solicitudes[positionToNumberID[_numberID]].precio, solicitudes[positionToNumberID[_numberID]].owner, msg.sender);
    }

    /**  
    *  Funcion de validar una demanda de producto ya cubierta por proveedor (cliente)
    **/
    function validar(uint256 _numberID) payable public{
        require(msg.sender == getSolicitudOwner(_numberID) && solicitudes[positionToNumberID[_numberID]].status == Status.cubierta);
        require(msg.value >= solicitudes[positionToNumberID[_numberID]].precio);
        address destination = solicitudes[positionToNumberID[_numberID]].proveedor;
        // transfer ether to pay the product
        destination.transfer(solicitudes[positionToNumberID[_numberID]].precio);
        solicitudes[positionToNumberID[_numberID]].status = Status.validada;
        emit SolicitudValidada(_numberID, solicitudes[positionToNumberID[_numberID]].producto, solicitudes[positionToNumberID[_numberID]].precio, solicitudes[positionToNumberID[_numberID]].owner);
    }
    
    /**
    *  Funcion para cancelar una demanda de producto (cliente) 
    **/
    function cancelar(uint256 _numberID, bool _delete) public{
        require(msg.sender == getSolicitudOwner(_numberID));
        if(_delete){
            delete solicitudes[positionToNumberID[_numberID]];
        }else{
            solicitudes[positionToNumberID[_numberID]].status = Status.pendiente;
            solicitudes[positionToNumberID[_numberID]].proveedor = 0x0;
        }
        emit SolicitudCancelada(_numberID, solicitudes[positionToNumberID[_numberID]].producto, solicitudes[positionToNumberID[_numberID]].precio, solicitudes[positionToNumberID[_numberID]].owner, _delete);
    }
}