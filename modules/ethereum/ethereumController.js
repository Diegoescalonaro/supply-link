/**
 * @namespace Ethereum
 * @description Ethereum Controller
 */

var web3 = require('web3')
var ABI = require("./ABI.js")

exports.web3 = web3

/**
 * @function setProvider
 * @param 
 * @description  
 */
exports.setProvider = function () {

}


/**
 * @function instantiateContract
 * @param address {Address} Smart Contract address in the blockchain platform
 * @description Instantiate the ethereum smart contract from the public address
 */

var trContract = undefined

instantiateContract = function (address) {
    trContract = new web3.eth.Contract(ABI, address)
    return trContract
}
exports.instantiateContract = instantiateContract


/**
 * @function solicitar
 * @param 
 * @description 
 * @returns {Promise}
 */
exports.solicitar = function (timestamp, hash) {
    let thePromise = new Promise((resolve, reject) => {
        let trContract = instantiateContract(address)
        //web3.eth.personal.unlockAccount("account","config.ethereum.defaultAccount_pass")
        trContract.methods.solicitar("PARAMETROS").send({ from: web3.eth.defaultAccount })  //TODO: PARAMETROS
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
 * @function cubrir
 * @param numberID {Number}
 * @description 
 * @returns {Promise}
 */
exports.cubrir = function (numberID) {
    let thePromise = new Promise((resolve, reject) => {
        let trContract = instantiateContract(address)
        //web3.eth.personal.unlockAccount("account","config.ethereum.defaultAccount_pass")
        trContract.methods.solicitar(numberID).send({ from: web3.eth.defaultAccount })  //TODO: PARAMETROS
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
exports.solicitar = function (numberID, state) {
    let thePromise = new Promise((resolve, reject) => {
        let trContract = instantiateContract(address)
        //web3.eth.personal.unlockAccount("account","config.ethereum.defaultAccount_pass")
        trContract.methods.solicitar(numberID, state).send({ from: web3.eth.defaultAccount })  //TODO: PARAMETROS
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
exports.getNecesidadByID = function (numberID) {
    let trContract = instantiateContract(address)
    return trContract.methods.getNecesidadByID(numberID).call()
}