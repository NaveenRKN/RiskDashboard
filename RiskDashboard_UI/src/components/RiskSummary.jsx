import React from "react";
import PropTypes from "prop-types";

const RiskSummary = (props) => {
  const { totalRisk, openRisk, Occurred, awaitingApproval, inProgress } =
    props.riskDetails;

  const percentCalculat = (totalRisk, newRisk) => {
    let calculated = (newRisk / totalRisk) * 100;
    return calculated;
  };

  return (
    <>
      <div className="row">
        <div
          className="col-md-6  mb-2 col-md-offset-1 stretch-card transparent"
          onClick={() => props.riskSummaryChild(1)}
        >
          <div className="card card-tale">
            <div
              className="card-body"
              style={{ cursor: "pointer" }}
              data-testid="open-risks"
            >
              <p className="mb-4">Open Risks</p>
              <p className="fs-30 mb-2 text-center">{openRisk}</p>
              <p className="text-right" data-testid="open-risks-cal">
                {openRisk
                  ? percentCalculat(totalRisk, openRisk).toFixed(1)
                  : "0"}{" "}
                %{" "}
              </p>
            </div>
          </div>
        </div>
        <div
          className="col-md-6  mb-2  stretch-card transparent"
          onClick={() => props.riskSummaryChild(3)}
        >
          <div className="card card-dark-blue">
            <div className="card-body" style={{ cursor: "pointer" }}>
              <p className="mb-4">Occurred Risks</p>
              <p className="fs-30 mb-2 text-center">{Occurred}</p>
              <p className="text-right">
                {" "}
                {Occurred
                  ? percentCalculat(totalRisk, Occurred).toFixed(1)
                  : "0"}{" "}
                %
              </p>
            </div>
          </div>
        </div>
        <div
          className="col-md-6  mb-2  stretch-card transparent"
          onClick={() => props.riskSummaryChild(2)}
        >
          <div className="card card-light-blue">
            <div className="card-body" style={{ cursor: "pointer" }}>
              <p className="mb-4">Awaiting Approval</p>
              <p className="fs-30 mb-2 text-center">{awaitingApproval}</p>
              <p className="text-right">
                {awaitingApproval
                  ? percentCalculat(totalRisk, awaitingApproval).toFixed(1)
                  : "0"}{" "}
                %{" "}
              </p>
            </div>
          </div>
        </div>
        <div
          className="col-md-6  mb-2 stretch-card transparent"
          onClick={() => props.riskSummaryChild(0)}
        >
          <div className="card card-light-danger">
            <div className="card-body" style={{ cursor: "pointer" }}>
              <p className="mb-4">Work In Progress</p>
              <p className="fs-30 mb-2 text-center">{inProgress}</p>
              <p className="text-right">
                {inProgress
                  ? percentCalculat(totalRisk, inProgress).toFixed(1)
                  : "0"}{" "}
                %{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RiskSummary;
RiskSummary.propTypes = {
  totalRisk: PropTypes.any,
  openRisk: PropTypes.any,
  closedRisk: PropTypes.any,
  awaitingApproval: PropTypes.any,
  inProgress: PropTypes.any,
  data: PropTypes.any,
  setFilterRiskDataFunction: PropTypes.any,
  riskSummaryChild: PropTypes.any,
  riskDetails: PropTypes.any,
};
