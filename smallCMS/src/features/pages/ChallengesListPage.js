import {  useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ChallengesList.css';
import { fetchChallenges, handleDeleteChallenge } from '../shared/helpers/listChallengesHelper';

function ChallengesListPage({ logout}) {
  
  const [challenges, setChallenges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [challengesPerPage] = useState(4);
  const indexOfLastChallenge = currentPage * challengesPerPage;
  const indexOfFirstChallenge = indexOfLastChallenge - challengesPerPage;
  const currentChallenges = challenges?.slice(indexOfFirstChallenge, indexOfLastChallenge);
  
  useEffect(() => {
    const fetchChallengesData = async () => {
      const challengesData = await fetchChallenges();
      setChallenges(challengesData);
    };
  
    fetchChallengesData();
  }, [challenges]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <>
      <div className="header">
      <div className="left-section">
        <h1 className="header-title">Predefined Challenges</h1>
      </div>
      <div className="right-section">
        <Link to="/create-new-challenge" className="header-button">Create a New Challenge</Link>
        <button onClick={logout} className="logout-button">Log Out</button>
      </div>
    </div>
    <div className="challenges-list">
    {currentChallenges.map((challenge) => (
      <div className="challenge-card" key={challenge.id}>
        <img className="challenge-image" src={challenge.picture} alt={challenge.challengeName} />
        <h3 className="challenge-name">{challenge.challengeName}</h3>
        <p className="challenge-category">{challenge.category}</p>
        <p className="challenge-description">{challenge.goalShort}</p>
        <div className="edit-container">
          <div>
            <Link to={`/EditChallenge/${challenge.id}`} className="edit-button">
              Edit
            </Link>
          </div>
          <div>
            <button className="delete-button" onClick={() => handleDeleteChallenge(challenge.id)}>
              Delete
            </button>
          </div>
        </div>

      </div>
    ))}
  </div>
  <div className="pagination">
        {Array(Math.ceil(challenges.length / challengesPerPage))
          .fill()
          .map((_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
      </div>
  </>
  )
}

export default ChallengesListPage;
