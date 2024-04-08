import {
  Box,
  TextField,
  CircularProgress,
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
import CertificationsCard from "../home/CertificationsCard";
import EditCard from "../elements/EditCard";
import ImageUrlPreview from "../elements/ImageUrlPreview";
import ImageFileInput from "../elements/ImageFileInput";

export default function EditCertificationsPage({ resumeId, setIsSaveSuccess, setActiveData }) {
  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [clearFile, setClearFile] = useState(false);

  const fetchData = useCallback(async (resumeId) => {
    try {
      const data = await fetchResumeSectionData(resumeId, "certifications");
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
    setActiveData({ certifications: data.active });
    // convert image_file to base64 and attatch to data
    const newData = [...data.data];
    try {
      const promises = newData.map(async (item) => {
        if (item.image_file) {
          const resizedImage = await resizeImage(item.image_file, 1200);
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
      await postResumeSectionData(resumeId, "certifications", data);
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
        title="Edit Certifications"
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
            issuedBy: "",
            issuedDate: "",
            credentialUrl: "",
            image_url: "",
            image_path: "",
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
            onActive={(value) => handleDataChange(data, setData, "data", index, "active", value)}
            onDelete={() => handleDeleteData(setData, "data", index)}
            onMove={(direction) => handleMoveField(data, setData, "data", index, direction)}
          >
            <Box display={"flex"} flexWrap={'wrap'} alignItems={'center'} gap={2}>
              <Box
                display={"flex"}
                gap={2}
                flexGrow={3}
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
                  sx={{ flexGrow: 1 }}
                  onChange={(e) =>
                    handleDataChange(data, setData, "data", index, "title", e.target.value)
                  }
                />
              </Box>
                <ImageFileInput
                  label="Icon:"
                  onChange={(file) => handleImageChange(data, setData, "data", index, file)}
                  isClear={clearFile}
                  sx={{ flexGrow: 1 }}
                />
            </Box>
            
            <Box
              display={"flex"}
              alignItems={"center"}
              flexWrap={"wrap"}
              gap={2}
            >
              <TextField
                label="Issued By"
                variant="outlined"
                size="small"
                error={!item.issuedBy}
                value={item.issuedBy}
                sx={{ flexGrow: 3 }}
                onChange={(e) =>
                  handleDataChange(data, setData, "data", index, "issuedBy", e.target.value)
                }
              />
              <TextField
                label="Issued Date"
                variant="outlined"
                type="date"
                size="small"
                value={item.issuedDate}
                InputLabelProps={{ shrink: true }}
                sx={{ flexGrow: { xs: 1, sm: 0 } }}
                onChange={(e) =>
                  handleDataChange(data, setData, "data", index, "issuedDate", e.target.value)
                }
              />
            </Box>

            <TextField
              label="Credential URL"
              variant="outlined"
              size="small"
              fullWidth
              value={item.credentialUrl}
              onChange={(e) =>
                handleDataChange(data, setData, "data", index, "credentialUrl", e.target.value)
              }
            />
          </EditCard>
        ))}
      </EditPageTemplateBody>

      <EditPageTemplateFooter
        dataActive={data.active}
        isSaving={isSaving}
        onSubmit={handleSubmit}
        previewelement={<CertificationsCard data={data} />}
      />
    </>
  );
}

EditCertificationsPage.propTypes = {
  resumeId: PropTypes.string.isRequired,
  setIsSaveSuccess: PropTypes.func.isRequired,
  setActiveData: PropTypes.func.isRequired,
};
