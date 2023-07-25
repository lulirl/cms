import { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { storage, ref, getDownloadURL, uploadBytes, db } from '../../../appfirebase/firebase.ts';
import  useNavigation  from '../../hooks/hooks.ts'
import { fetchCategories } from './listChallengesHelper.js';

export const useCreateChallenge = () => {
  const navigate = useNavigation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
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
  useEffect(() => {
    const fetchChallengesCategories= async () => {
      const challengesCategories = await fetchCategories();
      setAllCategories(challengesCategories);
    };
  
    fetchChallengesCategories();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
  };
  const handleCategorySelection = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
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
      challengeData.category = selectedCategories.map((selectedTitle) => {
        const matchingCategory = allCategories.find((category) => category.title === selectedTitle);
        return matchingCategory ? matchingCategory.id : null;
      });
      
      await addDoc(challengesRef, challengeData);
      alert('Challenge added successfully');
      navigate("/")
    } catch (error) {
      alert('Error adding challenge:', error);
    }
  };
  console.log(selectedCategories, allCategories, 'here')
  return {
    selectedFile,
    imageUrl,
    challengeData,
    handleImageUpload,
    handleInputChange,
    handleSubmit,
    setChallengeData, 
    allCategories,
    handleCategorySelection,
    isOpen,
    setIsOpen,
    selectedCategories,
  };
};
