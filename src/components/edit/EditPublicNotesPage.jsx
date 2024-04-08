import {
  Box,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import {
  fetchResumeSectionData,
  postResumeSectionData,
} from "../../utils/fetch";

import { 
  EditPageTemplateHeader,
  EditPageTemplateFooter,
} from "../elements/EditPageTemplate";
import PublicNotesCard from "../home/PublicNotesCard";

export default function EditPublicNotesPage({ resumeId, setIsSaveSuccess, setActiveData }) {
  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchData = useCallback(async (resumeId) => {
    try {
      const data = await fetchResumeSectionData(resumeId, "public_notes");
      setData(data);
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  } , []);

  const handleSubmit = async () => {
    setIsSaving(true);
    setActiveData({ public_notes: data.active });
    try {
      await postResumeSectionData(resumeId, "public_notes", data);
      setIsSaveSuccess(null);
      setTimeout(() => {
        setIsSaveSuccess(true);
        fetchData(resumeId);
        setIsSaving(false);
      }, 100);
    } catch (error) {
      setIsSaveSuccess(null);
      setTimeout(() => {
        setIsSaveSuccess(false);
        setIsSaving(false);
      }, 100);
    }
  }

  useEffect(() => {
    fetchData(resumeId);
  }, [fetchData, resumeId]);

  if (!isLoaded) {
    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100vh"}>
          <CircularProgress />
        </Box>
    );
  }

  return (
    <>
      <EditPageTemplateHeader
        title="Edit About"
        dataTitle={data.title}
        dataSubtitle={data.subtitle}
        dataActive={data.active}
        dataDisplayLimit={data.display_limit}
        onChange={(key, value) => setData({ ...data, [key]: value })}
      />
      
      <EditPageTemplateFooter
        isSaving={isSaving}
        dataActive={data.active}
        onSubmit={handleSubmit}
        previewelement={<PublicNotesCard resumeId={resumeId} data={data} />}
        mt={2}
      />
    </>
  );
}

EditPublicNotesPage.propTypes = {
  resumeId: PropTypes.string,
  setIsSaveSuccess: PropTypes.func,
  setActiveData: PropTypes.func,
};