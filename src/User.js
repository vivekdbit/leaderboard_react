import React, { useState, useCallback } from 'react';
import './User.css';
import { debounce } from './utils';

function User({ user, deleteUser, updateUserPoints }) {

    const [showDetails, setShowDetails] = useState(false);
    const [scoreChange, setScoreChange] = useState(0);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const handleScoreChange = (delta) => {
        setScoreChange(prevScoreChange => prevScoreChange + delta);
        console.log(`${user._id} - Handling score change: ${delta}, accumulated score: ${scoreChange + delta}`);
        const totalDelta = scoreChange + delta;
        const userId = user._id;
        debounceUpdateUserPoints({userId, totalDelta});
    };
    
   // Define the debounced function using useCallback
    const debounceUpdateUserPoints = useCallback(
        debounce((updates) => {
            const totalDelta = updates[updates.length - 1].totalDelta;
            const userId = updates[0].userId;
            console.log(`Sending update to server: user_id=${userId}, totalDelta=${totalDelta}`);
            updateUserPoints(userId, totalDelta)
            .then(() => {
                // Reset scoreChange after successful update
                setScoreChange(0);
            })
            .catch(error => {
                console.error('Error updating user points:', error);
            });
        }, 500),
        [updateUserPoints]
    );

    return (
        <div className="user">
            <button onClick={() => deleteUser(user._id)}>x</button>
            <span onClick={toggleDetails}>{user.name}</span>
            <button onClick={() => handleScoreChange(1)}>+</button>
            <button onClick={() => handleScoreChange(-1)}>-</button>
            <span>{user.score + scoreChange} Points</span>
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
