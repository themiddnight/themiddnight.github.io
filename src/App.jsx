import { useState, createContext } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import EditPage from "./pages/Edit";

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
          <Route exact path="/create/:resumeId" element={<EditPage />} />
        </Routes>
      </HashRouter>
    </ModalContext.Provider>
  );
}
