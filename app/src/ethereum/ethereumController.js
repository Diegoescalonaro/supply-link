/**
 * @namespace Ethereum
 * @description Ethereum Controller
 */

var Web3 = require('web3')
var ABI = require('./ABI.js').platform

/**
 * Version web3: 1.x.x (web3.version.api) 
 * 
 * Conectando al nodo Parity en testnet KOVAN:
 * Kovan Network - Nodo parity IP
 * 
 * Conectando al nodo de pruebas local en Ganache:
 * Testnet Ganache (127.0.0.1:8545)
 */

// Default provider settings
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"))
exports.web3 = web3

// Default account settings
defaultAccount = async function () {
    const accounts = await web3.eth.getAccounts()
    web3.eth.defaultAccount = accounts[0]
    console.log("Default account: " + web3.eth.defaultAccount)

    const balance = await web3.eth.getBalance(web3.eth.defaultAccount)
    console.log("Balance:", web3.utils.fromWei(balance, "ether"))
}
exports.defaultAccount = defaultAccount

defaultAccount()

/**
 * @function setProvider
 * @param network {String} ['local', 'testnet']
 * @description  
 */

setProvider = function (network) {
    if (network == 'local') {
        web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
        web3.eth.defaultAccount = web3.eth.accounts[0]
        exports.web3 = web3
        console.log("Local provider")
        return ("Local provider")
    } else if (network == 'testnet') {
        web3 = new Web3(new Web3.providers.HttpProvider('IP_PUBLICA'))
        web3.eth.defaultAccount = web3.eth.accounts[0]
        exports.web3 = web3
        console.log("Testnet provider")
        return ("Testnet provider")
    } else {
        console.log("You must introduce: 'local' or 'testnet' in order to set the provider.")
        return ("error")
    }
}
exports.setProvider = setProvider

setProvider('local')


/**
 * @function instantiateContract
 * @param address {Address} Smart Contract address in the blockchain platform
 * @description Instantiate the ethereum smart contract from the public address
 */


var smartcontractaddress = undefined
var trContract = undefined

instantiateContract = function (address) {
    smartcontractaddress = address
    exports.smartcontractaddress = smartcontractaddress

    trContract = new web3.eth.Contract(ABI, address)
    exports.trContract = trContract

    return trContract
}
exports.instantiateContract = instantiateContract


/**
 * @function solicitar
 * @param 
 * @description 
 * @returns {Promise}
 */
function solicitar(info) {
    return thePromise = new Promise((resolve, reject) => {
        if (trContract == undefined)
            resolve("You must instantiate the contract.")
        else {
            //web3.eth.personal.unlockAccount("account","config.ethereum.defaultAccount_pass")
            trContract.methods.solicitar(info).send({ from: web3.eth.defaultAccount, gas: 900000 })
                .then(res => {
                    // will be fired once the receipt its mined
                    //logger.info(`Tx registered in Ethereum: ${res.transactionHash}`)
                    resolve(res.transactionHash)
                })
                .catch(error => {
                    //logger.error(err.message)
                    reject(error.message)
                })
        }
    })
}
exports.solicitar = solicitar

exports.solicitarAsync = async function (info) {
    try {
        var x = await solicitar(info)
        console.log(x)
    } catch (e) {
        console.log(e)

    }
}



/**
 * @function cubrir
 * @param numberID {Number}
 * @description 
 * @returns {Promise}
 */
exports.cubrir = function (numberID) {
    let thePromise = new Promise((resolve, reject) => {

        //web3.eth.personal.unlockAccount("account","config.ethereum.defaultAccount_pass")
        trContract.methods.cubrir(numberID).send({ from: web3.eth.defaultAccount, gas: 900000 })  //TODO: PARAMETROS
            .then(res => {
                // will be fired once the receipt its mined
                //logger.info(`Tx registered in Ethereum: ${res.transactionHash}`)
                resolve(res.transactionHash)
            })
            .catch(err => {
                logger.error(err.message)
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
exports.validar = function (numberID, state) {
    let thePromise = new Promise((resolve, reject) => {

        //web3.eth.personal.unlockAccount("account","config.ethereum.defaultAccount_pass")
        trContract.methods.validar(numberID, state).send({ from: web3.eth.defaultAccount, gas: 900000 })
            .then(res => {
                // will be fired once the receipt its mined
                //logger.info(`Tx registered in Ethereum: ${res.transactionHash}`)
                resolve(res.transactionHash)
            })
            .catch(err => {
                logger.error(err.message)
                reject(err.message)
            })
    })
    return thePromise
}


/**
 * @function getNecesidadByID 
 * @param numberID {Number} 
 * @description 
 * @returns {Promise}
 */
getNecesidadByID = async function (numberID) {
    var result = await trContract.methods.getNecesidadByID(numberID).call()
    return { info: result['info'], owner: result['owner'], provider: result['provider'] }
}
exports.getNecesidadByID = getNecesidadByID


/**
 * @function getAllSolicitudes
 * @description
 * @returns
 */
getAllSolicitudes = async function () {
    var length = await trContract.methods.getLength().call()
    console.log(length)
    for (i = 0; i < length; i++) {
        var result = await trContract.methods.getNecesidadByID(i).call()
        console.log(result)
    }
}
exports.getAllSolicitudes = getAllSolicitudes


/**
 * @function getAllSolicitudes
 * @description
 * @returns
 */
getAllSolicitudesByAddress = async function (address) {
    var length = await trContract.methods.getLength().call()
    console.log(length)
    for (i = 0; i < length; i++) {
        var result = await trContract.methods.getNecesidadByID(i).call()
        if (result.owner == address) console.log(result)
    }
}
exports.getAllSolicitudesByAddress = getAllSolicitudesByAddress
