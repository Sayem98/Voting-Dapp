import React from "react";
import classes from "../styles/Accounts.module.css";
import { useEth } from "../contexts/EthContext";
import { useEffect } from "react";
function Accounts() {
  const {
    state: { contract, accounts, web3 },
  } = useEth();
  const [balance, setBalance] = React.useState();
  const [isCandidate, setIsCandidate] = React.useState(false);
  useEffect(() => {
    const getBalance = async () => {
      let _balance = await web3.eth.getBalance(accounts[0]);
      _balance = web3.utils.fromWei(_balance, "ether");
      setBalance(_balance);
    };

    const getCandidates = async () => {
      const numberOfCandidates = await contract.methods
        .numberOfCandidates()
        .call();
      console.log(typeof numberOfCandidates);
      let candidates = [];
      for (let i = 0; i < parseInt(numberOfCandidates); i++) {
        candidates[i] = await contract.methods.candidates(i).call();
        if (accounts[0] === candidates[i]) {
          setIsCandidate(true);
        }
        console.log(candidates[i]);
      }
    };

    if (accounts) {
      getBalance();
    }
    if (contract) {
      getCandidates();
    }
  });
  return (
    <div className={classes.accounts}>
      <h2>Address</h2>
      <p>{accounts ? accounts[0] : "Waiting"}</p>
      <h3>Balance: {balance ? balance + " ETH" : "Waiting"}</h3>
      <h2>Voter ID: 1610676109</h2>
      <h3>Candidate: {isCandidate ? "YES" : "NO"}</h3>
      <h3>Voted: Yes</h3>
    </div>
  );
}

export default Accounts;
