import React, { useState } from "react";
import classes from "../styles/Vote.module.css";
import Candidate from "./Candidate";
import { useEth } from "../contexts/EthContext";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
function Vote() {
  const {
    // eslint-disable-next-line
    state: { contract, accounts, web3 },
  } = useEth();
  const [candidates, setCandidates] = useState([]);
  const [isStarted, setIsStarted] = React.useState(false);
  const [err, setErr] = React.useState();

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

    const isStarted = async () => {
      try {
        const _isStarted = await contract.methods.isVotingStarted().call();
        console.log(_isStarted);
        setIsStarted(_isStarted);
      } catch (err) {
        console.log(err);
      }
    };
    if (contract) {
      getCandidates();
      isStarted();
    }
  }, [contract]);
  const handleClick = async () => {
    if (contract) {
      try {
        await contract.methods.startVoting().send({ from: accounts[0] });
      } catch (err) {
        console.log(err);
        setErr("Only admin can start vote");
      }
    }
  };
  return (
    <div className={classes.vote}>
      {isStarted ? (
        <p>Started</p>
      ) : (
        <>
          <Button
            variant="outline-dark"
            onClick={handleClick}
            className={classes.click}
          >
            Start Vote
          </Button>
          {err ? <p className={classes.err}>{err}</p> : null}
        </>
      )}

      <h2 className={classes.heading2}>Candidates</h2>

      <div className={classes.candidates}>
        {candidates.map((candidate, index) => (
          <Candidate candidate={candidate} NID="109" key={index} />
        ))}
      </div>
    </div>
  );
}

export default Vote;
