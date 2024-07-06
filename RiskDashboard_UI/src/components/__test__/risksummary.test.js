import React from "react";
import { render, fireEvent } from "@testing-library/react";
import RiskSummary from "../RiskSummary";

test("check if click on Open Risks navigate to OpenRisks component", () => {
  const riskDetails = {
    totalRisk: 100,
    openRisk: 20,
    closedRisk: 30,
    awaitingApproval: 10,
    inProgress: 20,
  };

  const { getByText } = render(
    <RiskSummary riskDetails={riskDetails} riskSummaryChild={jest.fn()} />
  );
  const openRisksElement = getByText("Open Risks");
  fireEvent.click(openRisksElement);

  expect(openRisksElement).toBeInTheDocument();
});

test("check if click on Closed Risks navigate to ClosedRisks component", () => {
  const riskDetails = {
    totalRisk: 100,
    openRisk: 20,
    closedRisk: 30,
    awaitingApproval: 10,
    inProgress: 20,
  };

  const { getByText } = render(
    <RiskSummary riskDetails={riskDetails} riskSummaryChild={jest.fn()} />
  );
  const closedRisksElement = getByText("Closed Risks");
  fireEvent.click(closedRisksElement);

  expect(closedRisksElement).toBeInTheDocument();
});

test("check if click on Awaiting Approval navigate to AwaitingApprovalRisks component", () => {
  const riskDetails = {
    totalRisk: 100,
    openRisk: 20,
    closedRisk: 30,
    awaitingApproval: 10,
    inProgress: 20,
  };

  const { getByText } = render(
    <RiskSummary riskDetails={riskDetails} riskSummaryChild={jest.fn()} />
  );
  const awaitingApprovalElement = getByText("Awaiting Approval");
  fireEvent.click(awaitingApprovalElement);

  expect(awaitingApprovalElement).toBeInTheDocument();
});

test("check if click on Work In Progress navigate to WorkInProgressRisks component", () => {
  const riskDetails = {
    totalRisk: 100,
    openRisk: 20,
    closedRisk: 30,
    awaitingApproval: 10,
    inProgress: 20,
  };

  const { getByText } = render(
    <RiskSummary riskDetails={riskDetails} riskSummaryChild={jest.fn()} />
  );
  const workInProgressElement = getByText("Work In Progress");
  fireEvent.click(workInProgressElement);

  expect(workInProgressElement).toBeInTheDocument();
}); 

test('check if the percentage value is present', () => {
    const riskDetails = {
       totalRisk: 100,
       openRisk: 20,
       closedRisk: 30,
       awaitingApproval: 10,
       inProgress: 20,
    };
   
    const { getByTestId } = render(<RiskSummary riskDetails={riskDetails} riskSummaryChild={jest.fn()} />);
    const percentageElement = getByTestId('open-risks-cal');
   
    expect(percentageElement).toHaveTextContent('20.0 %');
   });