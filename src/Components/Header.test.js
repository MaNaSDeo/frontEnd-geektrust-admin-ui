import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header"; // Import Header component

test("Header renders correctly", () => {
  // Render the Header component
  render(<Header />);

  // Assert that the main heading "Admin UI" is present
  const mainHeading = screen.getByText("Admin UI");
  expect(mainHeading).toBeInTheDocument();
});
