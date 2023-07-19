
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

import { db } from "../../../appfirebase/firebase.ts";


export const fetchChallenges = async () => {
    try {
      const challengesRef = collection(db, 'challengeTemplates');
      const snapshot = await getDocs(challengesRef);
      const challengesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return challengesData;
    } catch (error) {
      console.error('Error fetching challenges:', error);
      return [];
    }
  };
  
  export const handleDeleteChallenge = async (challengeId) => {
    try {
      // Delete the challenge from the challengeTemplates collection
      await deleteDoc(doc(db, 'challengeTemplates', challengeId));
      alert('Challenge deleted successfully');
    } catch (error) {
      console.error('Error deleting challenge:', error);
      alert('Error deleting challenge');
    }
  };
  