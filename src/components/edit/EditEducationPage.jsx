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
import EducationCard from "../home/EducationCard";
import EditCard from "../elements/EditCard";
import EditButtons from "../elements/EditButtons";

export default function EditEducationPage({ resumeId, setIsSaveSuccess, setActiveData, setMessage }) {
  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const fetchData = useCallback(async (resumeId) => {
    try {
      const data = await fetchResumeSectionData(resumeId, "education");
      setData(data);
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSubmit = async () => {
    setIsSaving(true);
    setActiveData({ education: data.active });
    try {
      const result = await updateResumeSectionData(resumeId, "education", data);
      setMessage(result)
      setIsSaveSuccess(null);
      setTimeout(() => {
        setIsSaveSuccess(true);
        fetchData(resumeId);
        setIsSaving(false);
      }, 100);
    } catch (error) {
      setMessage(error)
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
        title="Edit Education"
        dataTitle={data.title}
        dataSubtitle={data.subtitle}
        dataActive={data.active}
        dataDisplayLimit={data.display_limit}
        onChange={(key, value) => setData({ ...data, [key]: value })}
      />

      <EditPageTemplateBody
        dataLength={data.data.length}
        onClickAddData={(pos) =>
          handleAddData(data, setData, "data", {
            active: true,
            title: "",
            degree: "",
            school: "",
            from: "",
            to: "",
            current: false,
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
            expanded={expanded}
            onActive={(value) => handleDataChange(data, setData, "data", index, "active", value)}
            onDelete={() => handleDeleteData(setData, "data", index)}
            onMove={(direction) => handleMoveField(data, setData, "data", index, direction)}
          >

            <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
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
                label="Degree"
                variant="outlined"
                size="small"
                fullWidth
                value={item.degree}
                error={item.degree === ""}
                onChange={(e) => handleDataChange(data, setData, "data", index, 'degree', e.target.value)}
              />
            </Box>

            <Box display={'flex'} flexDirection={{ xs: 'column', sm: 'row' }} gap={1}>
              <Box display={'flex'} gap={2}>
                <TextField
                  label="Year from"
                  variant="outlined"
                  size="small"
                  type="number"
                  error={item.from === ""}
                  value={item.from}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => handleDataChange(data, setData, "data", index, 'from', e.target.value)}
                />
                <TextField
                  label="Year to"
                  variant="outlined"
                  size="small"
                  type="number"
                  error={item.to === "" && !item.current}
                  value={item.to}
                  disabled={item.current}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => handleDataChange(data, setData, "data", index, 'to', e.target.value)}
                />
              </Box>
              <FormControlLabel sx={{ ml: 0 }}
                control={
                  <Checkbox 
                    checked={item.current} 
                    onChange={(e) => handleDataChange(data, setData, "data", index, 'current', e.target.checked)} 
                  />
                }
                label="Current"
              />
            </Box>

            <TextField
              label="school"
              variant="outlined"
              size="small"
              fullWidth
              value={item.school}
              error={item.school === ""}
              onChange={(e) => handleDataChange(data, setData, "data", index, 'school', e.target.value)}
            />

          </EditCard>
        ))}
      </EditPageTemplateBody>

      <EditPageTemplateFooter
        isSaving={isSaving}
        onSave={handleSubmit}
        previewelement={<EducationCard data={data} />}
      />

      <EditButtons 
        expanded={expanded}
        setExpanded={setExpanded}
        isSaving={isSaving}
        onSubmit={handleSubmit}
      />
    </>
  );
}

EditEducationPage.propTypes = {
  resumeId: PropTypes.string.isRequired,
  setIsSaveSuccess: PropTypes.func.isRequired,
  setActiveData: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};