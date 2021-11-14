const { expect } = require("chai");
const { ethers } = require("hardhat");

/** 
 * @NOTE YOU SHOULD CHECK HARDHAT DOCUMENTATION FOR MORE INFORMATION ABOUT TESTING
*/


describe("Logic testing ", function () {

  let proxy, strg, logic, instance;

  beforeEach(async function() {

    const Proxy = await hre.ethers.getContractFactory("FactoryProxy");
    const Storage = await hre.ethers.getContractFactory("FactoryStorage");
    const Logic = await hre.ethers.getContractFactory("Factory");

    async function getProxy() {
      let proxy = await Proxy.deploy()
      await proxy.deployed()
      return proxy
    }
    proxy = await getProxy()
    
    async function getStrg() {
      let strg = await Storage.deploy("0x8B94fb5F6003656cD07A3C8f466E70D52248Ea8D")
      await strg.deployed()
      return strg
    }
    strg = await getStrg()
    
    async function getLogic() {
      let logic = await Logic.deploy()
      await logic.deployed()
      return logic
    }
    logic = await getLogic()

    await proxy.setLogicContract(logic.address)
    instance = await Logic.attach(proxy.address)
    await instance.initialize("metadata go here","owners uri go here", strg.address)
    await strg.setNewContractAdmin(instance.address)

  });
  
  
  it("Should initialize correctly", async function () {

    expect(await proxy.implementation()).to.equal(logic.address)
    expect(await instance.uri(0)).to.equal("metadata go here")

  });

  it("some other test goes here", async function () {

  });

});
