import { Typography, Box, LinearProgress } from "@mui/material";
import { PropTypes } from "prop-types";

export default function LevelList({ data, color }) {
  const iconSize = 30;
  return (
    <>
      <Box display={"flex"} flexDirection={"column"} mx={{ xs: 0, sm: 2 }}>
        {data.map((item, index) => (
          <Box key={index} my={1}>
            <Box display={"flex"} alignItems={"center"}>
              <Box width={iconSize} height={iconSize} sx={{ marginInlineEnd: 2 }}>
                <img
                  src={`icons/${item.icon}`}
                  alt={item.title}
                  width={iconSize}
                  height={iconSize}
                  className={ item.isMono ? "svg-invert" : ""}
                />
              </Box>
              <Box width={"100%"}>
                <Box
                  display={"flex"}
                  flexWrap={"wrap"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  width={"100%"}
                >
                  <Typography fontWeight={"bold"}>{item.title}</Typography>
                  <Typography fontSize={"small"} fontStyle={"italic"}>
                    {item.level}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={item.value}
                  sx={{ height: "8px", borderRadius: 5, my: 1 }}
                  color={color}
                />
              </Box>
            </Box>
            <Typography fontSize={"small"}>{item.description}</Typography>
          </Box>
        ))}
      </Box>
    </>
  );
}

LevelList.propTypes = {
  data: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired,
};
