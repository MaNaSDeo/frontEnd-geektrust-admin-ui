// Import necessary modules and components.
import "./HomePage.css";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Table from "./Table";
import PaginationButtons from "./PaginationButtons";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Box, CircularProgress, Typography } from "@mui/material";

function HomePage() {
  // Initialize state variables to manage user data, search, loading, edit mode, and more.
  const [users, setUsers] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [allRowsSelected, setAllRowsSelected] = useState(false);
  const [loading, setLoadingSpinner] = useState(false);
  const [editMode, setEditMode] = useState({
    editStatus: false,
    userId: null
  });
  const { enqueueSnackbar } = useSnackbar();
  const [cannotFetch, setCannotFetch] = useState(false);
  const [usersSelected, setUsersSelected] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  // Calculate the total number of pages required for pagination.
  let totalPages = Math.ceil(users.length / 10);

  // Function to make an API call to fetch user data.
  const fetchUsers = async () => {
    setLoadingSpinner(true);
    let response;
    try {
      response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setLoadingSpinner(false);
    } catch (error) {
      setLoadingSpinner(false);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
    const resJSON = response.data;
    console.log(resJSON);
    return resJSON;
  };

  // Function to filter user data by name, email, or role.
  const getUsersByNameEmailRole = (searchKey) => {
    let filteredUserList = users.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchKey.toLowerCase()) ||
        user.email.toLowerCase().includes(searchKey.toLowerCase()) ||
        user.role.toLowerCase().includes(searchKey.toLowerCase())
      );
    });
    totalPages = Math.ceil(filteredUserList.length / 10);
    return filteredUserList;
  };

  // Function to handle the change in checkboxes for individual rows.
  const handleRowsCheckChange = (userId) => {
    let usersSelectedCopy = [...usersSelected];
    if (usersSelected.includes(userId)) {
      usersSelectedCopy = usersSelectedCopy.filter((val) => val !== userId);
    } else {
      usersSelectedCopy.push(userId);
    }
    setUsersSelected(usersSelectedCopy);
  };

  // Function to handle the change in the checkbox in the header for selecting all users.
  const handleMultipleRowCheckChange = () => {
    let usersList = [];
    if (!allRowsSelected) {
      currentPageUserList.forEach((val) => {
        usersList.push(val.id);
      });
      console.log(usersList);
      setUsersSelected(usersList);
      setAllRowsSelected(true);
    } else {
      setUsersSelected(usersList);
      setAllRowsSelected(false);
    }
  };

  // Function to update user data when properties are changed.
  const updateUserData = (e, userId) => {
    let usersCopy = JSON.parse(JSON.stringify(users));
    for (let i = 0; i < usersCopy.length; i++) {
      if (usersCopy[i].id === userId) {
        usersCopy[i][e.target.name] = e.target.value;
      }
    }
    setUsers(usersCopy);
  };

  // Function to delete all selected users.
  const deleteUsers = () => {
    let usersCopy = [...users];
    usersCopy = usersCopy.filter((val) => !usersSelected.includes(val.id));
    setUsers(usersCopy);
    setUsersSelected([]);
    setAllRowsSelected(false);
    enqueueSnackbar("Selected users' data deleted successfully", {
      variant: "success"
    });
  };

  // Function to delete a user by their ID.
  const deleteUser = (userId) => {
    let usersList = users.filter((val) => val.id !== userId);
    setUsers(usersList);
    enqueueSnackbar("Deleted user's data successfully", { variant: "success" });
  };

  // Function to validate user data when editing.
  function userDataValidation(userId) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === userId) {
        if (
          users[i].name === "" ||
          users[i].email === "" ||
          !validateEmail(users[i].email)
        ) {
          if (users[i].name === "") alert("Name cannot be empty");
          if (users[i].email === "") alert("Email cannot be empty");
          return false;
        }
        break;
      }
    }
    return true;
  }

  // Function to validate an email address.
  function validateEmail(email) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat))
      alert("Enter a valid email id. Ex: 'example@xmail.com'");
    return email.match(mailformat);
  }

  // Handler function for the previous page number.
  const handlePreviousPagesClick = () => {
    if (currentPageNumber > 1) {
      setCurrentPageNumber(currentPageNumber - 1);
    }
  };

  // Function to get the list of users for the current page.
  const getCurrentPageUserList = (userList) => {
    let currentPageUserList = [];
    let topUserIndex = (currentPageNumber - 1) * 10;
    let bottomUserIndex =
      topUserIndex + 9 <= userList.length - 1
        ? topUserIndex + 9
        : userList.length - 1;
    currentPageUserList = userList.slice(topUserIndex, bottomUserIndex + 1);

    if (currentPageUserList.length === 0 && currentPageNumber !== 1) {
      handlePreviousPagesClick();
    }
    return currentPageUserList;
  };

  // Variable containing the current page's user list.
  const currentPageUserList =
    searchString === ""
      ? getCurrentPageUserList(users)
      : getCurrentPageUserList(getUsersByNameEmailRole(searchString));

  // Handler function for the next page number.
  const handleNextPageClick = () => {
    if (currentPageNumber < totalPages) {
      setCurrentPageNumber(currentPageNumber + 1);
    }
  };

  useEffect(() => {
    console.log("Current page number " + currentPageNumber);
    setUsersSelected([]);
    setAllRowsSelected(false);
  }, [currentPageNumber]);

  useEffect(() => {
    fetchUsers()
      .then((response) => {
        setUsers(response);
        setCannotFetch(false);
      })
      .catch((error) => {
        console.log(error.message);
        setCannotFetch(true);
        enqueueSnackbar("Cannot fetch data at the moment", {
          variant: "error"
        });
      });
  }, []);

  if (cannotFetch) {
    return (
      <>
        <Header />
        <div>
          <h5>
            Oops! Cannot fetch data at the moment. Try refreshing the app or try
            again after some time.
          </h5>
        </div>
      </>
    );
  }

  return (
    <React.Fragment>
      <Header />
      <Box className="search-bar-container">
        <Box className="search-bar">
          <input
            type="search"
            placeholder="Search by name, email or role"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
        </Box>
      </Box>
      {loading ? (
        <Box className="loading">
          <CircularProgress />
          <Typography variant="h5">Loading Users</Typography>
        </Box>
      ) : (
        <Table
          users={currentPageUserList}
          usersSelected={usersSelected}
          allRowsSelected={allRowsSelected}
          handleMultipleRowCheckChange={handleMultipleRowCheckChange}
          handleEditButtonClick={(userId) =>
            setEditMode({ editStatus: true, userId })
          }
          handleSaveClick={(userId) => {
            let isUserDataValid = userDataValidation(userId);
            if (isUserDataValid) {
              setEditMode({
                editStatus: false,
                userId: null
              });
            }
            enqueueSnackbar("User data saved successfully", {
              variant: "success"
            });
          }}
          editMode={editMode}
          validateEmail={validateEmail}
          handleDeleteButtonClick={(userId) => deleteUser(userId)}
          handleRowsCheckChange={(userId) => handleRowsCheckChange(userId)}
          handleRowValuesChange={(e, userId) => updateUserData(e, userId)}
        />
      )}
      <div className="deleteBtn-pagination-container">
        <button className="delete-selected-btn" onClick={deleteUsers}>
          Delete Selected
        </button>
        <PaginationButtons
          currPageNum={currentPageNumber}
          numberOfPages={totalPages}
          handleClick={(num) => setCurrentPageNumber(Number(num))}
          handlePreviousPagesClick={handlePreviousPagesClick}
          handleCurrentPageClick={() => setCurrentPageNumber(1)}
          handleLastPageClick={() => setCurrentPageNumber(totalPages)}
          handleNextPageClick={handleNextPageClick}
        />
      </div>
    </React.Fragment>
  );
}

export default HomePage;
