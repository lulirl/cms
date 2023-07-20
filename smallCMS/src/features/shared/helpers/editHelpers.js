import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage, ref, uploadBytes, getDownloadURL } from '../../../appfirebase/firebase.ts';

export const useEditChallenge = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const storageRef = ref(storage, `challengeImages/${file.name}`);
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);
      setImageUrl(imageUrl);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const allHabitsValid = challenge.habitTitles.every((habit) => habit.length <= 129);
  
    if (!allHabitsValid) {
      alert('Error: Please enter up to 129 characters for each habit');
      return;
    }
    try {
      const docRef = doc(db, 'challengeTemplates', id);
      const durationNumber = Number(challenge.duration);
      if (Number.isNaN(durationNumber)) {
        console.error('Invalid duration:', challenge.duration);
        return;
      }
      const nonEmptyHabits = challenge.habitTitles.filter((habit) => habit.trim() !== '');
      const updatedChallenge = {
        ...challenge,
        duration: durationNumber,
        picture: imageUrl ? imageUrl : challenge.picture,
        habitTitles: nonEmptyHabits,
        goal: challenge.challengeName
      };

      await updateDoc(docRef, updatedChallenge);
      alert('Challenge updated successfully');
    } catch (error) {
      alert('Error updating challenge:', error);
    }
  };

  return {
    challenge,
    imageUrl,
    selectedFile,
    handleInputChange,
    handleImageUpload,
    handleSubmit,
  };
};
