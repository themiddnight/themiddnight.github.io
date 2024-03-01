import { Box, Container, Button, Typography, CircularProgress } from "@mui/material";
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
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [data, setData] = useState({});
  const [isEnter, setIsEnter] = useState(false);
  const [isEntered, setIsEntered] = useState(false);

  function handleEnter() {
    sessionStorage.setItem("isEntered", true);
    setIsEnter(true);
    setTimeout(() => {
      setIsEntered(true);
    }, 500);
  }
  
  useEffect(() => {
    const dataSession = sessionStorage.getItem("data");
    const isEnteredSession = sessionStorage.getItem("isEntered");
    if (isEnteredSession) {
      setIsEnter(true);
      setIsEntered(true);
    }
    if (dataSession) {
      setData(JSON.parse(dataSession));
      setIsDataLoaded(true);
    } else {
      setTimeout(() => {  // Simulate a fetch request
        fetch("/data.json")
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            setIsDataLoaded(true);
            // Save data to session storage, so it won't be fetched again
            sessionStorage.setItem("data", JSON.stringify(data)); 
          });
      }, 1000);
    }
  }, []);

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
          startIcon={isDataLoaded ? null : <CircularProgress size={20} color="grey" />}
          disabled={!isDataLoaded}
          onClick={handleEnter}
        >
          {isDataLoaded ? "Let's get started" : "Loading..."}
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
              <Box className={'card2'}><AboutCard data={data.about} /></Box>
              <Box className={'card3'}><EducationCard data={data.education} /></Box>
              <Box className={'card4'}><ExperienceCard data={data.experiences} /></Box>
              <Box className={'card5'} display={{ xs:'none', sm: 'block', lg: 'none' }}><LanguagesCard data={data.languages} /></Box>
              <Box className={'card6'} display={{ xs: 'none', sm: 'block', lg: 'none' }}><OtherProfileCard data={data.otherProfiles} /></Box>
            </Box>

            <Box
              gridColumn={{ xs: "span 12", sm: "span 6", lg: "span 8" }}
              display="flex"
              flexDirection="column"
              gap={2}
            >
              <Box className={'card2'}><ProjectsCard data={data.projects} /></Box>

              <Box display="grid" gridTemplateColumns={{ sm: '1fr', md: '1fr 1fr'}} gap={2}>
                <Box
                  gridColumn={{ xs: "span 2", lg: "span 1" }}
                  display="flex"
                  flexDirection="column"
                  gap={2}
                >
                  <Box className={'card3'}><SkillsCard data={data.skills} /></Box>
                  <Box className={'card4'} display={{ xs: 'none', sm: 'none', lg: 'block' }}><LanguagesCard data={data.languages} /></Box>
                </Box>

                <Box
                  gridColumn={{ xs: "span 2", lg: "span 1" }}
                  display="flex"
                  flexDirection="column"
                  gap={2}
                >
                  <Box className={'card4'}><FrameworksCard data={data.frameworks} /></Box>
                  <Box className={'card5'} display={{ xs: 'block', sm: 'none', lg: 'none' }}><LanguagesCard data={data.languages} /></Box>
                  <Box className={'card6'} display={{ xs: 'block', sm: 'block', lg: 'block' }}><CertificatesCard data={data.certificates} /></Box>
                  <Box className={'card7'} display={{ xs: 'block', sm: 'none', lg: 'block' }}><OtherProfileCard data={data.otherProfiles} /></Box>
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
