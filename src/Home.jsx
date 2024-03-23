import { Box, Container, Button, Typography, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";

import { fetchData } from "./utils/fetch";

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
    fetchData().then((data) => {
      setData(data);
      setIsDataLoaded(true);
      if (sessionStorage.getItem("isEntered")) {
        setIsEnter(true);
        setIsEntered(true);
      }
    });
  }, []);

  if (!isDataLoaded) {
    return (
      <Box
        position={'fixed'}
        top={0} left={0} right={0} bottom={0}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        className={"basic-bg"}
      >
        <CircularProgress size={50} color="inherit" sx={{ opacity: 0.5 }} />
      </Box>
    )
  } else if (!isEntered) {
    return (
      <Box 
        position={'fixed'}
        top={0} left={0} right={0} bottom={0}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        className={!isEnter ? "basic-bg" : "basic-bg intro-fade-out__div"}
      >
        <Box textAlign={'center'} className={!isEnter ? "intro-in__text" : "intro-out__text"}>
          <Typography variant="h2">{data.intro.title}</Typography>
          <Typography variant="h4" fontWeight={'light'} mb={5} gutterBottom>{data.intro.subtitle}</Typography>
        </Box>
        <Button 
          variant={isEnter ? "contained" : "outlined"}
          color="primary" 
          size="large" 
          className={!isEnter ? "intro-in__button pulse" : "intro-out__button"}
          onClick={handleEnter}
          sx={{ borderRadius: 50 }}
        >
          {data.intro.enter_button}
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
              {data.about.active && <Box className={'card2'}><AboutCard title={data.about.title} data={data.about.data} /></Box>}
              {data.experiences.active && <Box className={'card3'}><ExperienceCard title={data.experiences.title} data={data.experiences.data} limit={data.experiences.display_limit} /></Box>}
              {data.education.active && <Box className={'card4'}><EducationCard title={data.education.title} data={data.education.data} limit={data.education.display_limit} /></Box>}
              {data.languages.active && <Box className={'card5'} display={{ xs:'none', sm: 'block', lg: 'none' }}><LanguagesCard title={data.languages.title} data={data.languages.data} limit={data.languages.display_limit} /></Box>}
              {data.certifications.active && <Box className={'card6'} display={{ xs: 'none', sm: 'block', lg: 'none' }}><CertificatesCard title={data.certifications.title} data={data.certifications.data} limit={data.certifications.display_limit} /></Box>}
              {data.other_profiles.active && <Box className={'card7'} display={{ xs: 'none', sm: 'block', lg: 'block' }}><OtherProfileCard title={data.other_profiles.title} data={data.other_profiles.data} limit={data.other_profiles.display_limit} /></Box>}
            </Box>

            <Box
              gridColumn={{ xs: "span 12", sm: "span 6", lg: "span 8" }}
              display="flex"
              flexDirection="column"
              gap={2.5}
            >
              {data.personal_projects.active && <Box className={'card2'}><ProjectsCard title={data.personal_projects.title} data={data.personal_projects.data} /></Box>}

              <Box display="grid" gridTemplateColumns={{ sm: '1fr', md: '1fr 1fr'}} gap={2.5}>
                <Box
                  gridColumn={{ xs: "span 2", lg: "span 1" }}
                  display="flex"
                  flexDirection="column"
                  gap={2.5}
                >
                  {data.skills.active && <Box className={'card3'}><SkillsCard title={data.skills.title} data={data.skills.data} limit={data.skills.display_limit} /></Box>}
                  {data.certifications.active && <Box className={'card6'} display={{ xs: 'none', sm: 'none', lg: 'block' }}><CertificatesCard title={data.certifications.title} data={data.certifications.data} limit={data.certifications.display_limit} /></Box>}
                  {data.languages.active && <Box className={'card4'} display={{ xs: 'none', sm: 'none', lg: 'none' }}><LanguagesCard title={data.languages.title} data={data.languages.data} limit={data.languages.display_limit} /></Box>}
                </Box>

                <Box
                  gridColumn={{ xs: "span 2", lg: "span 1" }}
                  display="flex"
                  flexDirection="column"
                  gap={2.5}
                >
                  {data.tools.active && <Box className={'card4'}><FrameworksCard title={data.tools.title} data={data.tools.data} /></Box>}
                  {data.languages.active && <Box className={'card5'} display={{ xs: 'block', sm: 'none', lg: 'block' }}><LanguagesCard title={data.languages.title} data={data.languages.data} limit={data.languages.display_limit} /></Box>}
                  {data.certifications.active && <Box className={'card6'} display={{ xs: 'block', sm: 'none', lg: 'none' }}><CertificatesCard title={data.certifications.title} data={data.certifications.data} limit={data.certifications.display_limit} /></Box>}
                  {data.other_profiles.active && <Box className={'card7'} display={{ xs: 'block', sm: 'none', lg: 'none' }}><OtherProfileCard title={data.other_profiles.title} data={data.other_profiles.data} limit={data.other_profiles.display_limit} /></Box>}
                  {data.public_notes.active && <Box className={'card7'}><PublicNotesCard title={data.public_notes.title} limit={data.public_notes.display_limit} /></Box>}
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
