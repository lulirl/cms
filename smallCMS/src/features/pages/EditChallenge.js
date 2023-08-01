import React from "react";
import { Link } from "react-router-dom";
import { useEditChallenge } from "../shared/helpers/editHelpers";
import "./EditChallenge.css";
import { useSelector } from "react-redux/es/hooks/useSelector";

function EditChallenge() {
  const categories = useSelector((state) => state.categories.data);
  const {
    imageUrl,
    handleInputChange,
    handleImageUpload,
    handleSubmit,
    handleCategorySelection,
    isOpen,
    setIsOpen,
    selectedCategories,
    challenge,
  } = useEditChallenge();

  if (!challenge) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="header1">
        <h1 className="header-title1">Editing Predefined Challenges</h1>
        <Link to="/" className="header-button1">
          Go back
        </Link>
      </div>
      <div className="edit-challenge-container">
        <h2 className="edit-challenge-heading">Edit Challenge</h2>
        <form className="edit-challenge-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="challengeName" className="form-label">
              Challenge Name:
            </label>
            <input
              type="text"
              id="challengeName"
              name="challengeName"
              value={challenge.challengeName}
              onChange={handleInputChange}
              className="form-input"
              minLength="3"
              maxLength="50"
              required
              pattern="^[a-zA-Z\s]+$"
              title="Please enter a valid challenge name (3-50 characters, alphabets only)"
            />
          </div>

          <label htmlFor="image" className="form-label form-label-left">
            Picture (.jpg .png) :
          </label>
          <input
            id="image"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleImageUpload}
            title="Upload a JPG or PNG file"
            className="form-input"
            style={{ border: "none" }}
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
              src={imageUrl ? imageUrl : challenge.picture}
              alt="Uploaded file"
              style={{ width: "200px" }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={challenge.description}
              onChange={handleInputChange}
              className="form-textarea"
              minLength="10"
              maxLength="300"
              title="Please provide a challenge description"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="duration" className="form-label">
              Duration:
            </label>
            <input
              id="duration"
              name="duration"
              value={challenge.duration}
              onChange={handleInputChange}
              className="form-input"
              type="number"
              min="0"
              required
              title="Please enter the number of days the challenge will last"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Challenge goal
            </label>
            <textarea
              id="goalShort"
              name="goalShort"
              value={challenge.goalShort}
              onChange={handleInputChange}
              className="form-textarea"
              title="About this challenge"
            />
          </div>
          <div className="form-group">
            <label htmlFor="habitTitles" className="form-label">
              Challenge Habits:
            </label>
            <div className="habitsContainer">
              {challenge?.habitTitles?.map((habit, index) => (
                <input
                  key={index}
                  type="text"
                  value={habit}
                  onChange={(e) => {
                    const updatedHabit = e.target.value;
                    const updatedHabitTitles = [...challenge.habitTitles];
                    updatedHabitTitles[index] = updatedHabit;
                    handleInputChange({
                      target: {
                        name: "habitTitles",
                        value: updatedHabitTitles,
                      },
                    });
                  }}
                  className="form-input1"
                  title="Please enter up to 129 characters and up to 4 daily habits per challenge"
                />
              ))}
            </div>
          </div>
          <label className="form-label form-label-left" htmlFor="category">
            Category:
          </label>
          <div className="custom-select" onClick={() => setIsOpen(!isOpen)}>
            <input
              type="text"
              id="category"
              className="form-input-category"
              name="category"
              value={selectedCategories?.map((selectedId) => {
                const matchingCategory = categories?.find(
                  (category) => category?.id === selectedId
                );
                return matchingCategory ? matchingCategory.title : null;
              })}
              onChange={handleInputChange}
              readOnly
              title="Select all the corresponding categories"
            />
            <span className={`arrow ${isOpen ? "open" : ""}`}>&#9662;</span>
            {isOpen && (
              <div className={`options`}>
                {categories?.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => handleCategorySelection(category.title)}
                  >
                    {category.title}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="submitContainer">
            <button type="submit" className="submit-button">
              Update Challenge
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditChallenge;
