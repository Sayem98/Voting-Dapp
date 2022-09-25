import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import image from "../images/man.png";
import classes from "../styles/Candidate.module.css";
import { useEth } from "../contexts/EthContext";
import { useEffect, useState } from "react";
function Candidate({ candidate, NID }) {
  const {
    // eslint-disable-next-line
    state: { contract, accounts, web3 },
  } = useEth();

  const [change, setChange] = useState(false);
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    const subscribeEvent = async () => {
      await contract.events.VoteEvent((error, event) => {
        if (error) {
          console.log(error);
        } else {
          console.log(event);
        }
        setChange(!change);
      });
    };
    const getVotes = async () => {
      const _votes = await contract.methods.myVote(candidate).call();
      console.log(_votes);
      setVotes(_votes);
    };
    if (contract) {
      subscribeEvent();
      getVotes();
    }
  }, [contract, change, accounts, candidate]);

  const handleClick = async () => {
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
    <Card style={{ width: "18rem" }} className={classes.candidate}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title className={classes.title}>{candidate}</Card.Title>
        <Card.Text>My Votes: {votes}</Card.Text>
        <Button variant="outline-dark" onClick={handleClick}>
          Vote
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Candidate;
