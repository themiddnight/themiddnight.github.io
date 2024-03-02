import { Card, CardContent, Box, Typography, Divider } from "@mui/material";
import { TerminalRounded } from "@mui/icons-material";
import PropTypes from "prop-types";
import { Image } from "./styled/Image";
import CardHeader from "./elements/CardHeader";

export default function FrameworksCard({ data }) {
  const iconSize = 30;
  return (
    <Card>
      <CardContent>
        <CardHeader>
          <TerminalRounded fontSize="large" />
          Skills
        </CardHeader>

        <Box
          display={"flex"}
          flexDirection={"column"}
          mx={{ xs: 0, sm: 1 }}
          mt={2}
        >
          {data.map((item, index) => (
            <Box key={index}>
              <Box display={"flex"} alignItems={"center"}>
                <Box
                  width={iconSize}
                  height={iconSize}
                  sx={{ marginInlineEnd: 2 }}
                >
                  <Image
                    src={`/icons/skills/${item.icon}`}
                    alt={item.title}
                    width={iconSize}
                    height={iconSize}
                    className={item.isMono ? "svg-invert" : ""}
                  />
                </Box>
                <Box width={"100%"}>
                  <Box
                    display={"flex"}
                    flexWrap={"wrap"}
                    gap={1}
                    alignItems={"baseline"}
                    width={"100%"}
                  >
                    <Typography fontSize={"large"} fontWeight={"bold"}>
                      {item.title}
                    </Typography>
                    <Typography
                      fontSize={"small"}
                      fontWeight={"light"}
                      fontStyle={"italic"}
                      sx={{ opacity: 1 }}
                    >
                      {item.level}
                    </Typography>
                  </Box>
                  <Typography>{item.description}</Typography>
                </Box>
              </Box>
              {index !== data.length - 1 && <Divider sx={{ my: 1 }} />}
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

FrameworksCard.propTypes = {
  data: PropTypes.array.isRequired,
};
