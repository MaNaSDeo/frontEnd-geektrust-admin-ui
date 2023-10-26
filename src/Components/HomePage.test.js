import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage"; // Import HomePage component

test("HomePage renders correctly", () => {
  // Render the HomePage component
  render(<HomePage />);

  // Assert that the main heading "Admin UI" is present
  const mainHeading = screen.getByText("Admin UI");
  expect(mainHeading).toBeInTheDocument();
});
