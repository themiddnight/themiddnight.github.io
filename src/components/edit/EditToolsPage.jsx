import {
  Box,
  TextField,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import { 
  handleAddData,
  handleDeleteData,
  handleMoveField,
  handleDataChange,
  handleImageChange,
  resizeImage,
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
import ToolssCard from "../home/ToolsCard";
import EditCard from "../elements/EditCard";
import ImageUrlPreview from "../elements/ImageUrlPreview";
import ImageFileInput from "../elements/ImageFileInput";
import EditButtons from "../elements/EditButtons";

export default function EditToolsPage({ resumeId, setIsSaveSuccess, setActiveData, setMessage }) {
  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [clearFile, setClearFile] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const fetchData = useCallback(async (resumeId) => {
    try {
      const data = await fetchResumeSectionData(resumeId, "tools");
      const promises = data.data.map(async (item) => {
        item.image_url_original = item.image_url;
      });
      await Promise.all(promises);
      setData(data);
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSubmit = async () => {
    setIsSaving(true);
    setClearFile(false);
    setActiveData({ tools: data.active });
    // convert image_file to base64 and attatch to data
    const newData = [...data.data];
    try {
      const promises = newData.map(async (item) => {
        if (item.image_file) {
          const resizedImage = await resizeImage(item.image_file, 64);
          item.image_file = resizedImage;
          delete item.image_url_original;
        }
      });
      await Promise.all(promises);
      setData({ ...data, data: newData });
    } catch (error) {
      setMessage("Error resizing image")
      console.error(error);
      setIsSaveSuccess(null);
      setIsSaving(false);
      setTimeout(() => {
        setIsSaveSuccess(false);
      }, 100);
    }
    // post data
    try {
      const result = await updateResumeSectionData(resumeId, "tools", data);
      setMessage(result);
      setIsSaveSuccess(null);
      // setData({ ...data, data: [] });
      fetchData(resumeId);
      setIsSaving(false);
      setClearFile(true);
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
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100vh"}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <EditPageTemplateHeader
        title="Edit Tools"
        dataTitle={data.title}
        dataSubtitle={data.subtitle}
        dataActive={data.active}
        dataDisplayLimit={data.display_limit}
        displayMode
        dataDisplayMode={data.display_mode}
        dataDisplayModeOptions={[
          { label: "List", value: 0 },
          { label: "Grid", value: 1 },
        ]}
        onChange={(key, value) => setData({ ...data, [key]: value })}
      />

      <EditPageTemplateBody
        dataLength={data.data.length}
        onClickAddData={(pos) =>
          handleAddData(data, setData, "data", {
            active: true,
            title: "",
            description: "",
            image_path: "",
            image_url: "",
            is_mono: false,
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
            <Box display={"flex"} flexWrap={'wrap'} alignItems={'center'} gap={2}>
              <Box
                display={"flex"}
                gap={2}
                flexGrow={3}
                // width={"100%"}
              >
                <ImageUrlPreview
                  imageFile={item.image_file}
                  imageUrl={item.image_url}
                  imageUrlOriginal={item.image_url_original}
                  onClear={() => handleDataChange(data, setData, "data", index, "image_url", "")}
                  onRevert={() =>
                    handleDataChange(data, setData, "data", index, "image_url", item.image_url_original)
                  }
                />
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
              </Box>

              <Box
                display={"flex"}
                alignItems={"center"}
                flexWrap={"wrap"}
                flexGrow={1}
                columnGap={1}
              >
                <ImageFileInput
                  label="Icon:"
                  onChange={(file) => handleImageChange(data, setData, "data", index, file)}
                  isClear={clearFile}
                  sx={{ flexGrow: 1 }}
                />
                <FormGroup sx={{ flexShrink: 0, ml: 1 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={item.is_mono}
                        onChange={(e) =>
                          handleDataChange(data, setData, "data", index, "is_mono", e.target.checked)
                        }
                      />
                    }
                    label="Monocolor"
                  />
                </FormGroup>
              </Box>
            </Box>

            <TextField
              label="Description"
              variant="outlined"
              size="small"
              fullWidth
              multiline
              value={item.description}
              onChange={(e) =>
                handleDataChange(data, setData, "data", index, "description", e.target.value)
              }
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            />
          </EditCard>
        ))}
      </EditPageTemplateBody>

      <EditPageTemplateFooter
        dataActive={data.active}
        onSave={handleSubmit}
        previewelement={<ToolssCard data={data} />}
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

EditToolsPage.propTypes = {
  resumeId: PropTypes.string.isRequired,
  setIsSaveSuccess: PropTypes.func.isRequired,
  setActiveData: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};
