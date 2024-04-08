import { Box, Container, Typography, CircularProgress } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

import Themes from "../Themes";
import { fetchResume } from "../utils/fetch";

import IntroScreen from "../components/home/IntroScreen";
import ProfileCard from "../components/home/ProfileCard";
import AboutCard from "../components/home/AboutCard";
import EducationCard from "../components/home/EducationCard";
import ExperienceCard from "../components/home/ExperienceCard";
import ProjectsCard from "../components/home/ProjectsCard";
import ToolsCard from "../components/home/ToolsCard";
import SkillsCard from "../components/home/SkillsCard";
import CertificationsCard from "../components/home/CertificationsCard";
import LanguagesCard from "../components/home/LanguagesCard";
import OtherProfileCard from "../components/home/OtherProfileCard";
import PublicNotesCard from "../components/home/PublicNotesCard";
import ImageModal from "../components/modals/ImageModal";

export default function HomePage() {
  const resumeId = useParams().resumeId || import.meta.env.VITE_RESUME_ID;
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

  const fetchData = useCallback(async (resumeId) => {
    try {
      const data = await fetchResume(resumeId);
      setData(data);
      setIsDataLoaded(true);
      if (sessionStorage.getItem("isEntered")) {
        setIsEnter(true);
        setIsEntered(true);
      }
    } catch (error) {
      console.error(error);
      setData({ status_code: 404, message: "Resume not found" });
      setIsDataLoaded(true);
    }
  }, []);
  
  useEffect(() => {
    if (sessionStorage.getItem("resumeId") !== resumeId) {
      sessionStorage.removeItem("isEntered");
    }
    fetchData(resumeId);
    sessionStorage.setItem("resumeId", resumeId);
  }, [fetchData, resumeId]);

  const BoxCenter = ({ children }) => (
    <Box
      position={'fixed'}
      top={0} left={0} right={0} bottom={0}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      className={"basic-bg"}
    >
      {children}
    </Box>
  );
  BoxCenter.propTypes = {
    children: PropTypes.node,
  };

  const Header = () => {
    return (
      <Helmet>
        <title>{data.profile.title}&apos;s {data.summary.resume_name} - Resume</title>
        <meta name="description" content={data.about.data[0].content ? data.about.data[0].content : `${data.profile.title}'s ${data.summary.resume_name}`} />
        <meta name="author" content={data.profile.title} />
        <meta name="keywords" content={`${data.profile.title}, ${data.summary.resume_name}`} />

        <meta property="og:title" content={`${data.profile.title}'s ${data.summary.resume_name}`} />
        <meta property="og:description" content={data.about.data[0].content ? data.about.data[0].content : `${data.profile.title}'s ${data.summary.resume_name}`} />
        <meta property="og:url" content={`https://themiddnight.github.io/${resumeId}`} />
        <meta property="og:site_name" content={`${data.profile.title}'s ${data.summary.resume_name}`} />

        <meta name="twitter:title" content={`${data.profile.title}'s ${data.summary.resume_name}`} />
        <meta name="twitter:description" content={data.about.data[0].content ? data.about.data[0].content : `${data.profile.title}'s ${data.summary.resume_name}`} />
      </Helmet>
    );
  }

  if (!isDataLoaded) {
    return (
      <Themes>
        <BoxCenter>
          <CircularProgress size={50} color="inherit" sx={{ opacity: 0.5 }} />
          <Typography mt={3} sx={{ opacity: 0.5 }}>Wait a sec...</Typography>
        </BoxCenter>
      </Themes>
    )
  } else if (data.message) {
    return (
      <Themes>
        <BoxCenter>
          <Typography variant="h2" sx={{ opacity: 0.5 }}>{data.status_code}</Typography>
          <Typography variant="h4" fontWeight={'light'} sx={{ opacity: 0.5 }}>{data.message}</Typography>
        </BoxCenter>
      </Themes>
    )
  } else if (!isEntered) {
    return (
      <Themes>
      <Header />
        <BoxCenter>
          {console.log(typeof data.settings.layout)}
          <IntroScreen data={data.settings} isEnter={isEnter} onEnter={handleEnter} />
        </BoxCenter>
      </Themes>
    )
  } else if (data.settings.layout === 0) {
    return (
      <Themes bgMode={data.settings.background_mode}>
        <Header />
        <Box>
          <Container maxWidth="xl" sx={{ py: {xs: 2, sm: 3, xl: 8} }}>
            <Box display="grid" gridTemplateColumns="repeat(10, 1fr)" gap={2.5}>
              <Box
                gridColumn={{ xs: "span 10", sm: "span 5", lg: "span 4" }}
                display="flex"
                flexDirection="column"
                gap={2.5}
              >
                <Box className={'card1'}><ProfileCard data={data.profile} /></Box>
                {data.about.active && <Box className={'card2'}><AboutCard data={data.about} /></Box>}
                {data.experiences.active && <Box className={'card3'}><ExperienceCard data={data.experiences} /></Box>}
                {data.education.active && <Box className={'card4'}><EducationCard data={data.education} /></Box>}
                {data.languages.active && <Box className={'card5'}><LanguagesCard data={data.languages} /></Box>}
                {data.public_notes.active && <Box className={'card7'}><PublicNotesCard resumeId={resumeId} data={data.public_notes} /></Box>}
              </Box>
              <Box
                gridColumn={{ xs: "span 10", sm: "span 5", lg: "span 6" }}
                display="flex"
                flexDirection="column"
                gap={2.5}
                >
                {data.projects.active && <Box className={'card2'}><ProjectsCard data={data.projects} /></Box>}
                {data.skills.active && <Box className={'card3'}><SkillsCard data={data.skills} /></Box>}
                {data.tools.active && <Box className={'card4'}><ToolsCard data={data.tools} /></Box>}
                {data.certifications.active && <Box className={'card6'}><CertificationsCard data={data.certifications} /></Box>}
                {data.other_links.active && <Box className={'card7'}><OtherProfileCard data={data.other_links} /></Box>}
              </Box>
            </Box>
          </Container>
        </Box>
        <ImageModal />
      </Themes>
    )
  } 

  return (
    <Themes bgMode={data.settings.background_mode}>
      <Header />
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
              {data.about.active && <Box className={'card2'}><AboutCard data={data.about} /></Box>}
              {data.experiences.active && <Box className={'card3'}><ExperienceCard data={data.experiences} /></Box>}
              {data.education.active && <Box className={'card4'}><EducationCard data={data.education} /></Box>}
              {data.languages.active && <Box className={'card5'} display={{ xs:'none', sm: 'block', lg: 'none' }}><LanguagesCard data={data.languages} /></Box>}
              {data.other_links.active && <Box className={'card7'} display={{ xs: 'none', sm: 'block', lg: 'none' }}><OtherProfileCard data={data.other_links} /></Box>}
              {data.public_notes.active && <Box className={'card7'} display={{ xs: 'none', sm: 'block', lg: 'block' }}><PublicNotesCard resumeId={resumeId} data={data.public_notes} /></Box>}
            </Box>

            <Box
              gridColumn={{ xs: "span 12", sm: "span 6", lg: "span 8" }}
              display="flex"
              flexDirection="column"
              gap={2.5}
            >
              {data.projects.active && <Box className={'card2'}><ProjectsCard data={data.projects} /></Box>}

              <Box display="grid" gridTemplateColumns={{ sm: '1fr', md: '1fr 1fr'}} gap={2.5}>
                <Box
                  gridColumn={{ xs: "span 2", lg: "span 1" }}
                  display="flex"
                  flexDirection="column"
                  gap={2.5}
                >
                  {data.skills.active && <Box className={'card3'}><SkillsCard data={data.skills} /></Box>}
                  {data.languages.active && <Box className={'card4'} display={{ xs: 'none', sm: 'none', lg: 'block' }}><LanguagesCard data={data.languages} /></Box>}
                </Box>

                <Box
                  gridColumn={{ xs: "span 2", lg: "span 1" }}
                  display="flex"
                  flexDirection="column"
                  gap={2.5}
                >
                  {data.tools.active && <Box className={'card4'}><ToolsCard data={data.tools} /></Box>}
                  {data.languages.active && <Box className={'card4'} display={{ xs: 'block', sm: 'none', lg: 'none' }}><LanguagesCard data={data.languages} /></Box>}
                  {data.certifications.active && <Box className={'card6'}><CertificationsCard data={data.certifications} /></Box>}
                  {data.other_links.active && <Box className={'card7'} display={{ xs: 'block', sm: 'none', lg: 'block' }}><OtherProfileCard data={data.other_links} /></Box>}
                  {data.public_notes.active && <Box className={'card7'} display={{ xs: 'block', sm: 'none', lg: 'none' }}><PublicNotesCard resumeId={resumeId} data={data.public_notes} /></Box>}
                </Box>
                
              </Box>
              
            </Box>
          </Box>
        </Container>
      </Box>
      <ImageModal />
    </Themes>
  );
}
