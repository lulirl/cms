import React from "react";
import { Link } from "react-router-dom";
import "./CreateCategory.css";
import { useCreateCategory } from "../shared/helpers/createCategory";
import { IconContext } from "react-icons";
import { iconNames } from "../shared/helpers/icons";
function CreateCategoryPage() {
  const {
    getIconComponent,
    handleSubmit,
    setCategoryName,
    handleIconClick,
    isIconListVisible,
    handleIconInputClick,
    categoryPhoto,
    categoryName,
    handleImageUpload,
    selectedIcon,
  } = useCreateCategory();

  return (
    <>
      <div className="header">
        <div className="left-section">
          <h1 className="header-title">Creating a new category</h1>
        </div>
        <div className="right-section">
          <Link to="/categories" className="header-button">
            Existing categories
          </Link>
          <Link to="/" className="header-button">
            Go back
          </Link>
        </div>
      </div>
      <form className={"container"} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            name="categoryName"
            value={categoryName}
            className="input"
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="categoryPhoto">Category Photo:</label>
          <input
            type="file"
            id="categoryPhoto"
            name="categoryPhoto"
            className="input"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
          {categoryPhoto && (
            <div
              className="image-container"
              style={{
                display: "flex",
                justifyContent: "center",
                marginLeft: "5%",
              }}
            >
              <img
                src={categoryPhoto}
                alt="Uploaded file"
                style={{ width: "200px" }}
              />
            </div>
          )}
        </div>
        <label htmlFor="categoryIcon">Category Icon:</label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            onClick={handleIconInputClick}
            style={{
              cursor: "pointer",
              margin: "0 10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {selectedIcon ? (
              getIconComponent(selectedIcon)
            ) : (
              <span className="subTitle">Select an icon</span>
            )}
          </div>

          {isIconListVisible && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                position: "absolute",
                maxWidth: "100%",
                top: "100%",
                left: 0,
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
        </div>

        <div className="button-container">
          <button className="submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateCategoryPage;
