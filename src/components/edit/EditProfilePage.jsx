import {
  Box,
  Button,
  Typography,
  Divider,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import {
  handleAddData,
  handleDeleteData,
  handleDataChange,
  handleMoveField,
  resizeImage,
} from "../../utils/utils";
import {
  fetchResumeSectionData,
  postResumeSectionData,
} from "../../utils/fetch";

import { EditPageTemplateFooter } from "../elements/EditPageTemplate";
import ProfileCard from "../home/ProfileCard";
import ImageFileInput from "../elements/ImageFileInput";
import EditLink from "../elements/editLink";

const linksOptions = [
  { label: "LinkedIn" },
  { label: "GitHub" },
  { label: "Twitter" },
  { label: "Facebook" },
  { label: "Instagram" },
  { label: "YouTube" },
];

export default function EditProfilePage({ resumeId, setIsSaveSuccess }) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?\d[\d|\-|\s]{5,15}\d$/;

  const [data, setData] = useState({});
  const [imageUrl, setImageUrl] = useState(data.image_url);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [clearFile, setClearFile] = useState(false);

  const fetchData = useCallback(async (resumeId) => {
    try {
      const data = await fetchResumeSectionData(resumeId, "profile");
      setData(data);
      setImageUrl(data.image_url);
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSubmit = async () => {
    setIsSaving(true);
    setClearFile(false)
    try {
      await postResumeSectionData(resumeId, "profile", data);
      setImageFile(null);
      setIsSaveSuccess(null);
      setTimeout(() => {
        setIsSaveSuccess(true);
        fetchData(resumeId);
        setIsSaving(false);
        setClearFile(true)
      }, 100);
    } catch (error) {
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

  useEffect(() => {
    if (imageFile) {
      resizeImage(imageFile, 280).then((resizedImage) => {
        setData({
          ...data,
          image_url: imageFile ? URL.createObjectURL(imageFile) : imageUrl,
          image_file: resizedImage,
        });
      });
    } else {
      setData({
        ...data,
        image_url: imageUrl,
        image_file: null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]);

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
        <Box
          display={"flex"}
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems={"baseline"}
          columnGap={2}
          flexWrap={"wrap"}
        >
          <Typography variant="h5" fontWeight={"bold"} flexShrink={0}>
            Edit Profile
          </Typography>
          <Typography variant="h6" flexShrink={0}>
            {data.title}
          </Typography>
        </Box>
        <Divider />

        {/* Main */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Main
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"column"}
            rowGap={2}
            px={{ xs: 0, sm: 3 }}
            py={2}
          >
            <ImageFileInput
              label="Profile Picture"
              onChange={(file) => setImageFile(file)}
              isClear={clearFile}
            />
            <TextField
              label="Subtitle"
              variant="outlined"
              size="small"
              multiline
              maxRows={2}
              fullWidth
              value={data.subtitle}
              onChange={(e) => setData({ ...data, subtitle: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            />
          </Box>
        </Box>
        <Divider />

        {/* Contact */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Contact
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"column"}
            rowGap={2}
            px={{ xs: 0, sm: 3 }}
            py={2}
          >
            <TextField
              label={
                data.contact.email
                  ? !emailRegex.test(data.contact.email)
                    ? "Invalid email"
                    : "Email"
                  : "Email"
              }
              variant="outlined"
              size="small"
              type="email"
              fullWidth
              value={data.contact.email}
              error={
                data.contact.email
                  ? !emailRegex.test(data.contact.email)
                  : false
              }
              onChange={(e) =>
                setData({
                  ...data,
                  contact: { ...data.contact, email: e.target.value },
                })
              }
            />
            <TextField
              label={
                data.contact.phone
                  ? !phoneRegex.test(data.contact.phone)
                    ? "Invalid phone number"
                    : "Phone"
                  : "Phone"
              }
              variant="outlined"
              size="small"
              type="tel"
              fullWidth
              error={
                data.contact.phone
                  ? !phoneRegex.test(data.contact.phone)
                  : false
              }
              value={data.contact.phone}
              onChange={(e) =>
                setData({
                  ...data,
                  contact: { ...data.contact, phone: e.target.value },
                })
              }
            />
            <TextField
              label="Location"
              variant="outlined"
              size="small"
              fullWidth
              value={data.contact.location}
              onChange={(e) =>
                setData({
                  ...data,
                  contact: { ...data.contact, location: e.target.value },
                })
              }
            />
          </Box>
        </Box>
        <Divider />

        {/* Links */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Links
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={2}
            px={{ xs: 0, sm: 3 }}
            py={2}
          >
            {data.links.map((link, index) => (
              <EditLink
                key={index}
                title={link.title}
                url={link.url}
                onChange={(field, value) =>
                  handleDataChange(data, setData, "links", index, field, value)
                }
                onMove={(direction) =>
                  handleMoveField(data, setData, "links", index, direction)
                }
                onDelete={() => handleDeleteData(setData, "links", index)}
                autocomplete
                autocompleteOptions={linksOptions}
              />
            ))}
            <Button
              color="success"
              variant="text"
              sx={{ alignSelf: "center", px: 5, my: -0.5 }}
              onClick={() => handleAddData( data, setData, "links", { title: "", url: "" }, "bottom")}
            >
              Add Link
            </Button>
          </Box>
        </Box>

        <Divider />
      </Box>

      <EditPageTemplateFooter
        isSaving={isSaving}
        onSubmit={handleSubmit}
        previewelement={<ProfileCard data={data} />}
      />
    </>
  );
}

EditProfilePage.propTypes = {
  resumeId: PropTypes.string.isRequired,
  setIsSaveSuccess: PropTypes.func.isRequired,
};
