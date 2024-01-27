import { Box, Modal } from "@mui/material";
import { PropTypes } from "prop-types";

export default function ImageModal({ open, setOpen, image }) {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="image-modal"
      aria-describedby="image-modal"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        width={{ sm: "100%", md: "80%", lg: "70%", xl: "60%" }}
        borderRadius={{ sm: 0, md: 1 }}
        overflow={"hidden"}
        boxShadow={10}
        position={'absolute'}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <img src={image} alt="modal" width={"100%"} height={"100%"} />
      </Box>
    </Modal>
  );
}

ImageModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
};
