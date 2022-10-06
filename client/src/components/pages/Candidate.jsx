import React from "react";
import classes from "../styles/Candidate.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
function Candidate() {
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
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Account Address </Form.Label>
          <Form.Control
            className={classes.input}
            type="text"
            placeholder="Enter metamask id"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="outline-dark" type="submit" className={classes.button}>
          Submit
        </Button>
      </Form>
      <div className={classes.candidates}>
        <h2 className={classes.heading2}>Total Candidates: 10</h2>
        <div className={classes.candidate}>
          <h3 className={classes.heading3}>Candidate 1</h3>
          <p className={classes.paralebel}>NID</p>
          <p className={classes.para}>1223345</p>
          <p className={classes.paralebel}>Address</p>
          <p className={classes.para}>0x123423453332232</p>
          <p className={classes.paralogo}>Hati</p>
        </div>
        <Button variant="outline-dark" type="submit">
          Next
        </Button>
      </div>
    </div>
  );
}

export default Candidate;
