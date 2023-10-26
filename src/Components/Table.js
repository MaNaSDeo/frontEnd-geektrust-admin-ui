// Import necessary icons and styles.
import "./Table.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DoneIcon from "@mui/icons-material/Done";
import React from "react";
import Box from "@mui/material/Box";

// Table component displays a table of user data, including options for editing and deleting users.
function Table({
  users, // Array of user data
  usersSelected, // List of selected user IDs
  allRowsSelected, // Indicates if all rows are selected
  handleMultipleRowCheckChange, // Function to handle the "Select All" checkbox
  handleEditButtonClick, // Function to handle the edit button click
  handleSaveClick, // Function to handle the save button click
  editMode, // Indicates if an edit mode is active and the user being edited
  validateEmail, // Function to validate email addresses
  handleDeleteButtonClick, // Function to handle the delete button click
  handleRowsCheckChange, // Function to handle individual row checkbox changes
  handleRowValuesChange // Function to handle changes in user data
}) {
  return (
    <Box className="table-container">
      <table className="user-table">
        <thead>
          <tr
            style={{
              height: "44px"
            }}
          >
            <th>
              <input
                type="checkbox"
                className="check-box"
                style={{ width: "16px", height: "16px" }}
                checked={allRowsSelected}
                onChange={handleMultipleRowCheckChange}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr
                style={{
                  height: "44px"
                }}
                key={user.id}
                className={
                  usersSelected.includes(user.id) ? "selected-row" : null
                }
              >
                <td>
                  <input
                    type="checkbox"
                    className="check-box"
                    style={{ width: "16px", height: "16px" }}
                    checked={usersSelected.includes(user.id)}
                    onChange={() => handleRowsCheckChange(user.id)}
                  />
                </td>
                {editMode.editStatus && editMode.userId === user.id ? (
                  <React.Fragment>
                    <td>
                      <input
                        name="name"
                        value={user.name}
                        onChange={(e) => handleRowValuesChange(e, user.id)}
                      />
                    </td>
                    <td>
                      <input
                        name="email"
                        value={user.email}
                        onChange={(e) => handleRowValuesChange(e, user.id)}
                      />
                    </td>
                    <td>
                      <select
                        name="role"
                        value={user.role}
                        onChange={(e) => handleRowValuesChange(e, user.id)}
                      >
                        <option value="member">member</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </React.Fragment>
                )}
                <td>
                  {editMode.editStatus && editMode.userId === user.id ? (
                    <button
                      className="save-button"
                      onClick={() => handleSaveClick(user.id)}
                    >
                      <DoneIcon />
                    </button>
                  ) : (
                    <button
                      className="edit-button"
                      onClick={() => handleEditButtonClick(user.id)}
                    >
                      <EditOutlinedIcon />
                    </button>
                  )}
                  <button onClick={() => handleDeleteButtonClick(user.id)}>
                    <DeleteOutlineIcon sx={{ color: "red" }} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Box>
  );
}

export default Table;
