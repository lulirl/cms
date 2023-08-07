import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./features/pages/LoginForm.js";
import ChallengesListPage from "./features/pages/ChallengesListPage.js";
import EditChallenge from "./features/pages/EditChallenge.js";
import CreateChallenge from "./features/pages/CreateChallenge.js";
import CreateCategoryPage from "./features/pages/CreateCategory.js";
import CategoriesPage from "./features/pages/CategoriesPage.js";
import { Provider } from "react-redux";
import store from "./store/index.js";
import { useSelector } from "react-redux";
import EditCategory from "./features/pages/EditCategory.js";
import { onAuthStateChanged, auth } from "./appfirebase/firebase.ts";
const App = () => {
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

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
          <Route path="/create-new-category" element={<CreateCategoryPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/editCategory/:id" element={<EditCategory />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
