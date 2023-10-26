import React from "react";
import { render, screen } from "@testing-library/react";
import PaginationButtons from "./PaginationButtons"; // Import PaginationButtons component

test("PaginationButtons renders correctly", () => {
  // Render the PaginationButtons component with relevant props
  render(
    <PaginationButtons
      currPageNum={1}
      numberOfPages={5}
      handleClick={() => {}}
      handlePreviousPagesClick={() => {}}
      handleCurrentPageClick={() => {}}
      handleLastPageClick={() => {}}
      handleNextPageClick={() => {}}
    />
  );

  // Assert that the relevant buttons/icons are present
  const firstPageButton = screen.getByText("1");
  expect(firstPageButton).toBeInTheDocument();
});
