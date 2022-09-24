import React from "react";
import classes from "../styles/Accounts.module.css";
import { useEth } from "../contexts/EthContext";
import { useEffect, useState } from "react";
function Accounts() {
  const {
    state: { contract, accounts, web3 },
  } = useEth();
  const [balance, setBalance] = useState();
  const [isCandidate, setIsCandidate] = useState(false);
  const [NID, setNID] = useState();
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

    const getVoterId = async () => {
      //const _NID = await contract.methods.getNID().call();
      setNID(1122334455);
    };

    

    if (accounts) {
      getBalance();
    }
    if (contract) {
      getCandidates();
      getVoterId();
    }
  });
  return (
    <div className={classes.accounts}>
      <h2>Address</h2>
      <p>{accounts ? accounts[0] : "Waiting"}</p>
      <h3>Balance: {balance ? balance + " ETH" : "Waiting"}</h3>
      <h2>Voter ID: {NID ? NID : "Wating"}</h2>
      <h3>Candidate: {isCandidate ? "YES" : "NO"}</h3>
      <h3>Voted: Yes</h3>
    </div>
  );
}

export default Accounts;
