import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './appfirebase/firebase.ts';
import './CreateChallengePage.css';
import { Link } from 'react-router-dom';
function CreateChallengePage() {
  const [challengeData, setChallengeData] = useState({
    challengeName: '',
    challengeGoal: '',
    description: '',
    duration: '',
    goalShort: '',
    challengeHabits: ['', '', '', ''],
    category: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChallengeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const challengesRef = collection(db, 'challengeTemplates');
      await addDoc(challengesRef, challengeData);
      console.log('Challenge added successfully');
      // Optionally, you can redirect the user to another page or display a success message.
    } catch (error) {
      console.error('Error adding challenge:', error);
      // Optionally, you can display an error message to the user.
    }
  };

  return (
    <>
    <div className="header">
    <h1 className="header-title">Creating a New Challenge</h1>
    <Link to="/" className="header-button">Go back</Link>
    </div>
    <div className="container">
      <h1>Create a New Challenge</h1>
      <form className="challenge-form" onSubmit={handleSubmit}>
        <label htmlFor="challengeName">Challenge Name:</label>
        <input
          type="text"
          id="challengeName"
          name="challengeName"
          value={challengeData.challengeName}
          onChange={handleInputChange}
          minLength="3" 
          maxLength="50"
          required 
          pattern="^[a-zA-Z\s]+$" 
          title="Please enter a valid challenge name (3-50 characters, alphabets only)"
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={challengeData.description}
          onChange={handleInputChange}
          required
          minLength="10" 
          maxLength="300"
        ></textarea>

        <label htmlFor="duration">Duration (in days):</label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={challengeData.duration}
          onChange={handleInputChange}
          min="0"
          required
          title="Please enter the number of days the challenge will last"
        />

        <label htmlFor="goalShort">Challenge Goal</label>
        <input
          type="text"
          id="goalShort"
          name="goalShort"
          value={challengeData.goalShort}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={challengeData.category}
          onChange={handleInputChange}
          required
          pattern="^(Health|Environmental|Educational|Financial)$" 
          title="Please enter a valid category (Health, Environmental, Educational, or Financial)"
        />

        <label htmlFor="challengeHabits">Challenge Habits:</label>
        <div className="challenge-habits">
          {challengeData.challengeHabits.map((habit, index) => (
            <input
              key={index}
              type="text"
              value={habit}
              onChange={(e) => {
                const updatedHabits = [...challengeData.challengeHabits];
                updatedHabits[index] = e.target.value;
                setChallengeData((prevData) => ({
                  ...prevData,
                  challengeHabits: updatedHabits,
                }));
              }}
              required
              pattern="^[a-zA-Z\s]+$" 
              title="Please enter up to 4 daily habits per challenge"
            />
          ))}
        </div>

        <button type="submit">Create Challenge</button>
      </form>
    </div>
    </>
  );
}

export default CreateChallengePage;
