import React from "react";
import classes from "../styles/Page.module.css";
// import Accounts from "./Accounts";
import Button from "react-bootstrap/Button";
import Vote from "./Vote";
import { useEth } from "../contexts/EthContext";
import { useEffect } from "react";
function Page() {
  const {
    // eslint-disable-next-line
    state: { contract, accounts, web3 },
  } = useEth();
  const [isStarted, setIsStarted] = React.useState(false);
  const [err, setErr] = React.useState();
  useEffect(() => {
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
      isStarted();
    }
  }, [contract, accounts, web3, isStarted]);
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
    <div className={classes.page}>
      {/* <Accounts /> */}

      <div className={classes.container}>
        <h2 className={classes.heading1}>Voting System</h2>
        <ul className={classes.nav}>
          <li className={classes.navItem} href="">
            Voter
          </li>
          <li className={classes.navItem} href="">
            Candidate Selection
          </li>
        </ul>
      </div>
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
      <Vote />
    </div>
  );
}

export default Page;
