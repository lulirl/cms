import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import {storage, ref, getDownloadURL, uploadBytes} from "../src/appfirebase/firebase.ts"
import { db } from './appfirebase/firebase.ts';
import './CreateChallengePage.css';
import { Link } from 'react-router-dom';
function CreateChallengePage() {
  const[selectedFile, setSelectedFile] = useState(null)
  const [imageUrl, setImageUrl] = useState('');
  const [challengeData, setChallengeData] = useState({
    challengeName: '',
    goal: '',
    description: '',
    duration: '',
    goalShort: '',
    habitTitles: ['', '', '', ''],
    category: '',
    picture:''
  });
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
  };
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
      const storageRef = ref(storage, `challengeImages/${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);

  
      const imageUrl = await getDownloadURL(storageRef);

      const challengesRef = collection(db, 'challengeTemplates');
      challengeData.picture = imageUrl
      challengeData.goal = challengeData.challengeName
      challengeData.duration = Number(challengeData.duration)

      await addDoc(challengesRef, challengeData);
      alert('Challenge added successfully');
     
    } catch (error) {
      alert('Error adding challenge:', error);

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
     <label htmlFor="image">Picture (.jpg .png) :</label>
      <input
        id="image"
        type="file"
        value={challengeData.picture}
        accept=".png, .jpg, .jpeg"
        onChange={handleImageUpload}
        title="Upload a JPG or PNG file"
        style={{border: 'none'}}
      />
    {imageUrl &&
      <img src={imageUrl} alt="Uploaded file" style={{ width: '200px' }} />
      }


        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={challengeData.description}
          onChange={handleInputChange}
          required
          minLength="10" 
          maxLength="300"
          title="Please provide a challenge description"
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

        <label htmlFor="habitTitles">Challenge Habits:</label>
        <div className="challenge-habits">
          {challengeData.habitTitles.map((habit, index) => (
            <input
              key={index}
              type="text"
              value={habit}
              onChange={(e) => {
                const updatedHabits = [...challengeData.habitTitles];
                updatedHabits[index] = e.target.value;
                const nonEmptyHabits = updatedHabits.filter((habit) => habit.trim() !== '');

                setChallengeData((prevData) => ({
                  ...prevData,
                  habitTitles: nonEmptyHabits,
                }));
              }}
              required={index===0}
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
