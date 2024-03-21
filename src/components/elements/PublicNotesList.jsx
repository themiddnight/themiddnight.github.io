import { Box, Divider, Typography, TextField, IconButton, CircularProgress } from "@mui/material";
import { SendRounded, DeleteRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ConfettiExplosion from "react-confetti-explosion";

import { getRelativeTime } from "../../utils/utils";

export default function PublicNotesList({ data, isPosted, limitText = 80, isLimitText = false }) {

  return (
    <>
      <DeleteButton />
      {data.map((item, index) => (
        <Box key={index} position={'relative'}>
          {index === 0 && 
            <Box position={'absolute'} top={'50%'} left={'50%'} sx={{ transform: 'translate(-50%, -50%)' }}>
              {isPosted && <ConfettiExplosion force={0.1} particleCount={20} />}
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
              {isLimitText 
              ? `${item.content.slice(0, limitText)}
                 ${item.content.length > limitText ? "..." : ""}` 
              : item.content}
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
    </>
  )
}

export function PublicNotesInput({ textInput, setTextInput, isPosting, handleSend }) {
  return (
    <>
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
    </>
  );
}

function DeleteButton() {
  const [countdown, setCountdown] = useState(0);
  const [isAbleToDelete, setIsAbleToDelete] = useState(false);

  useEffect(() => {
    setIsAbleToDelete(true);
    setCountdown(100);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 0) {
          setIsAbleToDelete(false);
          clearInterval(interval);
          return 0;
        }
        return prev - 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  if (!isAbleToDelete) return null;

  return (
    <>
      <IconButton
        aria-label="delete"
        sx={{ 
          p: 0, m: 0, 
          position: 'fixed', 
          right: 50,
          zIndex: 1,
        }}
        hidden
        onClick={() => console.log('delete')}
      >
        <CircularProgress
          variant="determinate"
          value={countdown}
          size={30}
          color="error"
          sx={{
            position: 'absolute',
            zIndex: 2,
          }}
        />
        <DeleteRounded 
          fontSize="small" 
          sx={{ width: 20 }} 
        />
      </IconButton>
    </>
  )
}

PublicNotesList.propTypes = {
  data: PropTypes.array.isRequired,
  isPosted: PropTypes.bool.isRequired,
  limitText: PropTypes.number,
  isLimitText: PropTypes.bool,
};

PublicNotesInput.propTypes = {
  textInput: PropTypes.string.isRequired,
  setTextInput: PropTypes.func.isRequired,
  isPosting: PropTypes.bool.isRequired,
  handleSend: PropTypes.func.isRequired,
};