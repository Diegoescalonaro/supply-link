import Web3 from 'web3';
import config from '../config';

/* ABI + ADDRESS */
export var ABI = require('./ABI.js').default
export var address = config.smartcontractaddress

/* WEB3 CREATION */
var web3 = window.web3
var web3provider = undefined

/* WEB3 PROVIDER */
if (typeof web3 != 'undefined') {
    web3provider = web3.currentProvider
    console.log("Metamask provider")
} else {
    alert("Please, install Metamask plugin.")
    web3provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545")
    console.log("Ganache provider")
}
export var web3 = new Web3(web3provider)
console.log(web3)

/* CONTRACT IMPLEMENTATION */
export var contract = new web3.eth.Contract(ABI, address);
console.log(contract)
console.log("DEBUGGING")

/* HANDLING BLOCKCHAIN EVENTS */
// contract.events.NuevaSolicitud({}, function(error,event){
//     console.log("EVENTO-----------")
//     if(event !== undefined && event.event === "NuevaSolicitud"){
//         console.log(event.returnValues)
//     }
// })
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


// Default account settings
export var getDefaultAccount = async function () {
    const accounts = await web3.eth.getAccounts()
    web3.eth.defaultAccount = accounts[0]
    console.log("Default account: " + web3.eth.defaultAccount)

    const balance = await web3.eth.getBalance(web3.eth.defaultAccount)
    console.log("Balance:", web3.utils.fromWei(balance, "ether"), "eth")
    return await web3.eth.defaultAccount
}

/**
 * @function solicitar
 * @param 
 * @description 
 * @returns {Promise}
 */
export var solicitar = function (info, price) {
    var thePromise = new Promise((resolve, reject) => {
        if (contract === undefined)
            resolve("You must instantiate the contract.")
        else {
            contract.methods.solicitar(info,price).send({ from: web3.eth.defaultAccount})
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
        contract.methods.cubrir(numberID).send({ from: web3.eth.defaultAccount})  //TODO: PARAMETROS
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
 */ //TODO: INCLUIR EL PRECIO ----------------------------
export var validar = function (numberID, price) {
    let thePromise = new Promise((resolve, reject) => {
        contract.methods.validar(numberID).send({ from: web3.eth.defaultAccount, value: price })
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
export var cancelar = function (numberID) {
    let thePromise = new Promise((resolve, reject) => {
        contract.methods.cancelar(numberID).send({ from: web3.eth.defaultAccount })
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
    console.log(numberID)
    var result = await contract.methods.getNecesidadByID(numberID).call()
    return { info: result['info'], owner: result['owner'], provider: result['provider'] }
}

/**
 * @function getAllSolicitudes
 * @description
 * @returns
 */
export var getAllSolicitudes = async function () {
    var length = await contract.methods.getLength().call()
    var result = []
    for (var i = 0; i < length; i++) {
        var solicitud = await contract.methods.getNecesidadByID(i).call()
        if (solicitud.info !== '') {
            result.push(solicitud)
        }
    }
    return result
}

/**
 * @function getAllSolicitudes
 * @description
 * @returns
 */
export var getAllSolicitudesByAddress = async function (address) {
    var length = await contract.methods.getLength().call()
    var result = []
    for (var i = 0; i < length; i++) {
        var solicitud = await contract.methods.getNecesidadByID(i).call()
        if (solicitud.owner === address) {
            result.push(solicitud)
        }
    }
    return result
}

