import {
  Box,
  Container,
  Zoom,
  Button,
  Typography,
} from "@mui/material";
import { useState } from "react";

import ProfileCard from "./components/ProfileCard";
import AboutCard from "./components/AboutCard";
import EducationCard from "./components/EducationCard";
import ExperienceCard from "./components/ExperienceCard";
import ProjectsCard from "./components/ProjectsCard";
import FrameworksCard from "./components/FrameworksCard";
import SkillsCard from "./components/SkillsCard";
import CertificatesCard from "./components/CertificatesCard";

import ImageModal from "./components/elements/ImageModal";
import LanguagesCard from "./components/LanguagesCard";

function Home() {
  const [isEnter, setIsEnter] = useState(false);
  const [isEntered, setIsEntered] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageModalSrc, setImageModalSrc] = useState("");

  function handleEnter() {
    setIsEnter(true);
    setTimeout(() => {
      setIsEntered(true);
    }, 300);
  }

  if (!isEntered) {
    return (
      <Box 
        position={'fixed'}
        top={0} left={0} right={0} bottom={0}
        zIndex={10}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        className={isEnter ? "fade-out" : ""}
      >
        <Box className={!isEnter ? "fade-in" : "scale-up"} style={{ textAlign: 'center' }}>
          <Typography variant="h2">Hello!</Typography>
          <Typography variant="h3" fontWeight={'light'} mb={5} gutterBottom>Welcome to my resume</Typography>
          <Button variant="contained" color="primary" size="large" className="pulse" onClick={handleEnter}>Drill in!</Button>
        </Box>
      </Box>
    )
  }

  return (
    <>
      <Box>
        <Container maxWidth="xl" sx={{ py: {xs: 2, sm: 3, xl: 10} }}>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            <Box
              gridColumn={{ xs: "span 12", sm: "span 12", md: "span 6", lg: "span 6", xl: "span 4" }}
              display="flex"
              flexDirection="column"
              gap={2}
            >
              <Zoom in={isEnter} timeout={1000}><div><ProfileCard /></div></Zoom>
              <Zoom in={isEnter} timeout={Math.random()*1000+500}><div><AboutCard /></div></Zoom>
              <Zoom in={isEnter} timeout={Math.random()*1000+500}><div><EducationCard /></div></Zoom>
              <Zoom in={isEnter} timeout={Math.random()*1000+500}><div><ExperienceCard /></div></Zoom>
            </Box>

            <Box
              gridColumn={{ xs: "span 12", sm: "span 12", md: "span 6", lg: "span 6", xl: "span 8" }}
              display="flex"
              flexDirection="column"
              gap={2}
            >
              <Zoom in={isEnter} timeout={Math.random()*1000+500}><div><ProjectsCard /></div></Zoom>

              <Box display="grid" gridTemplateColumns={{ sm: '1fr', md: '1fr 1fr'}} gap={2}>
                <Box
                  gridColumn={{ xs: "span 2", lg: "span 2", xl: "span 1" }}
                  display="flex"
                  flexDirection="column"
                  gap={2}
                >
                  <Zoom in={isEnter} timeout={Math.random()*1000+500}><div><LanguagesCard /></div></Zoom>
                  <Zoom in={isEnter} timeout={Math.random()*1000+500}><div><SkillsCard /></div></Zoom>
                </Box>

                <Box
                  gridColumn={{ xs: "span 2", lg: "span 2", xl: "span 1" }}
                  display="flex"
                  flexDirection="column"
                  gap={2}
                >
                  <Zoom in={isEnter} timeout={Math.random()*1000+500}><div><FrameworksCard /></div></Zoom>
                  <Zoom in={isEnter} timeout={Math.random()*1000+500}><div><CertificatesCard  setOpen={setIsImageModalOpen} setImageModalSrc={setImageModalSrc} /></div></Zoom>
                </Box>
                
              </Box>
              
            </Box>
          </Box>
        </Container>
      </Box>
      <ImageModal open={isImageModalOpen} setOpen={setIsImageModalOpen} image={imageModalSrc} />
    </>
  );
}

export default Home;
