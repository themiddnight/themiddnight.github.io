import {
  Box,
  Container,
  createTheme,
  ThemeProvider,
  CssBaseline,
  useMediaQuery,
  Zoom,
  Button,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import "./App.css";

import ProfileCard from "./components/ProfileCard";
import AboutCard from "./components/AboutCard";
import EducationCard from "./components/EducationCard";
import ExperienceCard from "./components/ExperienceCard";
import ProjectsCard from "./components/ProjectsCard";
import FrameworksCard from "./components/FrameworksCard";
import SkillsCard from "./components/SkillsCard";
import CertificatesCard from "./components/CertificatesCard";

import theme from "./theme.config";
import ImageModal from "./components/elements/ImageModal";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const darkTheme = {
    palette: {
      mode: "dark",
    },
  }
  const lightTheme = {
    palette: {
      mode: "light",
      background: {
        default: "#eeeeee",
      },
    },
  }
  const memoTheme = useMemo(
    () =>
      createTheme({
        ...theme,
        ...(prefersDarkMode ? darkTheme : lightTheme),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prefersDarkMode]
  );

  const [isEnter, setIsEnter] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageModalSrc, setImageModalSrc] = useState("");

  return (
    <ThemeProvider theme={memoTheme}>
      <CssBaseline />
      <div className={!isEnter ? "intro" : "intro fade-out"}>
        <div className="fade-in" style={{ textAlign: 'center' }}>
          <Typography variant="h2" gutterBottom>Welcome to my resume</Typography>
          <Button variant="contained" color="primary" size="large" className="pulse" onClick={() => setIsEnter(true)}>Drill in!</Button>
        </div>
      </div>
      <div className={isEnter ? "clip-circle" : "" }>
        <Container maxWidth="xl" sx={{ py: {xs: 2, sm: 3, xl: 10} }} className={!isEnter ? "intro-fix-position" : ""}>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            <Box
              gridColumn={{ xs: "span 12", sm: "span 12", md: "span 6", lg: "span 6", xl: "span 4" }}
              display="flex"
              flexDirection="column"
              gap={2}
            >
              <Zoom in={isEnter} timeout={1000}><div><ProfileCard /></div></Zoom>
              <Zoom in={isEnter} timeout={Math.random()*1000+1000}><div><AboutCard /></div></Zoom>
              <Zoom in={isEnter} timeout={Math.random()*1000+1000}><div><EducationCard /></div></Zoom>
              <Zoom in={isEnter} timeout={Math.random()*1000+1000}><div><ExperienceCard /></div></Zoom>
            </Box>

            <Box
              gridColumn={{ xs: "span 12", sm: "span 12", md: "span 6", lg: "span 6", xl: "span 8" }}
              display="flex"
              flexDirection="column"
              gap={2}
            >
              <Zoom in={isEnter} timeout={Math.random()*1000+1000}><div><ProjectsCard /></div></Zoom>

              <Box display="grid" gridTemplateColumns={{ sm: '1fr', md: '1fr 1fr'}} gap={2}>
                <Box
                  gridColumn={{ xs: "span 2", lg: "span 2", xl: "span 1" }}
                  display="flex"
                  flexDirection="column"
                  gap={2}
                >
                  <Zoom in={isEnter} timeout={Math.random()*1000+1000}><div><FrameworksCard /></div></Zoom>
                </Box>

                <Box
                  gridColumn={{ xs: "span 2", lg: "span 2", xl: "span 1" }}
                  display="flex"
                  flexDirection="column"
                  gap={2}
                >
                  <Zoom in={isEnter} timeout={Math.random()*1000+1000}><div><SkillsCard /></div></Zoom>
                  <Zoom in={isEnter} timeout={Math.random()*1000+1000}><div><CertificatesCard  setOpen={setIsImageModalOpen} setImageModalSrc={setImageModalSrc} /></div></Zoom>
                </Box>
                
              </Box>
              
            </Box>
          </Box>
        </Container>
      </div>
      <ImageModal open={isImageModalOpen} setOpen={setIsImageModalOpen} image={imageModalSrc} />
    </ThemeProvider>
  );
}

export default App;
