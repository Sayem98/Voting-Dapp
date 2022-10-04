import React from "react";
import classes from "../styles/Voter.module.css";
import modi from "../images/modiji.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEth } from "../../contexts/EthContext";
import { useEffect } from "react";

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
      const _numberOfVoters = await contract.methods.numberOfVoter().call();
      setNumberOfVoters(_numberOfVoters);
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
    <>
      <div className={classes.voter_container}>
        <div className={classes.new_voter}>
          <img src={modi} alt="voter" className={classes.modi} />

          <Form className={classes.form}>
            <h3>Number of Voters: {numberOfVoters} Persons</h3>
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
      </div>
    </>
  );
}

export default Voter;
