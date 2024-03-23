import {
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { CampaignRounded, SendRounded, DeleteRounded } from "@mui/icons-material";
import { useState, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import PropTypes from "prop-types";

import CardHeader from "./elements/CardHeader";
import { fetchNewNotes, postNewNote, deleteNote } from "../utils/fetch";
import { getRelativeTime } from "../utils/utils";

export default function PublicNotesCard({ title, limit }) {
  const [data, setData] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [isPosted, setIsPosted] = useState(false);
  const [newPostedId, setNewPostedId] = useState("");

  async function handleSend() {
    setIsPosted(false);
    setIsPosting(true);
    setTextInput("");
    setNewPostedId(await postNewNote(textInput));
    setData(await fetchNewNotes());
    setIsPosting(false);
    setIsPosted(true);
  }

  async function handleDelete(id) {
    await deleteNote(id);
    setData(await fetchNewNotes());
  } 

  useEffect(() => {
    setIsPosted(false);
    fetchNewNotes().then((data) => setData(data));
  }, []);

  return (
    <Card>
      <CardContent>
        <CardHeader>
          <CampaignRounded fontSize="large" />
          {title}
        </CardHeader>
        <Box
          pt={2}
          pb={1}
          px={3}
          height={(65 * limit) + 50}
          position={"relative"}
          overflow={"scroll"}
          borderRadius={"10px"}
          bgcolor={"#88888818"}
        >
          <DeleteButton isPosted={isPosted} handleDelete={handleDelete} newestPostId={newPostedId} />
          {data.length === 0 && (
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100%"}> 
            <Typography color="text.secondary">
              Be the first to say something!
            </Typography>
            </Box>
          )}
          {data.map((item, index) => (
            <Box key={index} position={'relative'}>
              {index === 0 && 
                <Box position={'absolute'} top={'50%'} left={'50%'} sx={{ transform: 'translate(-50%, -50%)' }}>
                  {isPosted && <ConfettiExplosion zIndex={100} force={0.2} particleCount={20} particleSize={10} duration={2000} />}
                </Box>
              }
              <Typography variant="caption" color="text.secondary">
                {`# ${item.number}`}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: 5,
                  py: 0.5,
                }}
              >
                <Typography>
                  {item.content}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  flexShrink={0}
                >
                  {getRelativeTime(item.createdAt)}
                </Typography>
              </Box>
              <Divider sx={{ my: 0.5 }} />
            </Box>
          ))}
        </Box>
        <Box display={"flex"} alignItems={"center"} alignContent={"center"}>
          <TextField
            fullWidth
            label="Say hi!"
            variant="outlined"
            margin="normal"
            size="small"
            value={textInput}
            disabled={isPosting}
            onInput={(e) => setTextInput(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? handleSend() : null)}
          />
          <IconButton
            color="primary"
            aria-label="send"
            sx={{ ml: 1, mt: 0.7, mr: -1 }}
            disabled={textInput === ""}
            onClick={handleSend}
          >
            {isPosting ? (
              <CircularProgress size={35} thickness={8} color="grey" />
            ) : (
              <SendRounded fontSize="normal" />
            )}
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

function DeleteButton({ isPosted, handleDelete, newestPostId }) {
  const [countdown, setCountdown] = useState(100);
  const [isAbleToDelete, setIsAbleToDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleClick(id) {
    setIsDeleting(true);
    await handleDelete(id);
    setIsAbleToDelete(false);
    setIsDeleting(false);
  }

  useEffect(() => {
    setIsAbleToDelete(false);
  }, []);

  useEffect(() => {
    if (!isPosted) return;
    setIsAbleToDelete(true);
    setCountdown(100);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 0) {
          setIsAbleToDelete(false);
          clearInterval(interval);
          return 0;
        }
        return prev - 4;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [isPosted]);

  if (!isAbleToDelete) {
    return null;
  } 
  else if (isDeleting) {
    return (
      <CircularProgress
        size={30}
        color="grey"
        sx={{
          position: 'absolute',
          right: 15,
          top: 15,
          zIndex: 1,
          opacity: 0.5,
        }}
      />
    );
  }

  return (
    <>
      <IconButton
        aria-label="delete"
        sx={{ 
          p: 0, m: 0, 
          position: 'absolute', 
          right: 20,
          top: 20,
          zIndex: 1,
        }}
        onClick={() => handleClick(newestPostId)}
      >
        <CircularProgress
          variant="determinate"
          value={countdown}
          color="grey"
          size={30}
          sx={{
            position: 'absolute',
            zIndex: 2,
            opacity: 0.5,
          }}
        />
        <DeleteRounded 
          fontSize="small" 
          color="error"
          sx={{ width: 20 }} 
        />
      </IconButton>
    </>
  )
}

PublicNotesCard.propTypes = {
  title: PropTypes.string.isRequired,
  limit: PropTypes.number,
};

DeleteButton.propTypes = {
  isPosted: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
  newestPostId: PropTypes.string.isRequired,
};