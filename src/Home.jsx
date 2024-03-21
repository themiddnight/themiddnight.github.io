import { Box, Container, Button, Typography, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";

import { fetchData, fetchNewNotes } from "./utils/fetch";

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
import PublicNotesCard from "./components/PublicNotesCard";
import ImageModal from "./components/modals/ImageModal";
import PublicNotesModal from "./components/modals/PublicNotesModal";

export default function Home() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [data, setData] = useState({});
  const [publicNotesData, setPublicNotesData] = useState([]);
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
    fetchData().then((data) => {
      setData(data);
      fetchNewNotes(data.public_notes.display_limit).then((data) => {
        setPublicNotesData(data);
        setIsDataLoaded(true);
        if (sessionStorage.getItem("isEntered")) {
          setIsEnter(true);
          setIsEntered(true);
        }
      });
    });
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
          <Typography variant="h4" fontWeight={'light'} mb={5} gutterBottom>Welcome to my resume</Typography>
        </Box>
        <Button 
          variant={isEnter ? "contained" : "outlined"}
          color="primary" 
          size="large" 
          className={!isEnter ? !isDataLoaded ? "intro-in__button" : "intro-in__button pulse" : "intro-out__button"}
          startIcon={isDataLoaded ? null : <CircularProgress size={20} color="grey" />}
          disabled={!isDataLoaded}
          onClick={handleEnter}
          sx={{ borderRadius: 50 }}
        >
          {isDataLoaded ? "Let's get started" : "Wait a sec..."}
        </Button>
      </Box>
    )
  }

  return (
    <>
      <Box>
        <Container maxWidth="xl" sx={{ py: {xs: 2, sm: 3, xl: 8} }}>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2.5}>
            <Box
              gridColumn={{ xs: "span 12", sm: "span 6", lg: "span 4" }}
              display="flex"
              flexDirection="column"
              gap={2.5}
            >
              <Box className={'card1'}><ProfileCard data={data.profile} /></Box>
              <Box className={'card2'}><AboutCard title={data.about.title} data={data.about.data} /></Box>
              <Box className={'card3'}><ExperienceCard title={data.experiences.title} data={data.experiences.data} limit={data.experiences.display_limit} /></Box>
              <Box className={'card4'}><EducationCard title={data.education.title} data={data.education.data} limit={data.education.display_limit} /></Box>
              <Box className={'card5'} display={{ xs:'none', sm: 'block', lg: 'none' }}><LanguagesCard title={data.languages.title} data={data.languages.data} limit={data.languages.display_limit} /></Box>
              <Box className={'card6'} display={{ xs: 'none', sm: 'block', lg: 'none' }}><CertificatesCard title={data.certifications.title} data={data.certifications.data} limit={data.certifications.display_limit} /></Box>
              <Box className={'card7'} display={{ xs: 'none', sm: 'block', lg: 'block' }}><OtherProfileCard title={data.other_profiles.title} data={data.other_profiles.data} limit={data.other_profiles.display_limit} /></Box>
            </Box>

            <Box
              gridColumn={{ xs: "span 12", sm: "span 6", lg: "span 8" }}
              display="flex"
              flexDirection="column"
              gap={2.5}
            >
              <Box className={'card2'}><ProjectsCard title={data.personal_projects.title} data={data.personal_projects.data} /></Box>

              <Box display="grid" gridTemplateColumns={{ sm: '1fr', md: '1fr 1fr'}} gap={2.5}>
                <Box
                  gridColumn={{ xs: "span 2", lg: "span 1" }}
                  display="flex"
                  flexDirection="column"
                  gap={2.5}
                >
                  <Box className={'card3'}><SkillsCard title={data.skills.title} data={data.skills.data} limit={data.skills.display_limit} /></Box>
                  <Box className={'card6'} display={{ xs: 'none', sm: 'none', lg: 'block' }}><CertificatesCard title={data.certifications.title} data={data.certifications.data} limit={data.certifications.display_limit} /></Box>
                  <Box className={'card4'} display={{ xs: 'none', sm: 'none', lg: 'none' }}><LanguagesCard title={data.languages.title} data={data.languages.data} limit={data.languages.display_limit} /></Box>
                </Box>

                <Box
                  gridColumn={{ xs: "span 2", lg: "span 1" }}
                  display="flex"
                  flexDirection="column"
                  gap={2.5}
                >
                  <Box className={'card4'}><FrameworksCard title={data.tools.title} data={data.tools.data} /></Box>
                  <Box className={'card5'} display={{ xs: 'block', sm: 'none', lg: 'block' }}><LanguagesCard title={data.languages.title} data={data.languages.data} limit={data.languages.display_limit} /></Box>
                  <Box className={'card6'} display={{ xs: 'block', sm: 'none', lg: 'none' }}><CertificatesCard title={data.certifications.title} data={data.certifications.data} limit={data.certifications.display_limit} /></Box>
                  <Box className={'card7'}><PublicNotesCard title={data.public_notes.title} data={publicNotesData} limit={data.public_notes.display_limit} /></Box>
                </Box>
                
              </Box>
              
            </Box>
          </Box>
        </Container>
      </Box>
      <ImageModal />
      <PublicNotesModal title={data.public_notes.title} />
    </>
  );
}
