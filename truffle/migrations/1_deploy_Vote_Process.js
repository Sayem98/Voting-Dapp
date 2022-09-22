const Voting = artifacts.require("Voting");
const AllVoter = artifacts.require("AllVoter");
module.exports = function (deployer) {
  const deploy = async () => {
    AllVoter_instance = await deployer.deploy(AllVoter);
    console.log(AllVoter_instance.address);
    let VotingInstance = await deployer.deploy(
      Voting,
      AllVoter_instance.address
    );
  };
  deploy();
  // console.log(AllVoter_instance.address);
};
