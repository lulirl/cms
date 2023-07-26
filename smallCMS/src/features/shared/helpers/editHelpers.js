import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc,  updateDoc } from 'firebase/firestore';
import { db, storage, ref, uploadBytes, getDownloadURL } from '../../../appfirebase/firebase.ts';
import useNavigation from '../../hooks/hooks.ts';
import { useSelector } from 'react-redux/es/hooks/useSelector.js';

export const useEditChallenge = () => {
  const { id } = useParams();
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();
  const challenges = useSelector((state)=> state.challenges.data)
  const categories = useSelector((state)=> state.categories.data)
  useEffect(() => {
    const challengeData = challenges.find((challenge) => challenge.id === id) || {};
    setSelectedCategories(challengeData.category || []);
    setChallenge(challengeData); 
  }, [challenges, id]);
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
  const handleCategorySelection = (categoryTitle) => {
    const category = categories.find((cat) => cat.title === categoryTitle);
    if (category) {
      const categoryId = category?.id;
      if (selectedCategories.includes(categoryId)) {
        setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
      } else {
        setSelectedCategories([...selectedCategories, categoryId]);
      }
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
        goal: challenge.challengeName,
        category: selectedCategories,
      };
      await updateDoc(docRef, updatedChallenge);
      alert('Challenge updated successfully');
      navigation("/")
    } catch (error) {
      alert('Error updating challenge:', error);
    }
  };

  return {
    setChallenge,
    imageUrl,
    selectedFile,
    handleInputChange,
    handleImageUpload,
    handleSubmit,
    selectedCategories,
    handleCategorySelection,
    setIsOpen,
    isOpen,
    challenge
  };
};
