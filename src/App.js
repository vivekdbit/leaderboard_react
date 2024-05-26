import React, { useState, useEffect } from 'react';
import User from './User';
import './App.css';

function App() {

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch initial list of users
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    return [
      { id: 1, name: 'Alice', age: 30, points: 25, address: '123 Main St' },
      { id: 2, name: 'Bob', age: 25, points: 20, address: '456 Elm St' },
    ]
    // try {
    //   const response = await axios.get('/api/users');
    //   setUsers(response.data);
    // } catch (error) {
    //   console.error('Error fetching users:', error);
    // }
  };

  const deleteUser = (id) => {
      setUsers(users.filter(user => user.id !== id));
      // try {
      //   await axios.delete(`/api/users/${id}`);
      //   // Fetch updated list of users after deleting a user
      //   fetchUsers();
      // } catch (error) {
      //   console.error('Error deleting user:', error);
      // }
  };

  const updateUserPoints = (id, delta) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, points: user.points + delta } : user
    ));
    // try {
    //   await axios.put(`/api/users/${id}`, { pointsDelta: delta });
    //   // Fetch updated list of users after updating user points
    //   fetchUsers();
    // } catch (error) {
    //   console.error('Error updating user points:', error);
    // }
  };

  const showUserDetails = (user) => {
    setSelectedUser(user);
  };

  const addUser = () => {
    const newUser = {
      id: users.length + 1,
      name: 'New User',
      age: 0,
      points: 0,
      address: '',
    };
    setUsers([...users, newUser]);
    // try {
    //   const newUser = { name: 'New User', age: 0, points: 0, address: '' };
    //   await axios.post('/api/users', newUser);
    //   // Fetch updated list of users after adding a new user
    //   fetchUsers();
    // } catch (error) {
    //   console.error('Error adding user:', error);
    // }
  };

  return (
    <div className="App">
      <div className="user-container">
        {users.map(user => (
          <User
            key={user.id}
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