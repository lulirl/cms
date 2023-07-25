import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './appfirebase/firebase.ts';
import LoginForm from './features/pages/LoginForm.js';
import ChallengesListPage from './features/pages/ChallengesListPage.js';
import EditChallenge from './features/pages/EditChallenge.js';
import CreateChallenge from './features/pages/CreateChallenge.js';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {

        setUser(user);
      } else {

        setUser(null);
      }
    });


    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/"
            element={user ? <ChallengesListPage /> : <LoginForm />}
          />
          <Route path="/editChallenge/:id" element={<EditChallenge />} />
          <Route path="/create-new-challenge" element={<CreateChallenge />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);



