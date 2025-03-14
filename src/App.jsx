import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes, } from "react-router";
import HomePage from "./pages/cardspage";
import LoginPage from "./pages/loginpage";
import DashboardPage from "./pages/dashboardpage";
import CardsPage from "./pages/cardspage";
import DashboardLayout from "./layouts/dashboard-layout";
import NotesPage from "./pages/notespage";
import EditorPage from "./pages/editorpage";
import KanbanPage from "./pages/kanbanpage";
import { AuthContext } from "./components/contexts";
import AssistantPage from "./pages/assistantpage";
import FeedbackPage from "./pages/feedbackpage";
import Profile from "./pages/profile";
import UpdateProfile from "./pages/updateprofile";
import ChangePassword from "./pages/changepassword";
import NotFound404 from "./pages/notfound";
function App() {
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const setToken = (newToken) => {
    setToken_(newToken);
  };
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
    }
  }, [token]);
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );


  return (
    <>
      <AuthContext.Provider value={contextValue}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route element={<DashboardLayout />}>
              <Route path="dashboard">
                <Route index element={<DashboardPage />} />
                <Route path="profile" element={<Profile />} />
                <Route path="profile/edit" element={<UpdateProfile />} />
                <Route path="profile/change-password" element={<ChangePassword />} />
                <Route path="cards" element={<CardsPage />} />
                <Route path="notes" element={<NotesPage />} />
                <Route path="editor/:id" element={<EditorPage />} />
                <Route path="kanban" element={<KanbanPage />} />
                <Route path="assistant" element={<AssistantPage />} />
                <Route path="feedback" element={<FeedbackPage />} />
                <Route path="*" element={<NotFound404 />} />
              </Route>
            </Route>
            <Route path="" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
