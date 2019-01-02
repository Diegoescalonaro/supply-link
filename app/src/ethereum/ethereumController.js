import Web3 from 'web3';
import config from '../config';

/* ABI + ADDRESS */
export var ABI = require('./ABI.js').default
export var address = config.smartcontractaddress

/* WEB3 CREATION */
var web3 = window.web3

console.log("DEBUG ********************S*S*S**S*S")
console.log(web3.providers)
console.log(web3.currentProvider)

console.log("METAMASKKKKKKKKKKKKKK")
//console.log(window.ethereum.enable())
//window.ethereum.enable().then(console.log) //Aparece cuadro de permitir conectar a metamask

/* WEB3 PROVIDER */
if (typeof web3 != 'undefined') {
    web3 = new Web3(web3.currentProvider)
    console.log("Metamask provider")
} else {
    alert("Please, install Metamask plugin.")
    web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"))
    console.log("Local provider")
}
export var web3 =  web3
console.log(web3)

/* CONTRACT IMPLEMENTATION */
export var contract = new web3.eth.Contract(ABI, address);
console.log("Contract integrated! *_*")

/* HANDLING BLOCKCHAIN EVENTS */
export var getEvent = async function () {
    var thePromise = new Promise((resolve, reject) => {
        contract.events.allEvents({}, function (error, event) {
            console.log("EVENTO-----------")
            if (event !== undefined) {
                console.log(event.returnValues)
                resolve(event.returnValues)
            }
        })
    })
    return thePromise
}

/* HANDLING METAMASK EVENTS */
export var getMetamaskEvent = async function () {
    var thePromise = new Promise((resolve, reject) => {
        window.ethereum.on('accountsChanged', function (accounts) {
                console.log("EVENTO METAMASK ------- Cambio de cuenta"+accounts[0])
                resolve(accounts[0])
        })
    })
    return thePromise
}


// contract.events.SolicitudCubierta({}, function(error,event){
//     console.log("EVENTO-----------")
//     if(event !== undefined && event.event === "SolicitudCubierta"){
//         console.log(event)
//     }
// })
// contract.events.SolicitudValidada({}, function(error,event){
//     console.log("EVENTO-----------")
//     if(event !== undefined && event.event === "SolicitudValidada"){
//         console.log(event.returnValues)
//     }
// })


//TODO: Hacer comprobación con metamask para que si cambia la cuenta en uso se actualice todo
// Default account settings
export var getDefaultAccount = async function () {
    const accounts = await window.ethereum.enable()     // Cuadro de login MetaMask
    const account = accounts[0]
    web3.eth.defaultAccount = account
    console.log("Default account: " + account)

    const balance = await web3.eth.getBalance(account)
    console.log("Balance:", web3.utils.fromWei(balance, "ether"), "eth")
    return await account
}



/**
 * @function solicitar
 * @param 
 * @description 
 * @returns {Promise}
 */
export var solicitar = function (product, precio) {
    var thePromise = new Promise((resolve, reject) => {
        if (contract === undefined)
            resolve("You must instantiate the contract.")
        else {
            contract.methods.solicitar(product, precio).send({ from: web3.eth.defaultAccount })
                .then(res => {
                    // will be fired once the receipt its mined
                    //logger.info(`Tx registered in Ethereum: ${res.transactionHash}`)
                    resolve(res)
                })
                .catch(error => {
                    //logger.error(err.message)
                    reject(error.message)
                })
        }
    })
    return thePromise
}


/**
 * @function cubrir
 * @param numberID {Number}
 * @description 
 * @returns {Promise}
 */
export var cubrir = function (numberID) {
    let thePromise = new Promise((resolve, reject) => {
        contract.methods.cubrir(numberID).send({ from: web3.eth.defaultAccount })  
            .then(res => {
                // will be fired once the receipt its mined
                //logger.info(`Tx registered in Ethereum: ${res.transactionHash}`)
                resolve(res)
            })
            .catch(err => {
                //logger.error(err.message)
                reject(err.message)
            })
    })
    return thePromise
}

/**
 * @function validar
 * @param numberID {Number}
 * @param state {Boolean}
 * @description 
 * @returns {Promise}
 */
export var validar = function (numberID, precio) {
    let thePromise = new Promise((resolve, reject) => {
        contract.methods.validar(numberID).send({ from: web3.eth.defaultAccount, value: precio })
            .then(res => {
                // will be fired once the receipt its mined
                //logger.info(`Tx registered in Ethereum: ${res.transactionHash}`)
                resolve(res)
            })
            .catch(err => {
                //logger.error(err.message)
                reject(err.message)
            })
    })
    return thePromise
}

/**
 * @function cancelar
 * @param numberID {Number}
 * @param delete {Boolean}
 * @description 
 * @returns {Promise}
 */
export var cancelar = function (numberID, bool) {
    let thePromise = new Promise((resolve, reject) => {
        contract.methods.cancelar(numberID, bool).send({ from: web3.eth.defaultAccount })
            .then(res => {
                // will be fired once the receipt its mined
                //logger.info(`Tx registered in Ethereum: ${res.transactionHash}`)
                resolve(res)
            })
            .catch(err => {
                //logger.error(err.message)
                reject(err.message)
            })
    })
    return thePromise
}


/**
 * @function getSolicitudByID 
 * @param numberID {Number} 
 * @description 
 * @returns {Promise}
 */
export var getSolicitudByID = async function (numberID) {
    var result = await contract.methods.getSolicitudByID(numberID).call()
    return { result }
}

/**
 * @function getAllSolicitudes
 * @description
 * @returns
 */
export var getAllSolicitudes = async function () {
    var length = await contract.methods.getLength().call()
    var result = []
    for (var i = length - 1; i >= 0; i--) {
        var solicitud = await contract.methods.getSolicitudByID(i).call()
        if (solicitud.product !== '') {
            result.push(solicitud)
        }
    }
    return result
}

//Igual: getAllSolicitudesForOwner
/**
 * @function getAllSolicitudesByAddress
 * @description
 * @returns
 */
export var getAllSolicitudesByAddress = async function (address) {
    var length = await contract.methods.getLength().call()
    var result = []
    for (var i = length - 1; i >= 0; i--) {
        var solicitud = await contract.methods.getSolicitudByID(i).call()
        if (solicitud.owner.toUpperCase() == address.toUpperCase()) {
            result.push(solicitud)
            console.log(result)
        }
    }
    return result
}


//TODO: getAllSolicitudesForProvider
/**
 * @function getAllSolicitudesForProvider
 * @description
 * @returns
 */
export var getAllSolicitudesForProvider = async function (address) {
    var length = await contract.methods.getLength().call()
    var result = []
    for (var i = length - 1; i >= 0; i--) {
        var solicitud = await contract.methods.getSolicitudByID(i).call()
        if (solicitud.proveedor.toUpperCase() == address.toUpperCase()) {
            result.push(solicitud)
        }
    }
    return result
}




/*

// Default Network //
console.log(web3.givenProvider.networkVersion)
var netId = web3.givenProvider.networkVersion
switch (netId) {
  case "1":
    console.log('This is mainnet')
    break
  case "2":
    console.log('This is the deprecated Morden test network.')
    break
  case "3":
    console.log('This is the ropsten test network.')
    break
  case "4":
    console.log('This is the Rinkeby test network.')
    break
  case "42":
    console.log('This is the Kovan test network.')
    break
  default:
    console.log('This is an unknown network.')
}

*/
