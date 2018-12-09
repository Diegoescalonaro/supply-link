var platformABI = [
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
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "info",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "owner",
				"type": "address"
			}
		],
		"name": "NuevaSolicitud",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "info",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "from",
				"type": "address"
			}
		],
		"name": "SolicitudCubierta",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "info",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "status",
				"type": "bool"
			}
		],
		"name": "SolicitudValidada",
		"type": "event"
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
				"name": "id",
				"type": "uint256"
			},
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
	}
]

export default platformABI