import { Box, Container, IconButton, Snackbar, Alert } from "@mui/material";
import { List } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import Themes from "../Themes";
import EditSidebar from "../components/elements/EditSidebar";

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
  const [message, setMessage] = useState("");
  const [activeData, setActiveData] = useState({});

  function handleChangePage(page){
    setSearchParams({ page: page.name });
    setIsSidebarHidden(true);
    if (searchParams.get("page") === page.name) {
      // refresh page
      setCurrentPage({});
      setTimeout(() => {
        setCurrentPage(page);
      }, 50);
    }
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
        sx={{ 
          display: { xs: "block", md: "none" }, 
          position: "fixed", top: 0, right: 0, zIndex: 999, m: 2, 
          borderRadius: 2, p: 0.6, pb: 0,
          border: 1, borderColor: "divider",
          boxShadow: 1,
          backdropFilter: "blur(10px)",
        }}
        onClick={() => setIsSidebarHidden(!isSidebarHidden)}
      >
        <List />
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
          <Snackbar open={isSaveSuccess === true} autoHideDuration={5000} onClose={() => setIsSaveSuccess(null)}>
            <Alert severity="success" onClose={() => setIsSaveSuccess(null)}>{message}</Alert>
          </Snackbar>
          <Snackbar open={isSaveSuccess === false} onClose={() => setIsSaveSuccess(null)}>
            <Alert severity="error" onClose={() => setIsSaveSuccess(null)}>{`Something wrong: ${message}`}</Alert>
          </Snackbar>

          {/* edit pages */}
          {currentPage.name === "settings" && (
            <EditSettingsPage
              resumeId={resumeId}
              setIsSaveSuccess={setIsSaveSuccess}
              setMessage={setMessage}
            />
          )}
          {currentPage.name === "profile" && (
            <EditProfilePage
              resumeId={resumeId}
              setIsSaveSuccess={setIsSaveSuccess}
              setMessage={setMessage}
            />
          )}
          {currentPage.name === "about" && (
            <EditAboutPage
              resumeId={resumeId}
              setActiveData={setActiveData}
              setIsSaveSuccess={setIsSaveSuccess}
              setMessage={setMessage}
            />
          )}
          {currentPage.name === "experiences" && (
            <EditExperiencesPage
              resumeId={resumeId}
              setActiveData={setActiveData}
              setIsSaveSuccess={setIsSaveSuccess}
              setMessage={setMessage}
            />
          )}
          {currentPage.name === "education" && (
            <EditEducationPage
              resumeId={resumeId}
              setActiveData={setActiveData}
              setIsSaveSuccess={setIsSaveSuccess}
              setMessage={setMessage}
            />
          )}
          {currentPage.name === "projects" && (
            <EditProjectsPage
              resumeId={resumeId}
              setActiveData={setActiveData}
              setIsSaveSuccess={setIsSaveSuccess}
              setMessage={setMessage}
            />
          )}
          {currentPage.name === "skills" && (
            <EditSkillsPage
              resumeId={resumeId}
              setActiveData={setActiveData}
              setIsSaveSuccess={setIsSaveSuccess}
              setMessage={setMessage}
            />
          )}
          {currentPage.name === "tools" && (
            <EditToolsPage
              resumeId={resumeId}
              setActiveData={setActiveData}
              setIsSaveSuccess={setIsSaveSuccess}
              setMessage={setMessage}
            />
          )}
          {currentPage.name === "languages" && (
            <EditLanguagesPage
              resumeId={resumeId}
              setActiveData={setActiveData}
              setIsSaveSuccess={setIsSaveSuccess}
              setMessage={setMessage}
            />
          )}
          {currentPage.name === "certifications" && (
            <EditCertificationsPage
              resumeId={resumeId}
              setActiveData={setActiveData}
              setIsSaveSuccess={setIsSaveSuccess}
              setMessage={setMessage}
            />
          )}
          {currentPage.name === "other_links" && (
            <EditOtherLinksPage
              resumeId={resumeId}
              setActiveData={setActiveData}
              setIsSaveSuccess={setIsSaveSuccess}
              setMessage={setMessage}
            />
          )}
          {currentPage.name === "public_notes" && (
            <EditPublicNotesPage
              resumeId={resumeId}
              setActiveData={setActiveData}
              setIsSaveSuccess={setIsSaveSuccess}
              setMessage={setMessage}
            />
          )}
        </Container>
      </Box>
    </Themes>
  );
}
