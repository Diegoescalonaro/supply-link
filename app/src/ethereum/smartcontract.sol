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
        Solicitud memory solicitud = solicitudes[positionToNumberID[_numberID]];
        require( solicitud.proveedor == 0x0 && solicitud.status == Status.pendiente);
        solicitud.proveedor = msg.sender;
        solicitud.status = Status.cubierta;
        emit SolicitudCubierta(_numberID, solicitud.producto, solicitud.precio, solicitud.owner, msg.sender);
    }

    /**  
    *  Funcion de validar una demanda de producto ya cubierta por proveedor (cliente)
    **/
    function validar(uint256 _numberID) payable public{
        Solicitud memory solicitud = solicitudes[positionToNumberID[_numberID]];
        require(msg.sender == getSolicitudOwner(_numberID) && solicitud.status == Status.cubierta);
        require(msg.value >= solicitud.precio);
        address destination = solicitud.proveedor;
        // transfer ether to pay the product
        destination.transfer(solicitud.precio);
        solicitud.status = Status.validada;
        emit SolicitudValidada(_numberID, solicitud.producto, solicitud.precio, solicitud.owner);
    }
    
    /**
    *  Funcion para cancelar una demanda de producto (cliente) 
    **/
    function cancelar(uint256 _numberID, bool _delete) public{
        Solicitud memory solicitud = solicitudes[positionToNumberID[_numberID]];
        require(msg.sender == getSolicitudOwner(_numberID));
        if(_delete){
            delete solicitud;
        }else{
            solicitud.status = Status.pendiente;
            solicitud.proveedor = 0x0;
        }
        emit SolicitudCancelada(_numberID, solicitud.producto, solicitud.precio, solicitud.owner, _delete);
    }
}