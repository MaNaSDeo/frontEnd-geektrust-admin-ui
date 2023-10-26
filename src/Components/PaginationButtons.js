// Import necessary icons and styles.
import "./PaginationButtons.css";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// PaginationButtons component generates a list of page navigation buttons based on the provided props.
const PaginationButtons = ({
  currPageNum, // Current page number
  numberOfPages, // Total number of pages
  handleClick, // Function to handle button clicks
  handlePreviousPagesClick, // Function to handle previous pages button click
  handleCurrentPageClick, // Function to handle first page button click
  handleLastPageClick, // Function to handle last page button click
  handleNextPageClick // Function to handle next page button click
}) => {
  // Function to generate the list of page number buttons.
  const generateButtonList = () => {
    let buttonList = [];
    for (let pageNum = 1; pageNum <= numberOfPages; pageNum++) {
      buttonList.push(
        <button
          key={pageNum}
          onClick={(e) => {
            handleClick(e.target.innerText);
          }}
          className={currPageNum === pageNum ? "button-current-page" : null}
        >
          {pageNum}
        </button>
      );
    }
    return buttonList;
  };

  return (
    <div className="pagination-button-container">
      <button
        onClick={handleCurrentPageClick}
        className={currPageNum === 1 ? "button-disabled" : null}
      >
        <FirstPageIcon />
      </button>
      <button
        onClick={handlePreviousPagesClick}
        className={currPageNum === 1 ? "button-disabled" : null}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
      </button>
      {generateButtonList()}
      <button
        onClick={handleNextPageClick}
        className={currPageNum === numberOfPages ? "button-disabled" : null}
      >
        <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
      </button>
      <button
        onClick={handleLastPageClick}
        className={currPageNum === numberOfPages ? "button-disabled" : null}
      >
        <LastPageIcon />
      </button>
    </div>
  );
};

export default PaginationButtons;
