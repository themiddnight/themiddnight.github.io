import { Typography, Box, Divider, /*LinearProgress*/ } from "@mui/material";
import { PropTypes } from "prop-types";

export default function LevelList({ data, src_path /*color*/ }) {
  const iconSize = 30;
  return (
    <>
      <Box display={"flex"} flexDirection={"column"} mx={{ xs: 0, sm: 1 }} mt={2}>
        {data.map((item, index) => (
          <Box key={index}>
            <Box display={"flex"} alignItems={"center"}>
              <Box width={iconSize} height={iconSize} sx={{ marginInlineEnd: 2 }}>
                <img
                  src={`${src_path}/${item.icon}`}
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
                  // justifyContent={"space-between"}
                  gap={1}
                  alignItems={"baseline"}
                  width={"100%"}
                >
                  <Typography fontSize={'large'} fontWeight={"bold"}>{item.title}</Typography>
                  <Typography fontSize={"small"} fontWeight={"light"} fontStyle={"italic"} sx={{ opacity: 1 }}>
                    {item.level}
                  </Typography>
                </Box>
                {/* <LinearProgress
                  variant="determinate"
                  value={item.value}
                  sx={{ height: "8px", borderRadius: 5, my: 1 }}
                  color={color}
                /> */}
                <Typography>{item.description}</Typography>
              </Box>
            </Box>
            {/* <Typography fontSize={"small"}>{item.description}</Typography> */}
            {index !== data.length - 1 && <Divider sx={{ my: 1 }} />}
          </Box>
        ))}
      </Box>
    </>
  );
}

LevelList.propTypes = {
  data: PropTypes.array.isRequired,
  src_path: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
