
import {  deleteDoc, doc } from 'firebase/firestore';
import { db } from "../../../appfirebase/firebase.ts";

  
  export const handleDeleteCategory = async (challengeId) => {
    try {
      await deleteDoc(doc(db, 'challengeCategories', challengeId));
      alert('Category deleted successfully');
 
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error deleting category');
    }
  };