const {Web3} = require('web3');
const express = require('express');
const app = express();
const port = 3000;

// Connect to the local blockchain (Ganache, for example) or a testnet
const web3 = new Web3('http://localhost:7545'); // Replace with your blockchain's URL

// Import your smart contract's ABI and address
const contractABI = require('./build/contracts/NFTContract.json').abi;
const contractAddress = 'YOUR_SMART_CONTRACT_ADDRESS'; // Replace with your deployed contract address
const nftContract = new web3.eth.Contract(contractABI, contractAddress);

// Middleware to parse JSON
app.use(express.json());

// POST endpoint to mint a new NFT
app.post('/mint', async (req, res) => {
    const { toAddress, tokenURI } = req.body; // Get the recipient's address and token URI from the request body

    try {
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0]; // The account from which the minting transaction will be sent

        // Call the mint function on the smart contract
        const receipt = await nftContract.methods.mint(toAddress, tokenURI).send({ from: sender });
        
        res.status(200).json({
            message: 'NFT successfully minted!',
            transactionHash: receipt.transactionHash
        });
    } catch (error) {
        console.error('Error minting NFT:', error);
        res.status(500).json({ error: 'Minting failed' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});