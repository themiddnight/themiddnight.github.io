import { Box, Container, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";

import ProfileCard from "./components/ProfileCard";
import AboutCard from "./components/AboutCard";
import EducationCard from "./components/EducationCard";
import ExperienceCard from "./components/ExperienceCard";
import ProjectsCard from "./components/ProjectsCard";
import FrameworksCard from "./components/FrameworksCard";
import SkillsCard from "./components/SkillsCard";
import CertificatesCard from "./components/CertificatesCard";
import LanguagesCard from "./components/LanguagesCard";
import OtherProfileCard from "./components/OtherProfileCard";
import ImageModal from "./components/elements/ImageModal";

export default function Home() {
  const [isEnter, setIsEnter] = useState(false);
  const [isEntered, setIsEntered] = useState(false);
  const [isReady, setIsReady] = useState(false); // Check if the session storage is loaded

  function handleEnter() {
    sessionStorage.setItem("isEntered", true);
    setIsEnter(true);
    setTimeout(() => {
      setIsEntered(true);
    }, 500);
  }
  
  // Check if user has entered the site before within 3 sec. If not, show the intro screen.
  useEffect(() => {
    const isEnteredSession = sessionStorage.getItem("isEntered");
    if (isEnteredSession) {
      setIsEnter(true);
      setIsEntered(true);
    }
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  } else if (isReady && !isEntered) {
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
            Let&apos;s Get Started
          </Button>
      </Box>
    )
  }

  return (
    <>
      <Box>
        <Container maxWidth="xl" sx={{ py: {xs: 2, sm: 3, xl: 8} }}>
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
              <Box className={'card6'} display={{ xs: 'none', sm: 'block', lg: 'none' }}><OtherProfileCard /></Box>
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
                  <Box className={'card4'} display={{ xs: 'none', sm: 'none', lg: 'block' }}><LanguagesCard /></Box>
                </Box>

                <Box
                  gridColumn={{ xs: "span 2", lg: "span 1" }}
                  display="flex"
                  flexDirection="column"
                  gap={2}
                >
                  <Box className={'card4'}><FrameworksCard /></Box>
                  <Box className={'card5'} display={{ xs: 'block', sm: 'none', lg: 'none' }}><LanguagesCard /></Box>
                  <Box className={'card6'} display={{ xs: 'block', sm: 'block', lg: 'block' }}><CertificatesCard /></Box>
                  <Box className={'card7'} display={{ xs: 'block', sm: 'none', lg: 'block' }}><OtherProfileCard /></Box>
                </Box>
                
              </Box>
              
            </Box>
          </Box>
        </Container>
      </Box>
      <ImageModal />
    </>
  );
}
