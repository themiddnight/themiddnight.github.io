import {
  Box,
  Typography,
  Divider,
  TextField,
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
import AboutCard from "../home/AboutCard";

export default function EditAboutPage({ resumeId, setIsSaveSuccess, setActiveData }) {
  const [data, setData] = useState({});
  const [texts, setTexts] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchData = useCallback(async (resumeId) => {
    try {
      const data = await fetchResumeSectionData(resumeId, "about");
      setData(data);
      setTexts(data.data.map((item) => item.content).join("\n\n"));
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  } , []);

  const handleSubmit = async () => {
    setIsSaving(true);
    setActiveData({ about: data.active });
    try {
      await postResumeSectionData(resumeId, "about", data);
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
        disableDisplayLimit
        onChange={(key, value) => setData({ ...data, [key]: value })}
      />

      <Box p={2} sx={{ opacity: data.active ? 1 : 0.5 }}>
        <Typography variant="h6" gutterBottom>
          Description
        </Typography>
        <Box
          display={"flex"}
          flexDirection={"column"}
          rowGap={2}
          px={{ xs: 0, sm: 3 }}
          py={2}
        >
          <TextField
            variant="outlined"
            size="small"
            type="email"
            fullWidth
            multiline
            minRows={5}
            value={texts}
            onChange={(e) => {
              setTexts(e.target.value);
              setData({ 
                ...data, 
                data: e.target.value.split("\n")
                  .filter(item => item.trim() !== '')
                  .map((item) => ({ content: item })) 
              });
            }}
          />
        </Box>
        <Divider />
      </Box>
      
      <EditPageTemplateFooter
        isSaving={isSaving}
        dataActive={data.active}
        onSubmit={handleSubmit}
        previewelement={<AboutCard data={data} />}
      />
    </>
  );
}

EditAboutPage.propTypes = {
  resumeId: PropTypes.string,
  setIsSaveSuccess: PropTypes.func,
  setActiveData: PropTypes.func,
};