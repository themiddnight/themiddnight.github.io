import { Box, Modal, Typography, IconButton, CircularProgress, Fade } from "@mui/material";
import { CloseRounded, CampaignRounded } from "@mui/icons-material";
import { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

import PublicNotesList, { PublicNotesInput } from "../elements/PublicNotesList";
import { ModalContext } from "../../App";
import { fetchNewNotes, postNewNote } from "../../utils/fetch";

export default function PublicNotesModal({ title }) {
  const { isPublicNotesModalOpen, setIsPublicNotesModalOpen } = useContext(ModalContext);
  const [data, setData] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [isPosted, setIsPosted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isPublicNotesModalOpen) {
      fetchNewNotes().then((data) => setData(data)).then(() => setIsLoaded(true));
    }
    setIsLoaded(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPublicNotesModalOpen]);

  async function handleSend() {
    setIsPosting(true);
    setTextInput("");
    await postNewNote(textInput);
    setData(await fetchNewNotes());
    setIsPosting(false);
    setIsPosted(true);
    setTimeout(() => {
      setIsPosted(false);
    }, 2000);
  }

  function NotesList() {
    if (!isLoaded) {
      return (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'}>
          <CircularProgress />
        </Box>
      )
    }
    return <PublicNotesList data={data} isPosted={isPosted} />
  }

  return (
    <Modal
      open={isPublicNotesModalOpen}
      onClose={() => setIsPublicNotesModalOpen(false)}
      aria-labelledby="image-modal"
      aria-describedby="image-modal"
      closeAfterTransition
      disableAutoFocus
      disableRestoreFocus
    >
      <Fade in={isPublicNotesModalOpen}>
        <Box
          width={{ xs: "90%", sm: "80%", md: "60%", lg: "50%", xl: "40%" }}
          height={"90%"}
          borderRadius={1}
          boxShadow={10}
          position={"relative"}
          top={"50%"}
          left={"50%"}
          overflow={"hidden"}
          className={"modal-bg"}
          sx={{ transform: 'translate(-50%, -50%)', backdropFilter: "blur(50px)" }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            height={"100%"}
          >
            <Box 
              display={"flex"} 
              justifyContent={"space-between"}
              alignItems={"center"} 
              alignContent={"center"} 
              px={3}
              py={2}
              width={"100%"}
              className={"modal-headfoot-bg"}
              boxShadow={3}
              zIndex={10}
              sx={{ backdropFilter: "blur(50px)" }}
            >
              <Box display={'flex'} alignItems={'center'} gap={1}>
                <CampaignRounded fontSize="large" />
                <Typography variant="h5" fontWeight={"bold"}>
                  {title}
                </Typography>
              </Box>
              <IconButton
                aria-label="close"
                size="small"
                onClick={() => setIsPublicNotesModalOpen(false)}
              >
                <CloseRounded fontSize="medium" />
              </IconButton>
            </Box>

            <Box
              component={Box}
              pt={2}
              pb={1}
              px={6}
              bgcolor={"#88888818"}
              flexGrow={1}
              flexShrink={1}
              overflow={"auto"}
              zIndex={98}
            >
              {<NotesList />}
            </Box>

            <Box 
              display={"flex"} 
              alignItems={"center"} 
              alignContent={"center"}
              px={4}
              pb={1.5}
              pt={0.5}
              className={"modal-headfoot-bg"}
              boxShadow={3}
            >
              {<PublicNotesInput 
                textInput={textInput} 
                setTextInput={setTextInput} 
                isPosting={isPosting} 
                handleSend={handleSend} 
              />}
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

PublicNotesModal.propTypes = {
  title: PropTypes.string.isRequired,
};