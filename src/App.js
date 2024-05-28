import React, { useState, useEffect } from 'react';
import User from './User';
import './App.css';
import axios from 'axios';

// Define API URL constant
const API_URL = 'http://127.0.0.1:5000';

// Define authentication credentials
const AUTH_CREDENTIALS = {
  username: 'admin',
  password: 'password'
};

function App() {

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch initial list of users
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/users`, {
        auth: AUTH_CREDENTIALS
      });
      setUsers(response.data.data); // Assuming users are in response.data.data
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/v1/users/${id}`, {
        auth: AUTH_CREDENTIALS
      });
      // Fetch updated list of users after deleting a user
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const updateUserPoints = async (id, delta) => {
    try {
      await axios.post(`${API_URL}/api/v1/users/score`, { user_id: id, score: delta }, {
        auth: AUTH_CREDENTIALS
      });
      // Fetch updated list of users after updating user points
      fetchUsers();
    } catch (error) {
      console.error('Error updating user points:', error);
    }
  };

  const showUserDetails = (user) => {
    setSelectedUser(user);
  };

  const addUser = async () => {
    try {
      const newUser = {};
      await axios.post(`${API_URL}/api/v1/users`, newUser, {
        auth: AUTH_CREDENTIALS
      });
      // Fetch updated list of users after adding a new user
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="App">
      <div className="user-container">
        {users.map(user => (
          <User
            key={user._id}
            user={user}
            deleteUser={deleteUser}
            updateUserPoints={updateUserPoints}
            showUserDetails={showUserDetails}
          />
        ))}
      </div>
      <button onClick={addUser} className="add-user-button">Add User</button>
      {selectedUser && (
        <div className="user-details">
        </div>
      )}
    </div>
  );
}

export default App;