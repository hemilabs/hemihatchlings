var NFTCollection = artifacts.require("./NFTCollection.sol");

module.exports = function(deployer) {
  deployer.deploy(NFTCollection,"URI HERE","Hemi Hatchlings","HEMIHATCH");
};
