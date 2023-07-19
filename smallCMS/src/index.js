import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import ChallengesListPage from './features/pages/ChallengesListPage.js';
import EditChallenge from './features/pages/EditChallenge.js';
import CreateChallenge from './features/pages/CreateChallenge.js';
import LoginForm from './features/pages/LoginForm.js';
import { handleLogout} from './features/shared/helpers/authHelper.js'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="/login" element={<LoginForm />} />
    <Route path="/" element={<ChallengesListPage handleLogout={handleLogout}/>} />
    <Route path="/editChallenge/:id" element={<EditChallenge />} />
    <Route path="/create-new-challenge" element={<CreateChallenge/>} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


