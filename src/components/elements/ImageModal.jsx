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
        width={{ xs: "100%", sm: "90%", md: "80%", lg: "70%", xl: "60%" }}
        borderRadius={1}
        overflow={"hidden"}
        boxShadow={10}
        className={"modal-image-container"}
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
