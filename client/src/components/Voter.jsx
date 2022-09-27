import React from "react";
import { useEffect } from "react";
import { useEth } from "../contexts/EthContext";
import classes from "../styles/Voter.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Voter() {
  const {
    // eslint-disable-next-line
    state: { contract, accounts, web3, voter_contract },
  } = useEth();
  const [numberOfVoters, setNumberOfVoters] = React.useState([]);

  useEffect(() => {
    const getVoterNumber = async () => {
      const numberOfVoters = await voter_contract.methods
        .numberOfVoter()
        .call();
      setNumberOfVoters(numberOfVoters);
    };

    if (voter_contract) {
      getVoterNumber();
    }
  }, [voter_contract]);
  return (
    <div className={classes.voter}>
      <h1>Number of Voters: {numberOfVoters} Persons</h1>
      <Form className={classes.form}>
        <h2 className={classes.heading1}>Voter Information</h2>
        <Form.Group className="mb-3">
          <Form.Label>National Identity Number </Form.Label>
          <Form.Control type="email" placeholder="Enter NID" />
          <Form.Text className="text-muted">
            We'll never share your NID with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Account Address </Form.Label>
          <Form.Control type="email" placeholder="Enter metamask id" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="outline-dark" type="submit" className={classes.button}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Voter;
