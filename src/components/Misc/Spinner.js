import React from "react";
import { Spinner } from "reactstrap";

const SpinnerLoader = ({ showSpinner, adminView }) => {
  return (
    <>
      {showSpinner && (
        <div className="spinner-container">
          <div className={adminView ? "spinner-admin" : "spinner"}>
            <Spinner />
          </div>
        </div>
      )}
    </>
  );
};

export default SpinnerLoader;
