import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Setting from "../Setting";

describe("Setting list", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<Setting />);
    const themeSetting = getByTestId("settings-trigger");
    fireEvent.click(themeSetting);
  });

  it("check if settings panel opens on click", () => {
    const { getByTestId } = render(<Setting />);
    const themeSetting = getByTestId("settings-trigger");
    fireEvent.click(themeSetting);
    const themeSettings = getByTestId("theme-settings");
    expect(themeSettings).toHaveClass("settings-panel open");
  });

  it("check if sidebar light theme is selected", () => {
    const { getByTestId } = render(<Setting />);
    const themeSetting = getByTestId("settings-trigger");
    fireEvent.click(themeSetting);
    const sidebarLightTheme = getByTestId("sidebar-light-theme");
    fireEvent.click(sidebarLightTheme);
    expect(sidebarLightTheme).toHaveClass("sidebar-bg-options");
  });

  it("check if sidebar dark theme is selected", () => {
    const { getByTestId } = render(<Setting />);
    const themeSetting = getByTestId("settings-trigger");
    fireEvent.click(themeSetting);
    const sidebarDarkTheme = getByTestId("sidebar-dark-theme");
    fireEvent.click(sidebarDarkTheme);
    expect(sidebarDarkTheme).toHaveClass("sidebar-bg-options");
  });

  it("check if close button is clicked", () => {
    const { getByTestId } = render(<Setting />);
    const themeSetting = getByTestId("settings-trigger");
    fireEvent.click(themeSetting);
    const closeButton = getByTestId("close-button");
    fireEvent.click(closeButton);
    const themeSettings = getByTestId("theme-settings");
    expect(themeSettings).toHaveClass("settings-panel");
  });
});
