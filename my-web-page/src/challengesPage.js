import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from "./appfirebase/firebase.ts";
import './ChallengesList.css';

function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [challengesPerPage] = useState(4);
  const indexOfLastChallenge = currentPage * challengesPerPage;
  const indexOfFirstChallenge = indexOfLastChallenge - challengesPerPage;
  const currentChallenges = challenges.slice(indexOfFirstChallenge, indexOfLastChallenge);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const challengesRef = collection(db, 'challengeTemplates');
        const snapshot = await getDocs(challengesRef);
        const challengesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setChallenges(challengesData);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <div className="header">
    <h1 className="header-title">Predefined Challenges</h1>
    <Link to="/create-new-challenge" className="header-button">Create a New Challenge</Link>
    </div>
    <div className="challenges-list">
    {currentChallenges.map((challenge) => (
      <div className="challenge-card" key={challenge.id}>
        <img className="challenge-image" src={challenge.picture} alt={challenge.challengeName} />
        <h3 className="challenge-name">{challenge.challengeName}</h3>
        <p className="challenge-category">{challenge.category}</p>
        <p className="challenge-description">{challenge.goalShort}</p>
        <div className="edit-container">
        <Link to={`/EditChallenge/${challenge.id}`} className="edit-button">
            Edit
          </Link>
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

export default ChallengesPage;
