import { Box, Button, Typography, IconButton, Tooltip } from "@mui/material";
import { ImageRounded, Cancel } from "@mui/icons-material";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Image } from "../styled/Image";

export default function ImageFileInput({
  label = "",
  onChange = () => {},
  isClear = false,
  ...props
}) {
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (isClear) setImageFile(null);
  }, [isClear]);

  return (
    <Box
      display={"flex"}
      flexWrap={"wrap"}
      alignItems={"center"}
      gap={1}
      px={1.5}
      py={0.5}
      border={1}
      borderRadius={2.5}
      borderColor={theme => theme.palette.mode === "dark" ? "#4e4e4e" : "#bbb"}
      {...props}
    >
      <Box display={"flex"} alignItems={"center"} gap={1} position={'relative'}>
        <Typography flexShrink={0}>{label}</Typography>
        <Button
          variant="text"
          size="small"
          component="label"
          startIcon={<ImageRounded />}
          sx={{ flexShrink: 0, px: 1, borderRadius: 0 }}
        >
          Select
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              setImageFile(e.target.files[0]); 
              onChange(e.target.files[0]);
            }}
          />
        </Button>
      </Box>
      <Box display={"flex"} gap={1} alignItems={"center"}>
        {imageFile && (
          <Tooltip
            title={<img src={URL.createObjectURL(imageFile)} width={'100%'} />}
            placement="top"
            followCursor
          >
            <Image
              src={URL.createObjectURL(imageFile)}
              alt="Selected profile picture"
              height={32}
            />
          </Tooltip>
        )}
        {imageFile && (
          <IconButton
            size="small"
            color="error"
            onClick={() => {
              setImageFile(null);
              onChange(null);
            }}
          >
            <Cancel fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

ImageFileInput.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  isClear: PropTypes.bool,
};
