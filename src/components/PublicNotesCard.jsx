import {
  Card,
  CardContent,
  Box,
  Button,
} from "@mui/material";
import { CampaignRounded } from "@mui/icons-material";
import { useState, useContext } from "react";
import PropTypes from "prop-types";

import CardHeader from "./elements/CardHeader";
import PublicNotesList, { PublicNotesInput } from "./elements/PublicNotesList";
import { ModalContext } from "../App";
import { fetchNewNotes, postNewNote } from "../utils/fetch";

export default function PublicNotesCard({ title, data, limit = 5 }) {
  const { setIsPublicNotesModalOpen } = useContext(ModalContext);
  const [limitedData, setLimitedData] = useState(data.slice(0, limit));
  const [textInput, setTextInput] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [isPosted, setIsPosted] = useState(false);

  async function handleSend() {
    setIsPosting(true);
    setTextInput("");
    await postNewNote(textInput);
    setLimitedData(await fetchNewNotes(limit));
    setIsPosting(false);
    setIsPosted(true);
    setTimeout(() => {
      setIsPosted(false);
    }, 2000);
  }

  return (
    <Card>
      <CardContent>
        <CardHeader>
          <CampaignRounded fontSize="large" />
          {title}
        </CardHeader>

        <Box
          component={Box}
          pt={2}
          pb={1}
          px={3}
          borderRadius={"10px"}
          overflow={"hidden"}
          bgcolor={"#88888818"}
        >
          {<PublicNotesList data={limitedData} isPosted={isPosted} />}

          <Box display={"flex"} justifyContent={"center"} mt={1}>
            <Button 
              size="small" 
              sx={{ px: 3 }}
              onClick={() => setIsPublicNotesModalOpen(true)}
            >
              View All
            </Button>
          </Box>
        </Box>
        <Box display={"flex"} alignItems={"center"} alignContent={"center"}>
          {<PublicNotesInput 
            textInput={textInput} 
            setTextInput={setTextInput} 
            isPosting={isPosting} 
            handleSend={handleSend} 
          />}
        </Box>
      </CardContent>
    </Card>
  );
}

PublicNotesCard.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  limit: PropTypes.number,
};
