import { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { storage, ref, getDownloadURL, uploadBytes, db, updateDoc, doc } from '../../../appfirebase/firebase.ts';
import { useSelector } from 'react-redux';
import useNavigation from '../../hooks/hooks.ts';

export const useCreateCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryPhoto, setCategoryPhoto] = useState('');
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [isIconListVisible, setIsIconListVisible] = useState(false);
    const categories = useSelector((state)=> state.categories.data)
    const navigation = useNavigation();
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
          try {
            const compressedImage = await compressAndResizeImage(file, {
              maxWidth: 800, 
              maxHeight: 800, 
              quality: 0.7, 
            });
      
            const storageRef = ref(storage, `categoryImages/${file.name}`);
            await uploadBytes(storageRef, compressedImage);
            const imageUrl = await getDownloadURL(storageRef);
            setCategoryPhoto(imageUrl);
          } catch (error) {
            console.error('Error uploading the image:', error);
          }
        }
      };
      
      const compressAndResizeImage = (file, options) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          const reader = new FileReader();
      
          reader.onload = (e) => {
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              const { maxWidth, maxHeight, quality } = options;
              let width = img.width;
              let height = img.height;
      
              if (width > maxWidth || height > maxHeight) {
                const aspectRatio = width / height;
                if (width > maxWidth) {
                  width = maxWidth;
                  height = width / aspectRatio;
                }
                if (height > maxHeight) {
                  height = maxHeight;
                  width = height * aspectRatio;
                }
              }
      
              canvas.width = width;
              canvas.height = height;
      
              ctx.drawImage(img, 0, 0, width, height);
      
              canvas.toBlob(
                (blob) => resolve(blob),
                'image/jpeg',
                quality
              );
            };
      
            img.src = e.target.result;
          };
      
          reader.readAsDataURL(file);
        });
      }
    
      const handleIconClick = (icon) => {
        setSelectedIcon(icon);
        setIsIconListVisible(false);
      };
    
      const handleIconInputClick = () => {
        setIsIconListVisible(!isIconListVisible);
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        const categoryNameLowercase = categoryName.toLowerCase();
        const categoryExists = categories.some(category => category.title.toLowerCase() === categoryNameLowercase);     
        if (!categoryExists) {
          const newCategoryData = {
            title: categoryName,
            photoUrl: categoryPhoto,
            icon: selectedIcon?.type?.name ? selectedIcon.type.name : "LuSmilePlus"
          };     
          const categoriesRef = collection(db, 'challengeCategories');
          const docRef = await addDoc(categoriesRef, newCategoryData);
          const newCategoryId = docRef.id;
          newCategoryData.id = newCategoryId;     
          const existingCategoryDoc = doc(db, 'challengeCategories', newCategoryId);
          await updateDoc(existingCategoryDoc, newCategoryData);     
          alert('New Category added successfully');
          navigation("/")
        } else {
          alert('Error: The category has already been created');
        }
      };

      
return (
    {
        handleSubmit,
        setCategoryName,
        setCategoryPhoto,
        categoryName,
        categoryPhoto,
        handleImageUpload,
        handleIconClick,
        handleIconInputClick,
        setSelectedIcon,
        selectedIcon,
        isIconListVisible,
        compressAndResizeImage,
    }
)

}
