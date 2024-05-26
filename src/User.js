import React, { useState } from 'react';
import './User.css';

function User({ user, deleteUser, updateUserPoints }) {

    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="user">
            <button onClick={() => deleteUser(user._id)}>x</button>
            <span onClick={toggleDetails}>{user.name}</span>
            <button onClick={() => updateUserPoints(user._id, 1)}>+</button>
            <button onClick={() => updateUserPoints(user._id, -1)}>-</button>
            <span>{user.score} Points</span>
            {showDetails && (
            <div className="user-details">
                <p>Name: {user.name}</p>
                <p>Age: {user.age}</p>
                <p>Points: {user.score}</p>
                <p>Address: {user.address}</p>
            </div>
            )}
        </div>
    );
}

export default User;
