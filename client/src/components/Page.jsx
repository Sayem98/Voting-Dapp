import React from "react";
import classes from "../styles/Page.module.css";
// import Accounts from "./Accounts";
import Vote from "./Vote";

function Page() {
  return (
    <div className={classes.page}>
      {/* <Accounts /> */}
      <Vote />
    </div>
  );
}

export default Page;
