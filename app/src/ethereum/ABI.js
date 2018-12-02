var platformABI = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "_numberID",
				"type": "uint256"
			}
		],
		"name": "getNecesidadOwner",
		"outputs": [
			{
				"name": "owner",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_numberID",
				"type": "uint256"
			}
		],
		"name": "getNecesidadByID",
		"outputs": [
			{
				"name": "info",
				"type": "string"
			},
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "provider",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_info",
				"type": "string"
			}
		],
		"name": "solicitar",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_numberID",
				"type": "uint256"
			},
			{
				"name": "_state",
				"type": "bool"
			}
		],
		"name": "validar",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_numberID",
				"type": "uint256"
			}
		],
		"name": "cubrir",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getLength",
		"outputs": [
			{
				"name": "count",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "Necesidad",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "NecesidadCubierta",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "NecesidadValidada",
		"type": "event"
	}
]

export default platformABI