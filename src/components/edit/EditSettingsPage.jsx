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
  updateResumeSectionData,
} from "../../utils/fetch";

import { EditPageTemplateFooter } from "../elements/EditPageTemplate";
import IntroScreen from "../home/IntroScreen";
import EditButtons from "../elements/EditButtons";

const layoutOptions = [
  { label: "Two Columns", value: 0 },
  { label: "Tree Columns", value: 1 },
];

const backgroundOptions = [
  { label: "Basic", value: 0 },
  { label: "Colored", value: 1 },
];

export default function EditSettingsPage({ resumeId, setIsSaveSuccess, setMessage }) {
  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchData = useCallback(async (resumeId) => {
    try {
      const data = await fetchResumeSectionData(resumeId, "settings");
      setData(data);
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      const result = await updateResumeSectionData(resumeId, "settings", data);
      setMessage(result);
      setIsSaveSuccess(null);
      setTimeout(() => {
        setIsSaveSuccess(true);
        fetchData(resumeId);
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
  };

  useEffect(() => {
    fetchData(resumeId);
  }, [fetchData, resumeId]);

  if (!isLoaded) {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100vh"}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box display={"flex"} flexDirection={"column"} rowGap={2} px={2} py={4}>
        <Typography variant="h5" fontWeight={"bold"} flexShrink={0}>
          Settings
        </Typography>
        <Divider />

        {/* Main */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Main
          </Typography>
          <Box display={"flex"} gap={2} px={{ xs: 0, sm: 3 }} py={2}>
            <TextField
              label="Layout"
              helperText="It takes effect on the large screen"
              select
              fullWidth
              SelectProps={{ native: true }}
              size="small"
              value={data.layout}
              onChange={(e) => setData({ ...data, layout: +e.target.value })}
            >
              {layoutOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <TextField
              label="Background Mode"
              select
              fullWidth
              SelectProps={{ native: true }}
              size="small"
              value={data.background_mode}
              onChange={(e) =>
                setData({ ...data, background_mode: +e.target.value })
              }
            >
              {backgroundOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Box>
        </Box>
        <Divider />

        <Box>
          <Typography variant="h6" gutterBottom>
            Intro Screen
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={2}
            px={{ xs: 0, sm: 3 }}
            py={2}
          >
            <TextField
              label="Title"
              variant="outlined"
              size="small"
              fullWidth
              value={data.intro.title}
              sx={{ mb: 1 }}
              onChange={(e) =>
                setData({
                  ...data,
                  intro: { ...data.intro, title: e.target.value },
                })
              }
            />
            <TextField
              label="Subtitle"
              variant="outlined"
              size="small"
              fullWidth
              value={data.intro.subtitle}
              sx={{ mb: 1 }}
              onChange={(e) =>
                setData({
                  ...data,
                  intro: { ...data.intro, subtitle: e.target.value },
                })
              }
            />
            <TextField
              label="Enter Button Text"
              variant="outlined"
              size="small"
              fullWidth
              value={data.intro.enter_button}
              sx={{ mb: 1 }}
              onChange={(e) =>
                setData({
                  ...data,
                  intro: { ...data.intro, enter_button: e.target.value },
                })
              }
            />
          </Box>
        </Box>
        <Divider />
      </Box>

      <EditPageTemplateFooter
        onSave={handleSubmit}
        previewelement={
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            py={5}
            borderRadius={{ xs: 0, md: 3 }}
            mx={{ xs: -2, sm: -5, md: 0 }}
            className={"basic-bg"}
          >
            <IntroScreen data={data} position="static" />
          </Box>
        }
      />

      <EditButtons 
        isSaving={isSaving}
        onSubmit={handleSubmit}
      />
    </>
  );
}

EditSettingsPage.propTypes = {
  resumeId: PropTypes.string.isRequired,
  setIsSaveSuccess: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};
