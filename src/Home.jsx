import {
  Box,
  Container,
  Button,
  Typography,
} from "@mui/material";
import { useState, createContext } from "react";

import ProfileCard from "./components/ProfileCard";
import AboutCard from "./components/AboutCard";
import EducationCard from "./components/EducationCard";
import ExperienceCard from "./components/ExperienceCard";
import ProjectsCard from "./components/ProjectsCard";
import FrameworksCard from "./components/FrameworksCard";
import SkillsCard from "./components/SkillsCard";
import CertificatesCard from "./components/CertificatesCard";
import LanguagesCard from "./components/LanguagesCard";
import ImageModal from "./components/elements/ImageModal";

export const ModalContext = createContext();

function Home() {
  const [isEnter, setIsEnter] = useState(false);
  const [isEntered, setIsEntered] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageModalSrc, setImageModalSrc] = useState("");

  function handleEnter() {
    setIsEnter(true);
    setTimeout(() => {
      setIsEntered(true);
    }, 500);
  }

  if (!isEntered) {
    return (
      <Box 
        position={'fixed'}
        top={0} left={0} right={0} bottom={0}
        zIndex={10}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        className={!isEnter ? "basic-bg" : "basic-bg intro-fade-out__div"}
      >
        <Box textAlign={'center'} className={!isEnter ? "intro-in__text" : "intro-out__text"}>
          <Typography variant="h2">Hi!</Typography>
          <Typography variant="h3" fontWeight={'light'} mb={5} gutterBottom>Welcome to my resume</Typography>
        </Box>
        <Button 
          variant={isEnter ? "contained" : "outlined"}
          color="primary" 
          size="large" 
          className={!isEnter ? "intro-in__button" : "intro-out__button"}
          onClick={handleEnter}>
            Let&apos;s Jump in!
          </Button>
      </Box>
    )
  }

  return (
    <>
      <ModalContext.Provider value={{ isImageModalOpen, setIsImageModalOpen, imageModalSrc, setImageModalSrc }}>
        <Box>
          <Container maxWidth="xl" sx={{ py: {xs: 2, sm: 3, xl: 10} }}>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
              <Box
                gridColumn={{ xs: "span 12", sm: "span 6", lg: "span 4" }}
                display="flex"
                flexDirection="column"
                gap={2}
              >
                <Box className={'card1'}><ProfileCard /></Box>
                <Box className={'card2'}><AboutCard /></Box>
                <Box className={'card3'}><EducationCard /></Box>
                <Box className={'card4'}><ExperienceCard /></Box>
                <Box className={'card5'} display={{ xs:'none', sm: 'block', lg: 'none' }}><LanguagesCard /></Box>
                <Box className={'card6'} display={{ xs:'none', sm: 'block', lg: 'none' }}><CertificatesCard /></Box>
              </Box>

              <Box
                gridColumn={{ xs: "span 12", sm: "span 6", lg: "span 8" }}
                display="flex"
                flexDirection="column"
                gap={2}
              >
                <Box className={'card2'}><ProjectsCard /></Box>

                <Box display="grid" gridTemplateColumns={{ sm: '1fr', md: '1fr 1fr'}} gap={2}>
                  <Box
                    gridColumn={{ xs: "span 2", lg: "span 1" }}
                    display="flex"
                    flexDirection="column"
                    gap={2}
                  >
                    <Box className={'card3'}><SkillsCard /></Box>
                    <Box className={'card4'} display={{ xs: 'none', sm: 'none', lg: 'block' }}><CertificatesCard /></Box>
                  </Box>

                  <Box
                    gridColumn={{ xs: "span 2", lg: "span 1" }}
                    display="flex"
                    flexDirection="column"
                    gap={2}
                  >
                    <Box className={'card4'} display={{ xs: 'none', sm: 'none', lg: 'block' }}><LanguagesCard /></Box>
                    <Box className={'card5'}><FrameworksCard /></Box>
                    <Box className={'card5'} display={{ xs: 'block', sm: 'none', lg: 'none' }}><LanguagesCard /></Box>
                    <Box className={'card5'} display={{ xs: 'block', sm: 'none', lg: 'none' }}><CertificatesCard /></Box>
                  </Box>
                  
                </Box>
                
              </Box>
            </Box>
          </Container>
        </Box>
        <ImageModal />
      </ModalContext.Provider>
    </>
  );
}

export default Home;