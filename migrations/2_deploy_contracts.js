var ProfileCore = artifacts.require("./ProfileCore.sol");
var ProfileBase = artifacts.require("./ProfileBase.sol");

module.exports = function(deployer) {
  deployer.deploy(ProfileBase);
  deployer.link(ProfileBase, ProfileCore);
  deployer.deploy(ProfileCore);
};
