import { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { storage, ref, getDownloadURL, uploadBytes, db, updateDoc, doc } from '../../../appfirebase/firebase.ts';
import  useNavigation  from '../../hooks/hooks.ts'
import { useSelector } from 'react-redux/es/hooks/useSelector.js';

export const useCreateChallenge = () => {
  const navigate = useNavigation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const categories = useSelector((state)=> state.categories.data)
  const [challengeData, setChallengeData] = useState({
    challengeName: '',
    goal: '',
    description: '',
    duration: '',
    goalShort: '',
    habitTitles: ['', '', '', ''],
    category: '',
    picture: '',
    id:''
  });

  useEffect(() => {
    setAllCategories(categories)
  }, [categories])
  
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
      const docRef = await addDoc(challengesRef, challengeData);
      const newChallengeId = docRef.id;
      challengeData.picture = imageUrl;
      challengeData.goal = challengeData.challengeName;
      challengeData.duration = Number(challengeData.duration);
      challengeData.habitTitles = challengeData.habitTitles.filter((habit) => habit.trim() !== '');
      challengeData.category = selectedCategories.map((selectedTitle) => {
        const matchingCategory = allCategories.find((category) => category.title === selectedTitle);
        return matchingCategory ? matchingCategory.id : null;
      });
      challengeData.id = newChallengeId;
      const existingChallengeDoc = doc(db, 'challengeTemplates', newChallengeId);
      await updateDoc(existingChallengeDoc, challengeData);
      alert('Challenge added successfully');
      navigate("/")
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
    setChallengeData, 
    allCategories,
    handleCategorySelection,
    isOpen,
    setIsOpen,
    selectedCategories,
  };
};
