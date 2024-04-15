import { useState, createContext } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import EditPage from "./pages/Edit";
import CreatePage from "./pages/Create";
import LoginPage from "./pages/Login";
import RegistarPage from "./pages/Register";
import VerifyEmailPage from "./pages/VerifyEmail";
import ResetPasswordPage from "./pages/ResetPassword";

export const ModalContext = createContext();

export default function App() {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageModalSrc, setImageModalSrc] = useState("");
  const [authToken, setAuthToken] = useState("");

  return (
    <ModalContext.Provider
      value={{
        isImageModalOpen,
        setIsImageModalOpen,
        imageModalSrc,
        setImageModalSrc,
        authToken,
        setAuthToken,
      }}
    >
      <HashRouter basename="/">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/:resumeId" element={<HomePage />} />
          <Route exact path="/create" element={<CreatePage />} />
          <Route exact path="/create/:resumeId" element={<EditPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegistarPage />} />
          <Route exact path="/verify-email/:token" element={<VerifyEmailPage />} />
          <Route exact path="/reset-password/:token" element={<ResetPasswordPage />} />
        </Routes>
      </HashRouter>
    </ModalContext.Provider>
  );
}
