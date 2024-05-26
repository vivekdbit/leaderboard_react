import React, { useState } from 'react';
import './User.css';

function User({ user, deleteUser, updateUserPoints }) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="user">
      <button onClick={() => deleteUser(user.id)}>x</button>
      <span onClick={toggleDetails}>{user.name}</span>
      <button onClick={() => updateUserPoints(user.id, 1)}>+</button>
      <button onClick={() => updateUserPoints(user.id, -1)}>-</button>
      <span>{user.points} Points</span>
      {showDetails && (
        <div className="user-details">
          <p>Name: {user.name}</p>
          <p>Age: {user.age}</p>
          <p>Points: {user.points}</p>
          <p>Address: {user.address}</p>
        </div>
      )}
    </div>
  );
}

export default User;
