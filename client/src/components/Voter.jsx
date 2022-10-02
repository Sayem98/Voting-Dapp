import React from "react";
import { useEffect } from "react";
import { useEth } from "../contexts/EthContext";
import classes from "../styles/Voter.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
function Voter() {
  const {
    // eslint-disable-next-line
    state: { contract, accounts },
  } = useEth();
  const [numberOfVoters, setNumberOfVoters] = React.useState([]);
  const [change, setChange] = React.useState(false);
  const [NID, setNID] = React.useState("");
  const [address, setAddress] = React.useState("");

  useEffect(() => {
    const getVoterNumber = async () => {
      const numberOfVoters = await contract.methods.numberOfVoter().call();
      setNumberOfVoters(numberOfVoters);
    };

    if (contract) {
      getVoterNumber();
    }
  }, [contract, change]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await contract.methods.addVoter(address, NID).send({ from: accounts[0] });
      setChange(!change);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.voter}>
      <h1>Number of Voters: {numberOfVoters} Persons</h1>
      <Form className={classes.form}>
        <h2 className={classes.heading1}>Voter Information</h2>
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
          <Form.Label>Account Address </Form.Label>
          <Form.Control
            className={classes.input}
            type="text"
            placeholder="Enter metamask id"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
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
    </div>
  );
}

export default Voter;
