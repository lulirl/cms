
import {  signOut, auth } from "../../../appfirebase/firebase.ts";


export const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  