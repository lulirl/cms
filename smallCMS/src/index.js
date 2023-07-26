import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './features/pages/LoginForm.js';
import ChallengesListPage from './features/pages/ChallengesListPage.js';
import EditChallenge from './features/pages/EditChallenge.js';
import CreateChallenge from './features/pages/CreateChallenge.js';
import { Provider } from 'react-redux';
import store from './store/index.js'
import { useSelector } from 'react-redux'
const App = () => {
  const stateUser = useSelector((state)=> state.auth.user)



  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/"
            element={stateUser ? <ChallengesListPage /> : <LoginForm />}
          />
          <Route path="/editChallenge/:id" element={<EditChallenge />} />
          <Route path="/create-new-challenge" element={<CreateChallenge />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store}><App/></Provider>);



