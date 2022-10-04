import React from "react";
import classes from "../styles/Vote.module.css";
import Button from "react-bootstrap/Button";
import { useEth } from "../../contexts/EthContext";
import { useEffect, useState } from "react";
function Vote() {
  const {
    // eslint-disable-next-line
    state: { contract, accounts, web3 },
  } = useEth();
  const [isStarted, setIsStarted] = React.useState(false);
  const [err, setErr] = React.useState();
  const [NID, setNID] = React.useState();
  const [candidate, setCandidate] = useState();
  // eslint-disable-next-line
  const [account, setAccount] = React.useState();
  const [change, setChange] = useState(false);

  useEffect(() => {
    const subscribe = async () => {
      await contract.events.VotingStartedEvent((error, event) => {
        setChange(!change);
      });
      await contract.events.VoteEvent((error, event) => {
        if (error) {
          console.log(error);
        } else {
          console.log(event);
        }
        setChange(!change);
      });
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
  const handleVoteClick = async () => {
    if (contract) {
      try {
        const result = await contract.methods
          .Vote(candidate, NID)
          .send({ from: accounts[0] });
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className={classes.container_vote}>
      <div className={classes.vote_container}>
        <h1>Vote</h1>
        <h3>Address</h3>
        <p>{accounts ? accounts[0] : "Wating"}</p>
        <h3>NID No:</h3>
        <p>{NID ? NID : "Not a voter yet."}</p>

        <input
          type="text"
          placeholder="Enter Candidate Address"
          value={candidate}
          onChange={(e) => {
            setCandidate(e.target.value);
          }}
        />

        <Button
          variant="outline-success"
          className={classes.button}
          onClick={handleVoteClick}
        >
          Cast Vote
        </Button>
      </div>

      <div className={classes.votted_container}>
        {isStarted ? (
          <p>Voting Started</p>
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
      </div>
    </div>
  );
}

export default Vote;
