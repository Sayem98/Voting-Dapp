const AllVoter = artifacts.require("AllVoter");
module.exports = function (deployer) {
  console.log("Deploying All-Voters");
  deployer.deploy(AllVoter);
};
