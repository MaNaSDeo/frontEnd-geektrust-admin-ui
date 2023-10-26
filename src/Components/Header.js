// Import necessary modules and components.
import "./Header.css";
import { Box, Typography } from "@mui/material";

// Header component displays the application title and provides a refresh option.
const Header = () => {
  // Function to refresh the page and restore its content when the title is clicked.
  const refreshPage = () => {
    window.location.reload(false);
  };

  return (
    <>
      <Box
        className="heading-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Typography
          className="main-heading"
          variant="span"
          onClick={refreshPage}
        >
          Admin UI
        </Typography>
      </Box>
    </>
  );
};

export default Header;
