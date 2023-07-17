import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage, ref } from '../src/appfirebase/firebase.ts'; 
import { Link } from 'react-router-dom';
import './EditChallenge.css';

function EditChallenge() {
  const { id } = useParams(); 
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const docRef = doc(db, 'challengeTemplates', id); 
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setChallenge({ id: snapshot.id, ...snapshot.data() });
        } else {
          console.log('Challenge not found');
        }
      } catch (error) {
        console.error('Error fetching challenge:', error);
      }
    };

    fetchChallenge();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setChallenge((prevChallenge) => ({
      ...prevChallenge,
      [name]: value,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const docRef = doc(db, 'challengeTemplates', id);
      const durationNumber = Number(challenge.duration);
      if (Number.isNaN(durationNumber)) {
        console.error('Invalid duration:', challenge.duration);
        return;
      }
      const updatedChallenge = {
        ...challenge,
        duration: durationNumber,
      };
  
      await updateDoc(docRef, updatedChallenge);
      console.log('Challenge updated successfully');
    } catch (error) {
      console.error('Error updating challenge:', error);
    }
  };

  if (!challenge) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="header">
    <h1 className="header-title">Editing Predefined Challenges</h1>
    <Link to="/" className="header-button">Go back</Link>
    </div>
    <div className="edit-challenge-container">
    <h2 className="edit-challenge-heading">Edit Challenge</h2>
    <form className="edit-challenge-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="challengeName" className="form-label">Challenge Name:</label>
        <input
          type="text"
          id="challengeName"
          name="challengeName"
          value={challenge.challengeName}
          onChange={handleInputChange}
          className="form-input"
          minLength="3" 
          maxLength="50"
          required 
          pattern="^[a-zA-Z\s]+$" 
          title="Please enter a valid challenge name (3-50 characters, alphabets only)"
        />
      </div>
      <div className="form-group">
        <label htmlFor="category" className="form-label">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={challenge.category}
          onChange={handleInputChange}
          className="form-input"
          required
          pattern="^(Health|Environmental|Educational|Financial)$" 
          title="Please enter a valid category (Health, Environmental, Educational, or Financial)"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description" className="form-label">Description:</label>
        <textarea
          id="description"
          name="description"
          value={challenge.description}
          onChange={handleInputChange}
          className="form-textarea"
          minLength="10" 
          maxLength="300"
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="duration" className="form-label">Duration:</label>
        <input
          id="duration"
          name="duration"
          value={challenge.duration}
          onChange={handleInputChange}
          className="form-input"
          type="number"
          min="0"
          required
          title="Please enter the number of days the challenge will last"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description" className="form-label">Challenge goal</label>
        <textarea
          id="goalShort"
          name="goalShort"
          value={challenge.goalShort}
          onChange={handleInputChange}
          className="form-textarea"
          title="About this challenge"
        />
      </div>
      <div className="form-group">
        <label htmlFor="habitTitles" className="form-label">Challenge Habits:</label>
        <div className="habitsContainer">
        {challenge.habitTitles.map((habit, index) => (
          <input
            key={index}
            type="text"
            value={habit}
            onChange={(e) => {
              const updatedHabitTitles = [...challenge.habitTitles];
              updatedHabitTitles[index] = e.target.value;
              handleInputChange({ target: { name: 'habitTitles', value: updatedHabitTitles } });
            }}
            className="form-input1"
          />
          ))}
          </div>
      </div>
      <div className='submitContainer'>
      <button type="submit" className="submit-button">Update Challenge</button>
      </div>
    </form>
  </div>
  </>
);
}

export default EditChallenge;
