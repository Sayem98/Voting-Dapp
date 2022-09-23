const Voting = artifacts.require("Voting");
const AllvoterAddress = "0x30980234cEa6E7570c0089938Ef320633C22611d";
module.exports = function (deployer) {
  console.log("Deploying Voting");
  deployer.deploy(Voting, AllvoterAddress);
};
