import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { storage, ref, getDownloadURL, uploadBytes, db } from '../../../appfirebase/firebase.ts';

export const useCreateChallenge = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [challengeData, setChallengeData] = useState({
    challengeName: '',
    goal: '',
    description: '',
    duration: '',
    goalShort: '',
    habitTitles: ['', '', '', ''],
    category: '',
    picture: ''
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
    const allHabitsValid = challengeData.habitTitles.every((habit) => habit.length <= 129);
    if (!allHabitsValid) {
      alert('Error: Please enter up to 129 characters for each habit');
      return;
    }

    try {
      const storageRef = ref(storage, `challengeImages/${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);
      const imageUrl = await getDownloadURL(storageRef);

      const challengesRef = collection(db, 'challengeTemplates');
      challengeData.picture = imageUrl;
      challengeData.goal = challengeData.challengeName;
      challengeData.duration = Number(challengeData.duration);
      challengeData.habitTitles = challengeData.habitTitles.filter((habit) => habit.trim() !== '');
    
      await addDoc(challengesRef, challengeData);
      alert('Challenge added successfully');

    } catch (error) {
      alert('Error adding challenge:', error);
    }
  };

  return {
    selectedFile,
    imageUrl,
    challengeData,
    handleImageUpload,
    handleInputChange,
    handleSubmit,
    setChallengeData
  };
};
