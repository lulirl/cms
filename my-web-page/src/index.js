import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import ChallengesPage from './challengesPage';
import EditChallenge from './EditChallenge';
import CreateChallenge from './CreateChallenge';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<ChallengesPage />} />
    <Route path="/editChallenge/:id" element={<EditChallenge />} />
    <Route path="/create-new-challenge" element={<CreateChallenge/>} />
    </Routes>

    </BrowserRouter>
  </React.StrictMode>
);


