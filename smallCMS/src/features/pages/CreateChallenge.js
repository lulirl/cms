import React from "react";
import { Link } from "react-router-dom";
import { useCreateChallenge } from "../shared/helpers/createChallengeHelper";
import "./CreateChallengePage.css";

function CreateChallengePage() {
  const {
    setChallengeData,
    imageUrl,
    challengeData,
    handleImageUpload,
    handleInputChange,
    handleSubmit,
    handleCategorySelection,
    allCategories,
    isOpen,
    setIsOpen,
    selectedCategories,
  } = useCreateChallenge();

  return (
    <>
      <div className="header1">
        <h1 className="header-title1">Creating a New Challenge</h1>
        <Link to="/" className="header-button1">
          Go back
        </Link>
      </div>
      <div className="container">
        <h1>Create a New Challenge</h1>
        <form className="challenge-form" onSubmit={handleSubmit}>
          <label htmlFor="challengeName">Challenge Name:</label>
          <input
            type="text"
            id="challengeName"
            name="challengeName"
            value={challengeData.challengeName}
            onChange={handleInputChange}
            minLength="3"
            maxLength="50"
            required
            pattern="^[a-zA-Z\s]+$"
            title="Please enter a valid challenge name (3-50 characters, alphabets only)"
          />
          <label htmlFor="image">Picture (.jpg .png) :</label>
          <input
            id="image"
            type="file"
            value={challengeData.picture}
            accept=".png, .jpg, .jpeg"
            onChange={handleImageUpload}
            title="Upload a JPG or PNG file"
            style={{ border: "none" }}
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Uploaded file"
              style={{ width: "200px" }}
            />
          )}

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={challengeData.description}
            onChange={handleInputChange}
            required
            minLength="10"
            maxLength="300"
            title="Please provide a challenge description"
          ></textarea>

          <label htmlFor="duration">Duration (in days):</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={challengeData.duration}
            onChange={handleInputChange}
            min="0"
            required
            title="Please enter the number of days the challenge will last"
          />

          <label htmlFor="goalShort">Challenge Goal</label>
          <input
            type="text"
            id="goalShort"
            name="goalShort"
            value={challengeData.goalShort}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="category">Category:</label>
          <div className="custom-select" onClick={() => setIsOpen(!isOpen)}>
            <input
              type="text"
              id="category"
              name="category"
              value={selectedCategories.join(", ")}
              onChange={handleInputChange}
              readOnly
              title="Select all the corresponding categories"
            />
            <span className={`arrow ${isOpen ? "open" : ""}`}>&#9662;</span>
            {isOpen && (
              <div className={`options`}>
                {allCategories.map((category) => (
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

          <label htmlFor="habitTitles">Challenge Habits:</label>
          <div className="challenge-habits">
            {challengeData.habitTitles.map((habit, index) => (
              <input
                key={index}
                type="text"
                value={habit}
                onChange={(e) => {
                  const updatedHabits = [...challengeData.habitTitles];
                  updatedHabits[index] = e.target.value;

                  setChallengeData((prevData) => ({
                    ...prevData,
                    habitTitles: updatedHabits,
                  }));
                }}
                required={index === 0}
                title="Please enter up to 129 characters and up to 4 daily habits per challenge"
              />
            ))}
          </div>

          <button type="submit">Create Challenge</button>
        </form>
      </div>
    </>
  );
}

export default CreateChallengePage;
