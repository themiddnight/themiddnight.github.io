import {
  Box,
  Typography,
  CircularProgress,
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
  postResumeSectionData,
} from "../../utils/fetch";

import {
  EditPageTemplateHeader,
  EditPageTemplateBody,
  EditPageTemplateFooter,
} from "../elements/EditPageTemplate";
import OtherProfileCard from "../home/OtherProfileCard";
import EditLink from "../elements/editLink";

export default function EditOtherLinksPage({ resumeId, setIsSaveSuccess, setActiveData }) {
  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchData = useCallback(async (resumeId) => {
    try {
      const data = await fetchResumeSectionData(resumeId, "other_links");
      setData(data);
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSubmit = async () => {
    setIsSaving(true);
    setActiveData({ other_links: data.active });
    try {
      await postResumeSectionData(resumeId, "other_links", data);
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
        title="Edit Other Links"
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
            url: "",
          }, pos)
        }
      >
        <Box display={"flex"} flexDirection={"column"} gap={2} py={2} sx={{ opacity: data.active ? 1 : 0.5 }}>
          {data.data.map((link, index) => (
            <Box 
              key={index} 
              display={'flex'} 
              flexDirection={{ xs: 'column', md: 'row'}} 
              alignItems={{ xs: 'stretch', md: 'center' }} 
              gap={1}
            >
              <Typography marginInlineStart={{ xs: 1, sm: 0 }} flexShrink={0}>{index + 1}.</Typography>
              <Box display={"flex"} gap={1} alignItems={"center"} flexGrow={1}>
                <EditLink
                  title={link.title}
                  url={link.url}
                  onChange={(key, value) => handleDataChange(data, setData, "data", index, key, value)}
                  onMove={(direction) => handleMoveField(data, setData, "data", index, direction)}
                  onDelete={() => handleDeleteData(setData, "data", index)}
                />
              </Box>
            </Box>
          ))}
        </Box>

      </EditPageTemplateBody>

      <EditPageTemplateFooter
        isSaving={isSaving}
        onSubmit={handleSubmit}
        dataActive={data.active}
        previewelement={<OtherProfileCard data={data} />}
      />
    </>
  );
}

EditOtherLinksPage.propTypes = {
  resumeId: PropTypes.string.isRequired,
  setIsSaveSuccess: PropTypes.func.isRequired,
  setActiveData: PropTypes.func.isRequired,
};