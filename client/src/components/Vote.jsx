import React, { useState } from "react";
import classes from "../styles/Vote.module.css";
import Candidate from "./Candidate";
import { useEth } from "../contexts/EthContext";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
function Vote() {
  const {
    // eslint-disable-next-line
    state: { contract, accounts },
  } = useEth();
  const [candidates, setCandidates] = useState([]);
  const [isStarted, setIsStarted] = React.useState(false);
  const [err, setErr] = React.useState();
  const [NID, setNID] = React.useState();
  // eslint-disable-next-line
  const [account, setAccount] = React.useState();
  const [change, setChange] = useState(false);
  useEffect(() => {
    const subscribe = async () => {
      await contract.events.VotingStartedEvent((error, event) => {
        setChange(!change);
      });
    };
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

    const getNID = async () => {
      const NID = await contract.methods.voters(accounts[0]).call({
        from: accounts[0],
      });
      console.log(NID.id);
      setNID(NID.id);
    };
    if (accounts) {
      subscribe();
      setAccount(accounts[0]);
    }

    const isStarted = async () => {
      try {
        const _isStarted = await contract.methods.isVotingStarted().call();
        console.log(_isStarted);
        setIsStarted(_isStarted);
      } catch (err) {
        console.log(err);
      }
    };
    if (contract && accounts) {
      getNID();
    }
    if (contract) {
      getCandidates();
      isStarted();
    }
  }, [contract, accounts, account, change]);
  const handleClick = async () => {
    if (contract) {
      try {
        await contract.methods.startVoting().send({ from: accounts[0] });
      } catch (err) {
        console.log(err);
        setErr(err.message);
      }
    }
  };
  return (
    <div className={classes.vote}>
      <p>{NID !== "" ? "NID:" + NID : "Not a Voter Yet"}</p>
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

      <div className={classes.candidates}>
        {candidates.map((candidate, index) => (
          <Candidate candidate={candidate} NID={NID} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Vote;
