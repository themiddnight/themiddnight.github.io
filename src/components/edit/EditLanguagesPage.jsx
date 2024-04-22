import {
  Box,
  TextField,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Typography,
  Slider,
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
import LanguagesCard from "../home/LanguagesCard";
import EditCard from "../elements/EditCard";
import EditButtons from "../elements/EditButtons";

export default function EditLanguagesPage({ resumeId, setIsSaveSuccess, setActiveData, setMessage }) {
  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const fetchData = useCallback(async (resumeId) => {
    try {
      const data = await fetchResumeSectionData(resumeId, "languages");
      setData(data);
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSubmit = async () => {
    setIsSaving(true);
    const promises = data.data.map(async (item) => {
      if (item.native) {
        item.skills.read.value = 100;
        item.skills.write.value = 100;
        item.skills.listen.value = 100;
        item.skills.speak.value = 100;
      }
    });
    await Promise.all(promises);
    try {
      const result = await updateResumeSectionData(resumeId, "languages", data);
      setMessage(result);
      setIsSaveSuccess(null);
      fetchData(resumeId);
      setActiveData({ languages: data.active });
      setIsSaving(false);
      setTimeout(() => {
        setIsSaveSuccess(true);
      }, 100);
    } catch (error) {
      setMessage(error);
      setIsSaveSuccess(null);
      setIsSaving(false);
      setTimeout(() => {
        setIsSaveSuccess(false);
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
        title="Edit Languages"
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
            native: false,
            skills: {
              read: { title: "read", value: 50 },
              write: { title: "write", value: 50 },
              listen: { title: "listen", value: 50 },
              speak: { title: "speak", value: 50 },
            },
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
            <Box display={"flex"} alignItems={'center'} gap={2}>
              <TextField
                label="Title"
                variant="outlined"
                size="small"
                fullWidth
                error={!item.title}
                value={item.title}
                onChange={(e) =>
                  handleDataChange(data, setData, "data", index, "title", e.target.value)
                }
              />
              <FormGroup sx={{ flexShrink: 0, ml: 1 }}>
                <FormControlLabel
                  label="Native"
                  control={
                    <Checkbox
                      checked={item.native}
                      onChange={(e) =>
                        handleDataChange(data, setData, "data", index, "native", e.target.checked)
                      }
                    />
                  }
                />
              </FormGroup>
            </Box>

            <Box display={'grid'} gridTemplateColumns={'repeat(2, 1fr)'} gap={1}>
              {Object.keys(item.skills).map((key, skillIndex) => (
                <InputSlider 
                  key={skillIndex} 
                  isNative={item.native} 
                  data={item.skills[key]} 
                  onChange={(value) => {
                    setData((prevData) => {
                      const newData = [...prevData.data];
                      newData[index].skills[key].value = value;
                      return { ...prevData, data: newData };
                    });
                  }}
                />
              ))}
            </Box>

          </EditCard>
        ))}
      </EditPageTemplateBody>

      <EditPageTemplateFooter
        dataActive={data.active}
        isSaving={isSaving}
        onSave={handleSubmit}
        previewelement={<LanguagesCard data={data} />}
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

function InputSlider({ isNative, data, onChange }) {
  const [level, setLevel] = useState(getLevel(""));

  function getLevel(value) {
    if (value === 0) return "No proficiency";
    else if (value <= 25) return "Novice";
    else if (value <= 50) return "Intermediate";
    else if (value <= 75) return "Advanced";
    else if (value <= 95) return "Superior";
    else return "Native";
  }

  useEffect(() => {
    setLevel(getLevel(data.value));
  }, [data.value]);

  return (
    <Box 
      border={"1px solid"} 
      px={2} py={{ xs: 0, lg: 0.5 }}
      borderRadius={3} 
      borderColor={"divider"} 
      gridColumn={{ xs: 'span 2', sm: 'span 1' }}
      display={'flex'}
      alignItems={'center'}
      sx={{ opacity: isNative ? 0.5 : 1 }}
    >
      <Typography fontSize={'small'} fontWeight={'bold'} width={80}>{data.title}</Typography>
      <Slider
        disabled={isNative}
        value={isNative ? 100 : data.value}
        onChange={(e, value) => {
          onChange(value);
        }}
        valueLabelDisplay="auto"
        step={5}
        min={0}
        max={100}
      />
      <Typography 
        fontSize={'small'} 
        align="right" 
        flexShrink={0} 
        width={80}
      >
        {isNative ? 'Native' : level}
      </Typography>
    </Box>)
}

EditLanguagesPage.propTypes = {
  resumeId: PropTypes.string.isRequired,
  setIsSaveSuccess: PropTypes.func.isRequired,
  setActiveData: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

InputSlider.propTypes = {
  isNative: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};