import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CustomeInput from "./CustomeInput";

describe("CustomeInput", () => {
  it("renders without crashing", () => {
    const { getByRole } = render(<CustomeInput placeholder="test" />);
    expect(getByRole("textbox")).toBeInTheDocument();
  });
  it("shows the label when the input is focused", () => {
    const { getByRole, getByText } = render(
      <CustomeInput placeholder="test" />
    );
    fireEvent.focus(getByRole("textbox"));
    expect(getByText("test")).toBeVisible();
  });

  it("hides the label when the input is not focused", () => {
    const { getByRole, queryByText } = render(
      <CustomeInput placeholder="test" />
    );
    fireEvent.blur(getByRole("textbox"));
    expect(queryByText("test")).toBeInTheDocument();
  });
  it("hides the error message when the input value is valid", () => {
    const { getByRole, queryByText } = render(
      <CustomeInput placeholder="test" rules={(value) => value.includes("@")} />
    );
    fireEvent.change(getByRole("textbox"), {
      target: { value: "test@example.com" },
    });
    fireEvent.blur(getByRole("textbox"));
    expect(queryByText("Please enter a valid email address")).toBeNull();
  });
  it("adds a custom class name when provided", () => {
    const { getByRole } = render(<CustomeInput className="form-control " />);
    expect(getByRole("textbox")).toHaveClass("form-control");
  });

  it("does not add a custom class name when not provided", () => {
    const { getByRole } = render(<CustomeInput />);
    expect(getByRole("textbox")).not.toHaveClass("form-control a");
  });

  it("adds a custom class name when provided", () => {
    const { getByRole } = render(<CustomeInput className="form-control" />);
    expect(getByRole("textbox")).toHaveClass("form-control");
  });

  it("check if type is email when secureTextEntry is false", () => {
    const { getByRole } = render(<CustomeInput secureTextEntry={false} />);
    const input = getByRole("textbox");
    expect(input).toHaveAttribute("type", "email");
  });
  it("check if type is password when secureTextEntry is true", () => {
    const { getByTestId  } = render(<CustomeInput secureTextEntry={true} />);
    const input = getByTestId("input");
    expect(input).toHaveAttribute("type", "password");
  });
  it("check if default class is applied", () => {
    const { getByRole } = render(<CustomeInput />);
    const input = getByRole("textbox");
    expect(input).toHaveClass("form-control");
  });

  it("check if className prop is not provided", () => {
    const { getByRole } = render(<CustomeInput />);
    const input = getByRole("textbox");
    expect(input).not.toHaveClass("form-control a");
  });
  it("check if class is changed on click", () => {
    const { getByRole } = render(<CustomeInput classChange="form-control" />);
    const input = getByRole("textbox");
    fireEvent.click(input);
    expect(input).toHaveClass("form-control");
  });
});
