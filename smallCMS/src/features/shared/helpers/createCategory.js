import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import {
  storage,
  ref,
  getDownloadURL,
  uploadBytes,
  db,
  updateDoc,
  doc,
} from "../../../appfirebase/firebase.ts";
import { useSelector } from "react-redux";
import { compressAndResizeImage } from "../helpers/imagesHelperCompresses.js";
import useNavigation from "../../hooks/hooks.ts";
import { iconData } from "./icons.js";

export const useCreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryPhoto, setCategoryPhoto] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [isIconListVisible, setIsIconListVisible] = useState(false);
  const categories = useSelector((state) => state.categories.data);
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
        console.error("Error uploading the image:", error);
      }
    }
  };

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
    setIsIconListVisible(false);
  };

  const handleIconInputClick = () => {
    setIsIconListVisible(!isIconListVisible);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedIconName = selectedIcon?.type?.name.toString();
    const defaultIconKey = "happy-outline";
    const selectedIconKey = Object.keys(iconData).find(
      (key) => iconData[key] === selectedIconName
    );

    const categoryNameLowercase = categoryName.toLowerCase();
    const categoryExists = categories.some(
      (category) => category.title.toLowerCase() === categoryNameLowercase
    );
    if (!categoryExists) {
      const newCategoryData = {
        title: categoryName,
        photoUrl: categoryPhoto,
        icon: selectedIconName ? selectedIconKey : defaultIconKey,
      };
      const categoriesRef = collection(db, "challengeCategories");
      const docRef = await addDoc(categoriesRef, newCategoryData);
      const newCategoryId = docRef.id;
      newCategoryData.id = newCategoryId;
      const existingCategoryDoc = doc(db, "challengeCategories", newCategoryId);
      await updateDoc(existingCategoryDoc, newCategoryData);
      alert("New Category added successfully");
      navigation("/");
    } else {
      alert("Error: The category has already been created");
    }
  };

  return {
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
  };
};
