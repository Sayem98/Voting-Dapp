import React from "react";
import classes from "../styles/Page.module.css";
// import Accounts from "./Accounts";
import Vote from "./Vote";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import Voter from "./Voter";
import CandidateSelection from "./CandidateSelection";
function Page() {
  return (
    <>
      <div className={classes.page}>
        {/* <Accounts /> */}

        <div className={classes.container}>
          <Link to="/" className={classes.heading1}>
            Voting System
          </Link>
          <ul className={classes.nav}>
            <li>
              <Link to="/voter" className={classes.navItem}>
                Voter
              </Link>
            </li>
            <li>
              <Link to="/candidate/selection" className={classes.navItem}>
                Selection
              </Link>
            </li>
          </ul>
        </div>

        <Routes>
          <Route path="/" element={<Vote />} />
          <Route path="/voter" element={<Voter />} />
          <Route path="/candidate/selection" element={<CandidateSelection />} />
        </Routes>
      </div>
    </>
  );
}

export default Page;
