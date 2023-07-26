
import {  deleteDoc, doc } from 'firebase/firestore';
import { db } from "../../../appfirebase/firebase.ts";

  
  export const handleDeleteChallenge = async (challengeId) => {
    try {
      await deleteDoc(doc(db, 'challengeTemplates', challengeId));
      alert('Challenge deleted successfully');
 
    } catch (error) {
      console.error('Error deleting challenge:', error);
      alert('Error deleting challenge');
    }
  };
  

 