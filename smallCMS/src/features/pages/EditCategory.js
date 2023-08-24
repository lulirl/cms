import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as LuIcons from "react-icons/lu"; // Import icons from react-icons/lu
import * as GiIcons from "react-icons/gi"; // Import icons from react-icons/gi
import { iconNames } from "../shared/helpers/icons";
import { IconContext } from "react-icons";
import { doc, updateDoc } from "firebase/firestore";
import useNavigation from "../hooks/hooks.ts";
import { iconData } from "../shared/helpers/icons";
import { compressAndResizeImage } from "../shared/helpers/imagesHelperCompresses";
import {
  db,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "../../appfirebase/firebase.ts";
function EditCategory() {
  const { id } = useParams();
  const categories = useSelector((state) => state.categories.data);
  const [isIconListVisible, setIsIconListVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [previousIcon, setPreviousIcon] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const categoryData =
      categories?.find((category) => category?.id === id) || {};
    setSelectedCategory(categoryData);
  }, [categories, id]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "categoryName") {
      setSelectedCategory((prev) => ({ ...prev, title: value }));
    } else if (name === "categoryDescription") {
      setSelectedCategory((prev) => ({ ...prev, description: value }));
    }
  };

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
        setSelectedCategory((prev) => ({ ...prev, photoUrl: imageUrl }));
      } catch (error) {
        console.error("Error uploading the image:", error);
      }
    }
  };
  const getIconComponent = (name) => {
    if (name?.substring(0, 2) === "Gi") {
      const GiIconComponent = GiIcons[name];
      return <GiIconComponent size={30} color="black" />;
    } else {
      const LuIconComponent = LuIcons[name];
      return <LuIconComponent size={30} color="black" />;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const selectedIconKey = Object.keys(iconData).find(
        (key) => iconData[key] === selectedIcon
      );
      const docRef = doc(db, "challengeCategories", id);
      const updatedCategory = {
        ...selectedCategory,
        icon: selectedIconKey || selectedCategory.icon,
      };
      console.log(updatedCategory);
      await updateDoc(docRef, updatedCategory);
      alert("Category updated successfully");
      navigation("/");
    } catch (error) {
      alert("Error updating challenge:", error);
    }
  };

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);

    setIsIconListVisible(!isIconListVisible);
  };
  console.log(selectedIcon, "selectedIcon");
  console.log(previousIcon, "previous");
  return (
    <>
      <div className="header1">
        <h1 className="header-title1">Editing Categories</h1>
        <Link to="/categories" className="header-button1">
          Go back
        </Link>
      </div>
      <form className={"container"} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            name="categoryName"
            value={selectedTitle ? selectedTitle : selectedCategory?.title}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="categoryName">Category Description:</label>
          <input
            type="text"
            id="categoryDescription"
            name="categoryDescription"
            value={selectedCategory?.description}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="categoryPhoto">Category Photo:</label>
          <input
            type="file"
            id="categoryPhoto"
            name="categoryPhoto"
            className="input"
            onChange={handleImageUpload}
            accept="image/*"
          />
          <div
            className="image-container"
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "5%",
            }}
          >
            <img
              src={selectedImage ? selectedImage : selectedCategory?.photoUrl}
              alt="Uploaded file"
              style={{ width: "200px" }}
            />
          </div>
        </div>
        <label htmlFor="categoryIcon">Category Icon:</label>
        {selectedCategory?.icon &&
          previousIcon &&
          !selectedIcon &&
          getIconComponent(previousIcon)}
        <button
          type="button"
          onClick={() => setIsIconListVisible(!isIconListVisible)}
          style={{ maxWidth: 250 }}
        >
          {" "}
          Icon List
        </button>
        {isIconListVisible && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              position: "absolute",
              maxWidth: 300,
              top: "80%",
              left: "30%",
              backgroundColor: "white",
              border: "1px solid black",
              borderRadius: "5px",
              zIndex: 5,
              padding: "5px",
            }}
          >
            {iconNames.map((iconName, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleIconClick(iconName)} // Pass the iconName directly
                  style={{ cursor: "pointer", margin: "5px" }}
                >
                  {getIconComponent(iconName)}
                </div>
              );
            })}
          </div>
        )}
        <div>{selectedIcon && getIconComponent(selectedIcon)}</div>
        <div className="button-container-category">
          <button type="submit" className="submit-button">
            Update Category
          </button>
        </div>
      </form>
    </>
  );
}

export default EditCategory;
