// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contracts to deploy

  const Proxy = await hre.ethers.getContractFactory("FactoryProxy");
  const proxy_address = "0xF042c83377d389bDfB0EC3254D23224C24c04371";
  const proxy = await Proxy.attach(proxy_address);

  const Logic = await hre.ethers.getContractFactory("Factory");

  const instance = await Logic.attach(proxy_address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });