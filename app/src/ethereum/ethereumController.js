import Web3 from 'web3';
import { get } from 'https';

/* ABI + ADDRESS */
export var ABI = require('./ABI.js').default
export var address = '0xb8d4b1a6f55d766310641637996b59fbc4479441'

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

// Default account settings
export var getDefaultAccount = async function () {
    const accounts = await web3.eth.getAccounts()
    web3.eth.defaultAccount = accounts[0]
    console.log("Default account: " + web3.eth.defaultAccount)

    const balance = await web3.eth.getBalance(web3.eth.defaultAccount)
    console.log("Balance:", web3.utils.fromWei(balance, "ether"), "eth")
    return web3.eth.defaultAccount
}
export var defaultAccount = getDefaultAccount()
console.log(defaultAccount)
console.log("WHY IS PROMISE?") //TODO: 

/**
 * @function solicitar
 * @param 
 * @description 
 * @returns {Promise}
 */
export var solicitar = function (info) {
    var thePromise = new Promise((resolve, reject) => {
        if (contract === undefined)
            resolve("You must instantiate the contract.")
        else {
            console.log(defaultAccount) //TODO: defaultAccount is promise
            //web3.eth.personal.unlockAccount("account","config.ethereum.defaultAccount_pass")
            contract.methods.solicitar(info).send({ from: defaultAccount, gas: 900000 })
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
    return thePromise
}


export var solicitarAsync = async function (info) {
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
export var cubrir = function (numberID) {
    let thePromise = new Promise((resolve, reject) => {

        //web3.eth.personal.unlockAccount("account","config.ethereum.defaultAccount_pass")
        contract.methods.cubrir(numberID).send({ from: defaultAccount, gas: 900000 })  //TODO: PARAMETROS
            .then(res => {
                // will be fired once the receipt its mined
                //logger.info(`Tx registered in Ethereum: ${res.transactionHash}`)
                resolve(res.transactionHash)
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
export var validar = function (numberID, state) {
    let thePromise = new Promise((resolve, reject) => {

        //web3.eth.personal.unlockAccount("account","config.ethereum.defaultAccount_pass")
        contract.methods.validar(numberID, state).send({ from: defaultAccount, gas: 900000 })
            .then(res => {
                // will be fired once the receipt its mined
                //logger.info(`Tx registered in Ethereum: ${res.transactionHash}`)
                resolve(res.transactionHash)
            })
            .catch(err => {
                //logger.error(err.message)
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
export var getNecesidadByID = async function (numberID) {
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
    console.log(length)
    for (var i = 0; i < length; i++) {
        var result = await contract.methods.getNecesidadByID(i).call()
        console.log(result)
    }
}



/**
 * @function getAllSolicitudes
 * @description
 * @returns
 */
export var getAllSolicitudesByAddress = async function (address) {
    var length = await contract.methods.getLength().call()
    console.log(length)
    for (var i = 0; i < length; i++) {
        var result = await contract.methods.getNecesidadByID(i).call()
        if (result.owner === address) console.log(result)
    }
}

