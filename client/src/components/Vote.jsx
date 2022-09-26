import React, { useState } from "react";
import classes from "../styles/Vote.module.css";
import Candidate from "./Candidate";
import { useEth } from "../contexts/EthContext";
import { useEffect } from "react";
function Vote() {
  const {
    // eslint-disable-next-line
    state: { contract, accounts, web3 },
  } = useEth();
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const getCandidates = async () => {
      const numberOfCandidates = await contract.methods
        .numberOfCandidates()
        .call();
      let _candidates = [];
      for (let i = 0; i < parseInt(numberOfCandidates); i++) {
        _candidates[i] = await contract.methods.candidates(i).call();
      }
      setCandidates(_candidates);
    };
    if (contract) {
      getCandidates();
    }
  }, [contract]);
  return (
    <div className={classes.vote}>
      
      <div className={classes.candidates}>
        {candidates.map((candidate, index) => (
          <Candidate candidate={candidate} NID="109" key={index} />
        ))}
      </div>
    </div>
  );
}

export default Vote;
