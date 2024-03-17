import { Button, Box } from "@mui/material";
import PropTypes from "prop-types";

export default function MoreButtonSection({
  isLimit,
  setIsLimit,
  data,
  limit = 3,
  setLimitedData,
  text = "",
  mt = 2,
}) {
  const moreCount = data.length - limit;
  if (moreCount <= 0) return null;

  return (
    <Box display={"flex"} justifyContent={"center"} mt={mt}>
      <Button
        size="small"
        variant="text"
        sx={{ px: 3 }}
        onClick={() => {
          setLimitedData(isLimit ? data : data.slice(0, limit));
          setIsLimit(!isLimit);
        }}
      >
        {isLimit
          ? `Show ${moreCount} More ${text}${text && moreCount > 1 ? "s" : ""}`
          : "Show Less"}
      </Button>
    </Box>
  );
}

MoreButtonSection.propTypes = {
  isLimit: PropTypes.bool.isRequired,
  setIsLimit: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  limit: PropTypes.number,
  setLimitedData: PropTypes.func.isRequired,
  text: PropTypes.string,
  mt: PropTypes.number,
};
