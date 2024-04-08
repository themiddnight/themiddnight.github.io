import { Box, Container, IconButton } from "@mui/material";
import { MenuRounded, KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import Themes from "../Themes";
import EditSidebar from "../components/elements/EditSidebar";
import { SuccessAlert, ErrorAlert } from "../components/elements/Alert";

import EditProfilePage from "../components/edit/EditProfilePage";
import EditAboutPage from "../components/edit/EditAboutPage";
import EditExperiencesPage from "../components/edit/EditExperiencesPage";
import EditEducationPage from "../components/edit/EditEducationPage";
import EditProjectsPage from "../components/edit/EditProjectsPage";
import EditSkillsPage from "../components/edit/EditSkillsPage";
import EditToolsPage from "../components/edit/EditToolsPage";
import EditLanguagesPage from "../components/edit/EditLanguagesPage";
import EditCertificationsPage from "../components/edit/EditCertificationsPage";
import EditOtherLinksPage from "../components/edit/EditOtherLinksPage";
import EditPublicNotesPage from "../components/edit/EditPublicNotesPage";
import EditSettingsPage from "../components/edit/EditSettingsPage";

const pageList = [
  { name: "settings", title: "Settings" },
  { name: "profile", title: "Profile" },
  { name: "about", title: "About" },
  { name: "experiences", title: "Experiences" },
  { name: "education", title: "Education" },
  { name: "projects", title: "Projects" },
  { name: "skills", title: "Skills" },
  { name: "tools", title: "Tools" },
  { name: "languages", title: "Languages" },
  { name: "certifications", title: "Certifications" },
  { name: "other_links", title: "Other Links" },
  { name: "public_notes", title: "Public Notes" },
];

export default function EditPage() {
  const { resumeId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSidebarHidden, setIsSidebarHidden] = useState(true);
  const [currentPage, setCurrentPage] = useState(pageList[0]);
  const [isSaveSuccess, setIsSaveSuccess] = useState(null);
  const [activeData, setActiveData] = useState({});

  function handleChangePage(page){
    setCurrentPage({});
    setSearchParams({ page: page.name });
    setTimeout(() => {
      setCurrentPage(page);
      setIsSidebarHidden(true);
    }, 50);
  }

  useEffect(() => {
    const page = pageList.find((page) => page.name === searchParams.get("page"));
    if (page) {
      setCurrentPage(page);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isSidebarHidden) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll"
    }
  }, [isSidebarHidden]);

  return (
    <Themes>
      <Helmet>
        <title>Edit Resume</title>
      </Helmet>

      {/*  */}
      <IconButton
        sx={{ display: { xs: "block", md: "none" }, position: "fixed", top: 0, right: 0, zIndex: 999, m: 2 }}
        onClick={() => setIsSidebarHidden(!isSidebarHidden)}
      >
        <MenuRounded />
      </IconButton>

      <IconButton
        sx={{ position: "fixed", top: 50, right: 0, zIndex: 999, m: 2 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <KeyboardArrowUp />
      </IconButton>

      <IconButton
        sx={{ position: "fixed", top: 100, right: 0, zIndex: 999, m: 2 }}
        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
      >
        <KeyboardArrowDown />
      </IconButton>
      
      {/* backdrop */}
      <Box
        display={{ xs: isSidebarHidden ? "none" : "block", md: "none" }}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100dvh",
          bgcolor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(10px)",
          zIndex: 996,
        }}
        onClick={() => setIsSidebarHidden(!isSidebarHidden)}
      />

      {/* sidebar */}
      <Box display={"flex"}>
        <EditSidebar 
          resumeId={resumeId} 
          isSidebarHidden={isSidebarHidden} 
          updateActiveData={activeData}
          currentPage={currentPage}
          pageList={pageList}
          onClick={(index) => handleChangePage(pageList[index])}
        />

        <Container sx={{ px: { xs: 0, md: 1 } }}>

          {/* alear box */}
          <Box position={"fixed"} top={0} left={0} right={0} zIndex={998}>
            {isSaveSuccess === true && <SuccessAlert message="Saved successfully" />}
            {isSaveSuccess === false && <ErrorAlert message="Failed to save" />}
          </Box>

          {/* edit pages */}
          {currentPage.name === "settings" && (
            <EditSettingsPage
              resumeId={resumeId}
              setIsSaveSuccess={setIsSaveSuccess}
            />
          )}
          {currentPage.name === "profile" && (
            <EditProfilePage
              resumeId={resumeId}
              setIsSaveSuccess={setIsSaveSuccess}
            />
          )}
          {currentPage.name === "about" && (
            <EditAboutPage
              resumeId={resumeId}
              setActiveData={setActiveData}
              setIsSaveSuccess={setIsSaveSuccess}
            />
          )}
          {currentPage.name === "experiences" && (
            <EditExperiencesPage
              resumeId={resumeId}
              setActiveData={setActiveData}
              setIsSaveSuccess={setIsSaveSuccess}
            />
          )}
          {currentPage.name === "education" && (
            <EditEducationPage
              resumeId={resumeId}
              setActiveData={setActiveData}
              setIsSaveSuccess={setIsSaveSuccess}
            />
          )}
          {currentPage.name === "projects" && (
            <EditProjectsPage
              resumeId={resumeId}
              setActiveData={setActiveData}
              setIsSaveSuccess={setIsSaveSuccess}
            />
          )}
          {currentPage.name === "skills" && (
            <EditSkillsPage
              resumeId={resumeId}
              setActiveData={setActiveData}
              setIsSaveSuccess={setIsSaveSuccess}
            />
          )}
          {currentPage.name === "tools" && (
            <EditToolsPage
              resumeId={resumeId}
              setActiveData={setActiveData}
              setIsSaveSuccess={setIsSaveSuccess}
            />
          )}
          {currentPage.name === "languages" && (
            <EditLanguagesPage
              resumeId={resumeId}
              setActiveData={setActiveData}
              setIsSaveSuccess={setIsSaveSuccess}
            />
          )}
          {currentPage.name === "certifications" && (
            <EditCertificationsPage
              resumeId={resumeId}
              setActiveData={setActiveData}
              setIsSaveSuccess={setIsSaveSuccess}
            />
          )}
          {currentPage.name === "other_links" && (
            <EditOtherLinksPage
              resumeId={resumeId}
              setActiveData={setActiveData}
              setIsSaveSuccess={setIsSaveSuccess}
            />
          )}
          {currentPage.name === "public_notes" && (
            <EditPublicNotesPage
              resumeId={resumeId}
              setActiveData={setActiveData}
              setIsSaveSuccess={setIsSaveSuccess}
            />
          )}
        </Container>
      </Box>
    </Themes>
  );
}
