import {
  Box,
  Container,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { List } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import {
  fetchResumeSummary,
  // fetchResumeSectionData,
  // updateResumeSectionData,
} from "../utils/fetch";

import Themes from "../Themes";
import EditSidebar from "../components/elements/EditSidebar";

import EditProfilePage from "../components/edit/EditProfilePage";
import EditAboutPage from "../components/edit/EditAboutPage";
import EditExperiencesPage from "../components/edit/EditExperiencesPage";
import EditEducationPage from "../components/edit/EditEducationPage";
import EditProjectsPage from "../components/edit/EditProjectsPage";
import EditSkillsPage from "../components/edit/EditSkillsPage";
import EditCollectionsPage from "../components/edit/EditCollectionsPage";
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
  { name: "collections", title: "Collections" },
  { name: "languages", title: "Languages" },
  { name: "certifications", title: "Certifications" },
  { name: "other_links", title: "Other Links" },
  { name: "public_notes", title: "Public Notes" },
];

export default function EditPage() {
  const { resumeId } = useParams();

  const [sidebarData, setSidebarData] = useState({});
  const [isSidebarLoaded, setIsSidebarLoaded] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [isSidebarHidden, setIsSidebarHidden] = useState(true);
  const [currentPage, setCurrentPage] = useState(pageList[0]);
  const [isSaveSuccess, setIsSaveSuccess] = useState(null);
  const [message, setMessage] = useState("");
  const [activeData, setActiveData] = useState({});

  function handleChangePage(page) {
    setSearchParams({ page: page.name });
    setIsSidebarHidden(true);
    // if the page is the same, reset the page
    if (page.name === currentPage.name) setCurrentPage({})
    setTimeout(() => {
      setCurrentPage(page);
    }, 100)
  }

  // set current page from search params
  useEffect(() => {
    const page = pageList.find(page => page.name === searchParams.get("page"));
    if (page) setCurrentPage(page);
  }, [searchParams]);

  // lock scroll when sidebar is open
  useEffect(() => {
    if (!isSidebarHidden) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "scroll";
  }, [isSidebarHidden]);

  // update active section in sidebar when active data is changed
  useEffect(() => {
    const newActiveData = { ...sidebarData.data_active, ...activeData };
    setSidebarData({ ...sidebarData, data_active: newActiveData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeData]);

  // fetch summary data to sidebar
  useEffect(() => {
    fetchResumeSummary(resumeId)
      .then((data) => {
        setSidebarData(data);
        setIsSidebarLoaded(true);
      })
      .catch(() => {
        // if resume is not own by user, redirect to create page
        window.location.href = "/#/create"; 
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeId]);

  if (!isSidebarLoaded) {
    return (
      <Themes>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"100dvh"}
        >
          <CircularProgress />
        </Box>
      </Themes>
    );
  }

  return (
    <Themes>
      <Helmet>
        <title>{sidebarData.owner} - Edit Resume</title>
      </Helmet>

      {/*  */}
      <IconButton
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          top: 0,
          right: 0,
          zIndex: 999,
          m: 2,
          borderRadius: 2,
          p: 0.6,
          pb: 0,
          border: 1,
          borderColor: "divider",
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

      <Box display={"flex"}>
        {/* sidebar */}
        <EditSidebar
          resumeId={resumeId}
          data={sidebarData}
          isSidebarHidden={isSidebarHidden}
          currentPage={currentPage}
          pageList={pageList}
          onClick={(index) => handleChangePage(pageList[index])}
        />

        <Container sx={{ px: { xs: 0, md: 1 } }}>
          {/* alear box */}
          <Snackbar
            open={isSaveSuccess === true}
            autoHideDuration={5000}
            onClose={() => setIsSaveSuccess(null)}
          >
            <Alert
              severity="success"
              onClose={() => setIsSaveSuccess(null)}
            >{`${message}`}</Alert>
          </Snackbar>
          <Snackbar
            open={isSaveSuccess === false}
            onClose={() => setIsSaveSuccess(null)}
          >
            <Alert
              severity="error"
              onClose={() => setIsSaveSuccess(null)}
            >{`Something wrong: ${message}`}</Alert>
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
          {currentPage.name === "collections" && (
            <EditCollectionsPage
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
