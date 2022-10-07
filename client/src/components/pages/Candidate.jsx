import React from "react";
import classes from "../styles/Candidate.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEth } from "../../contexts/EthContext";
import { useEffect, useState } from "react";
function Candidate() {
  const {
    // eslint-disable-next-line
    state: { contract, accounts, web3 },
  } = useEth();
  const [numberOfCandidates, setNumberOfCandidates] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [candidate, setCandidate] = useState({});
  const [change, setChange] = useState(false);
  const [NID, setNID] = useState("");
  const [LOGO, setLOGO] = useState("");
  const [count, setCount] = useState(0);
  useEffect(() => {
    const subscribe = async () => {
      await contract.events.candidateAdded((error, event) => {
        if (error) {
          console.log(error);
        } else {
          // console.log(event);
        }
        setChange(!change);
      });
    };
    const getCurrentData = async () => {
      const _numberOfCandidates = await contract.methods
        .candidatesCount()
        .call();
      setNumberOfCandidates(_numberOfCandidates);

      const _candidates = [];
      for (let i = 0; i < _numberOfCandidates; i++) {
        const _candidate = {
          address: "",
          NID: "",
          LOGO: "",
          voteCount: 0,
        };
        const _candidate_address = await contract.methods
          .candidateList(i)
          .call();
        _candidate.address = _candidate_address;
        const data = await contract.methods
          .candidates(_candidate_address)
          .call();
        //console.log(data);
        _candidate.NID = data.id;
        _candidate.LOGO = data.logo;
        _candidate.voteCount = await contract.methods
          .VotesToCandidate(_candidate_address)
          .call();

        _candidates.push(_candidate);
      }
      console.log(_candidates);
      setCandidates(_candidates);
      setCandidate(_candidates[count]);
    };
    if (contract) {
      getCurrentData();
      subscribe();
    }
  }, [contract, change, count]);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await contract.methods
        .addCandidate(NID, LOGO)
        .send({ from: accounts[0], value: web3.utils.toWei("0.1", "ether") });
    } catch (err) {
      console.log(err);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    setCount(count + 1);
    if (count < numberOfCandidates - 1) {
      setCandidate(candidates[count]);
    }
    if (count > numberOfCandidates) {
      setCount(0);
      setCandidate(candidates[count]);
    }
  };
  return (
    <div className={classes.candidate_container}>
      <Form className={classes.form}>
        <h2 className={classes.heading1}>Candidate Information</h2>
        <Form.Group className="mb-3">
          <Form.Label>National Identity Number </Form.Label>
          <Form.Control
            className={classes.input}
            type="text"
            placeholder="Enter NID"
            value={NID}
            onChange={(e) => {
              setNID(e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            We'll never share your NID with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>LOGO </Form.Label>
          <Form.Control
            className={classes.input}
            type="text"
            placeholder="Enter your LOGO"
            value={LOGO}
            onChange={(e) => {
              setLOGO(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button
          variant="outline-dark"
          type="submit"
          className={classes.button}
          onClick={handleClick}
        >
          Submit
        </Button>
      </Form>
      <div className={classes.candidates}>
        <h2 className={classes.heading2}>
          Total Candidates: {numberOfCandidates ? numberOfCandidates : 0}
        </h2>
        {numberOfCandidates ? (
          candidate ? (
            <div className={classes.candidate}>
              <h3 className={classes.heading3}>Candidate {count}</h3>
              <p className={classes.para}>Votes: {candidate.voteCount}</p>
              <p className={classes.paralebel}>NID number</p>
              <p className={classes.para}>{candidate.NID}</p>
              <p className={classes.paralebel}>Address</p>
              <p className={classes.para}>{candidate.address}</p>
              <p className={classes.paralogo}>{candidate.LOGO}</p>
            </div>
          ) : (
            "Waiting for candidates"
          )
        ) : (
          <h2>No registered candidates yet.</h2>
        )}

        <Button variant="outline-dark" type="submit" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default Candidate;
