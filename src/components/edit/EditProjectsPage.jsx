import {
  Box,
  Button,
  Typography,
  TextField,
  CircularProgress,
  Chip,
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
  postResumeSectionData,
} from "../../utils/fetch";

import { 
  EditPageTemplateHeader,
  EditPageTemplateBody,
  EditPageTemplateFooter,
} from "../elements/EditPageTemplate";
import ImageFileInput from "../elements/ImageFileInput";
import ProjectsCard from "../home/ProjectsCard";
import EditCard from "../elements/EditCard";
import ImageUrlPreview from "../elements/ImageUrlPreview";
import EditLink from "../elements/editLink";

export default function EditProjectsPage({ resumeId, setIsSaveSuccess, setActiveData }) {
  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [clearFile, setClearFile] = useState(false);
  const urlRegex = /^(https?:\/\/)/;

  const fetchData = useCallback(async (resumeId) => {
    try {
      const data = await fetchResumeSectionData(resumeId, "projects");
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
    setActiveData({ projects: data.active });
    // convert image_file to base64 and attatch to data
    const newData = [...data.data];
    try {
      const promises = newData.map(async (item) => {
        if (item.image_file) {
          const resizedImage = await resizeImage(item.image_file, 512);
          item.image_file = resizedImage;
          delete item.image_url_original;
        }
      });
      await Promise.all(promises);
      setData({ ...data, data: newData });
    } catch (error) {
      console.error(error);
      setIsSaveSuccess(null);
      setIsSaving(false);
      setTimeout(() => {
        setIsSaveSuccess(false);
      }, 100);
    }
    // post data
    try {
      await postResumeSectionData(resumeId, "projects", data);
      setIsSaveSuccess(null);
      // setData({ ...data, data: [] });
      fetchData(resumeId);
      setIsSaving(false);
      setClearFile(true);
      setTimeout(() => {
        setIsSaveSuccess(true);
      }, 100);
    } catch (error) {
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
        title="Edit Projects"
        dataTitle={data.title}
        dataSubtitle={data.subtitle}
        dataActive={data.active}
        dataDisplayLimit={data.display_limit}
        dataDisplayMode={data.display_mode}
        onChange={(key, value) => setData({ ...data, [key]: value })}
      />

      <EditPageTemplateBody
        dataLength={data.data.length}
        onClickAddData={(pos) =>
          handleAddData(data, setData, "data", {
            active: true,
            title: "",
            createdAt: "",
            tags: [],
            image_file: null,
            image_path: "",
            image_url: "",
            description: "",
            public_link: "",
            links: [],
          }, pos)
        }
        previewelement={<ProjectsCard data={data} />}
      >

        {data.data.map((item, index) => (
          <EditCard
            key={index}
            index={index}
            dataActive={data.active}
            itemActive={item.active}
            itemTitle={item.title}
            onActive={(value) => handleDataChange(data, setData, "data", index, "active", value)}
            onDelete={() => handleDeleteData(setData, "data", index)}
            onMove={(direction) => handleMoveField(data, setData, "data", index, direction)}
          >

            <Box display={'flex'} flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
              <Box display={'flex'} alignItems={'center'} gap={2} flexGrow={1}>
                <ImageUrlPreview
                  imageFile={item.image_file}
                  imageUrl={item.image_url}
                  imageUrlOriginal={item.image_url_original}
                  onClear={() => handleDataChange(data, setData, "data", index, "image_url", "")}
                  onRevert={() => handleDataChange(data, setData, "data", index, "image_url", item.image_url_original)}
                />

                <TextField
                  label="Title"
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={item.title === ""}
                  value={item.title}
                  onChange={(e) => handleDataChange(data, setData, "data", index, "title", e.target.value)}
                />
              </Box>

              <TextField
                label="Created At"
                variant="outlined"
                size="small"
                type="date"
                sx={{ flexShrink: 0 }}
                value={item.createdAt}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => handleDataChange(data, setData, "data", index, "createdAt", e.target.value)}
              />


            </Box>
            <ImageFileInput label="Cover image:" onChange={(file) => handleImageChange(data, setData, "data", index, file)} isClear={clearFile} />

            <TextField
              label="Description"
              variant="outlined"
              size="small"
              fullWidth
              multiline
              value={item.description}
              onChange={(e) => handleDataChange(data, setData, "data", index, "description", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            />

            <Box display={"flex"} alignItems={'center'} gap={1} py={0.5} flexWrap={'wrap'}>
              <Typography>Tags: </Typography>
              {item.tags.map((tag, tagIndex) => (
                <Chip
                  key={tagIndex}
                  label={tag}
                  size="small"
                  onDelete={() => {
                    const tags = [...item.tags];
                    tags.splice(tagIndex, 1);
                    handleDataChange(data, setData, "data", index, "tags", tags);
                  }}
                />
              ))}
              <TextField
                variant="standard"
                size="small"
                placeholder="Add tag"
                sx={{ marginInlineStart: 1 }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const tags = [...item.tags];
                    tags.push(e.target.value);
                    handleDataChange(data, setData, "data", index, "tags", tags);
                    e.target.value = "";
                  }
                }}
              />
            </Box>

            <TextField
              label={item.public_link ? !urlRegex.test(item.public_link) ? "Must include 'http://' or 'https://'" : "Public Link" : "Public Link"}
              size="small"
              type="url"
              error={item.public_link !== "" && !urlRegex.test(item.public_link)}
              fullWidth
              value={item.public_link}
              onChange={(e) => handleDataChange(data, setData, "data", index, "public_link", e.target.value)}
              onKeyDown={(e) => e.key === " " && e.preventDefault()}
            />

            <Typography variant="h6" fontWeight={"bold"}>
              Links
            </Typography>
            {item.links.map((link, linkIndex) => (
              <EditLink
                key={linkIndex}
                title={link.title}
                url={link.url}
                onChange={(key, value) => {
                  const newLinks = [...item.links];
                  newLinks[linkIndex][key] = value;
                  handleDataChange(data, setData, "data", index, "links", newLinks);
                }}
                onMove={(direction) => {
                  const newLinks = [...item.links];
                  const movedLink = newLinks[linkIndex];
                  newLinks.splice(linkIndex, 1);
                  newLinks.splice(linkIndex + direction, 0, movedLink);
                  handleDataChange(data, setData, "data", index, "links", newLinks);
                }}
                onDelete={() => {
                  const confirm = window.confirm(`Are you sure you want to delete this link?`);
                  if (!confirm) return;
                  const newLinks = [...item.links];
                  newLinks.splice(linkIndex, 1);
                  handleDataChange(data, setData, "data", index, "links", newLinks);
                }}
              />
            ))}
            <Button 
              variant="text" 
              color="success"
              sx={{ alignSelf: "center", px: 5, my: { xs: -1, md: -0.5 }}}
              onClick={() => {
                const newLinks = [...item.links];
                newLinks.push({ title: "", url: "" });
                handleDataChange(data, setData, "data", index, "links", newLinks);
              }}
            >
              Add Link
            </Button>
          </EditCard>
        ))}

      </EditPageTemplateBody>

      <EditPageTemplateFooter
        dataActive={data.active}
        isSaving={isSaving}
        onSubmit={handleSubmit}
        previewelement={<ProjectsCard data={data} />}
      />
    </>
  );
}

EditProjectsPage.propTypes = {
  resumeId: PropTypes.string.isRequired,
  setIsSaveSuccess: PropTypes.func.isRequired,
  setActiveData: PropTypes.func.isRequired,
};