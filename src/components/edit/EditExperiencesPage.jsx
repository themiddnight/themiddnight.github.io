import {
  Box,
  TextField,
  FormControlLabel,
  CircularProgress,
  Checkbox,
} from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import { 
  handleAddData,
  handleDeleteData,
  handleMoveField,
  handleDataChange,
  handleMultilineChange,
} from "../../utils/utils";
import {
  fetchResumeSectionData,
  updateResumeSectionData,
} from "../../utils/fetch";

import { 
  EditPageTemplateHeader,
  EditPageTemplateBody,
  EditPageTemplateFooter,
} from "../elements/EditPageTemplate";
import ExperienceCard from "../home/ExperienceCard";
import EditCard from "../elements/EditCard";

export default function EditExperiencesPage({ resumeId, setIsSaveSuccess, setActiveData }) {
  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchData = useCallback(async (resumeId) => {
    try {
      const data = await fetchResumeSectionData(resumeId, "experiences");
      setData(data);
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSubmit = async () => {
    setIsSaving(true);
    setActiveData({ experiences: data.active });
    try {
      await updateResumeSectionData(resumeId, "experiences", data);
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
        title="Edit Experiences"
        dataTitle={data.title}
        dataSubtitle={data.subtitle}
        dataActive={data.active}
        dataDisplayLimit={+data.display_limit}
        onChange={(key, value) => setData({ ...data, [key]: value })}
      />

      <EditPageTemplateBody
        dataLength={data.data.length}
        onClickAddData={(pos) =>
          handleAddData(data, setData, "data", {
            active: true,
            title: "",
            company: "",
            from: "",
            to: "",
            current: false,
            description: [{ content: "" }],
          }, pos)
        }
      >
        {data.data.map((item, index) => (
          <EditCard
            key={index}
            index={index}
            dataActive={data.active}
            itemActive={item.active}
            itemTitle={item.title}
            onActive={(value) => handleDataChange(data, setData, "data", index, 'active', value)}
            onDelete={() => handleDeleteData(setData, "data", index)}
            onMove={(direction) => handleMoveField(data, setData, "data", index, direction)}
          >

            <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} gap={1}>
              <TextField
                label="Title"
                variant="outlined"
                size="small"
                fullWidth
                value={item.title}
                error={item.title === ""}
                onChange={(e) => handleDataChange(data, setData, "data", index, 'title', e.target.value)}
              />
              <TextField
                label="Company"
                variant="outlined"
                size="small"
                fullWidth
                value={item.company}
                error={item.company === ""}
                onChange={(e) => handleDataChange(data, setData, "data", index, 'company', e.target.value)}
              />
            </Box>

            <Box display={'flex'} flexDirection={{ xs: 'column', sm: 'row' }} gap={1}>
              <Box display={'flex'} gap={1}>
                <TextField
                  label="From"
                  variant="outlined"
                  size="small"
                  type="date"
                  fullWidth
                  error={item.from === ""}
                  value={item.from}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => handleDataChange(data, setData, "data", index, 'from', e.target.value)}
                />
                <TextField
                  label="To"
                  variant="outlined"
                  size="small"
                  type="date"
                  fullWidth
                  error={item.to === "" && !item.current}
                  value={item.to}
                  disabled={item.current}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => handleDataChange(data, setData, "data", index, 'to', e.target.value)}
                />
              </Box>

              <FormControlLabel sx={{ ml: 0.5, flexShrink: 0 }}
                control={<Checkbox checked={item.current} 
                onChange={(e) => handleDataChange(data, setData, "data", index, 'current', e.target.checked)} />}
                label="Current"
              />
            </Box>

            <TextField
              label="Description"
              variant="outlined"
              size="small"
              fullWidth
              multiline
              minRows={3}
              value={item.description.map((desc) => desc.content).join("\n")}
              onChange={(e) => handleMultilineChange(data, setData, "data", index, "description", e.target.value)}
            />

          </EditCard>
        ))}
      </EditPageTemplateBody>

      <EditPageTemplateFooter
        isSaving={isSaving}
        dataActive={data.active}
        onSubmit={handleSubmit}
        previewelement={<ExperienceCard data={data} />}
      />
    </>
  );
}

EditExperiencesPage.propTypes = {
  resumeId: PropTypes.string.isRequired,
  setIsSaveSuccess: PropTypes.func.isRequired,
  setActiveData: PropTypes.func.isRequired,
};