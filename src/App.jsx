import { useState, createContext } from "react";

import Themes from "./Themes";
import Home from "./Home";

export const ModalContext = createContext();

export default function App() {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isPublicNotesModalOpen, setIsPublicNotesModalOpen] = useState(false);
  const [imageModalSrc, setImageModalSrc] = useState("");
  const [publicNotesData, setPublicNotesData] = useState([]);

  return (
    <Themes>
      <ModalContext.Provider
        value={{
          isImageModalOpen,
          setIsImageModalOpen,
          isPublicNotesModalOpen,
          setIsPublicNotesModalOpen,
          imageModalSrc,
          setImageModalSrc,
          publicNotesData,
          setPublicNotesData,
        }}
      >
        <Home />
      </ModalContext.Provider>
    </Themes>
  );
}
