import {
  Box,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import {
  fetchResumeSectionData,
  updateResumeSectionData,
} from "../../utils/fetch";

import { 
  EditPageTemplateHeader,
  EditPageTemplateFooter,
} from "../elements/EditPageTemplate";
import PublicNotesCard from "../home/PublicNotesCard";
import EditButtons from "../elements/EditButtons";

export default function EditPublicNotesPage({ resumeId, setIsSaveSuccess, setActiveData, setMessage }) {
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
    try {
      const result = await updateResumeSectionData(resumeId, "public_notes", data);
      setMessage(result);
      setIsSaveSuccess(null);
      setTimeout(() => {
        setIsSaveSuccess(true);
        fetchData(resumeId);
        setActiveData({ public_notes: data.active });
        setIsSaving(false);
      }, 100);
    } catch (error) {
      setMessage(error);
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
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100dvh"}>
          <CircularProgress />
        </Box>
    );
  }

  return (
    <>
      <EditPageTemplateHeader
        title="Edit Public Notes"
        dataTitle={data.title}
        dataSubtitle={data.subtitle}
        dataActive={data.active}
        dataDisplayLimit={data.display_limit}
        onChange={(key, value) => setData({ ...data, [key]: value })}
      />
      
      <EditPageTemplateFooter
        dataActive={data.active}
        isSaving={isSaving}
        onSave={handleSubmit}
        previewelement={<PublicNotesCard resumeId={resumeId} data={data} />}
        mt={2}
      />

      <EditButtons 
        isSaving={isSaving}
        onSubmit={handleSubmit}
      />
    </>
  );
}

EditPublicNotesPage.propTypes = {
  resumeId: PropTypes.string,
  setIsSaveSuccess: PropTypes.func,
  setActiveData: PropTypes.func,
  setMessage: PropTypes.func.isRequired,
};