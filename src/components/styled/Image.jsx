import { styled } from "@mui/system";

export const Image = styled("img")(({ zoomed }) => ({
  objectFit: "cover",
  transition: "transform 0.3s",
  "&:hover": {
    transform: zoomed ? "scale(1.2)" : "none",
  },
}));

Image.defaultProps = {
  loading: "lazy",
};
