const Voting = artifacts.require("Voting");
const AllVoters = artifacts.require("AllVoter");
const AllvoterAddress = "0x30980234cEa6E7570c0089938Ef320633C22611d";
module.exports = function (deployer) {
  const AllVoterAddress = AllVoters.address;
  console.log("Deploying Voting");
  console.log("AllVoterAddress: ", AllVoterAddress);
  
  deployer.deploy(Voting, AllvoterAddress);
};
