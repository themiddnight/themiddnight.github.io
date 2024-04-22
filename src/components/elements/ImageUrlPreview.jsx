import { Box, IconButton, Badge, Tooltip } from "@mui/material";
import { Cancel, Replay } from "@mui/icons-material";
import PropTypes from "prop-types";

import { Image } from "../styled/Image";

export default function ImageUrlPreview({
  imageFile,
  imageUrl,
  imageUrlOriginal,
  onClear,
  onRevert,
}) {
  const thumbSize = 40;
  
  return (
    <>
      {imageUrl && !imageFile && (
        <Box position={"relative"} display={"flex"} alignItems={"center"}>
          <Badge
            badgeContent={
              <Tooltip title="Clear" placement="top">
                <IconButton
                  size="small"
                  sx={{ p: 0, m: 0 }}
                  onClick={() => {
                    if (imageFile) return;
                    onClear();
                  }}
                >
                  <Cancel
                    color="error"
                    fontSize="small"
                    sx={{ borderRadius: "50%" }}
                    className="basic-bg"
                  />
                </IconButton>
              </Tooltip>
            }
          >
            <Box width={thumbSize} height={thumbSize} overflow="hidden">
              <Tooltip 
                title={<img src={imageUrlOriginal} width={'100%'} />}
                placement="top" followCursor
              >
                <Image src={imageUrlOriginal} width="100%" height="100%" />
              </Tooltip>
            </Box>
          </Badge>
        </Box>
      )}

      {imageFile && typeof imageFile === "object" &&
        <Box display={"flex"} alignItems={"center"}>
          <Box width={thumbSize} height={thumbSize} overflow="hidden">
            <Tooltip 
              title={<img src={URL.createObjectURL(imageFile)} width={'100%'} />}
              placement="top" followCursor
            >
              <Image src={URL.createObjectURL(imageFile)} width="100%" height="100%" />
            </Tooltip>
          </Box>
        </Box>
      }

      {!imageUrl && imageUrlOriginal && (
        <Box display={"flex"} alignItems={"center"}>
          <Tooltip title="Revert" placement="top">
            <IconButton
              size="small"
              onClick={() => {
                if (imageFile) return;
                onRevert();
              }}
            >
              <Replay />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </>
  );
}

ImageUrlPreview.propTypes = {
  imageFile: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  imageUrl: PropTypes.string,
  imageUrlOriginal: PropTypes.string,
  onClear: PropTypes.func.isRequired,
  onRevert: PropTypes.func.isRequired,
};
