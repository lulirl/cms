import { collection, getDocs } from 'firebase/firestore';
import {db} from '../appfirebase/firebase'
import { Challenge } from './models/challenges.ts';
import { Categories } from './models/categories.ts';

// function to get a list of predefined challenges
async function getPredefinedChallenges () {
    const docRef = collection(db, 'challengeTemplates');
    const querySnapshot = await getDocs(docRef);
    if (querySnapshot.docs.length) {
      return querySnapshot.docs.map((challengeTemplate) => {
        return {
          ...(challengeTemplate?.data() as Challenge)
        };
      });
    }
    
    return [];

} 

async function getPredefinedCategories () {
  const docRef = collection(db, 'challengeCategories');
  const querySnapshot = await getDocs(docRef);
  if (querySnapshot.docs.length) {
    return querySnapshot.docs.map((challengeTemplate) => {
      return {
        ...(challengeTemplate?.data() as Categories)
      };
    });
  }
  
  return [];

} 

export {getPredefinedChallenges, getPredefinedCategories}