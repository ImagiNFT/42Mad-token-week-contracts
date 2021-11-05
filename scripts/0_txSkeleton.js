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
  const proxy_address = "0x415C8EbF910264bb06937C2CA2B9C484209669d6";
  const proxy = await Proxy.attach(proxy_address);

  const Storage = await hre.ethers.getContractFactory("FactoryStorage");
  const strg_address = "0xf9Ba2750da26923355C640BB08511Ad65d1379AB";
  const strg = await Storage.attach(strg_address);

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