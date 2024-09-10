module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Port (default: none)
      network_id: "*",       // Any network (default: none)
      gas: 6721975,
      gasPrice: 20000000000
    },
  },

  compilers: {
    solc: {
      version: "0.8.21",    // Specify the version of Solidity compiler
    },
  },
};