import React from "react";
import { Spinner } from "reactstrap";

const SpinnerLoader = ({ showSpinner }) => {
  return (
    <>
      {showSpinner && (
        <div className="spinner-container">
          <div className="spinner">
            <Spinner />
          </div>
        </div>
      )}
    </>
  );
};

export default SpinnerLoader;
