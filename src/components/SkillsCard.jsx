import {
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  Collapse,
} from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { TerminalRounded } from "@mui/icons-material";
import { useState } from "react";
import PropTypes from "prop-types";

import { Image } from "./styled/Image";
import CardHeader from "./elements/CardHeader";
import MoreButtonSection from "./elements/MoreButton";

export default function FrameworksCard({ data, limit = 7 }) {
  const iconSize = 30;
  const [isLimit, setIsLimit] = useState(true);
  const [limitedData, setLimitedData] = useState(data.slice(0, limit));

  return (
    <Card>
      <CardContent>
        <CardHeader>
          <TerminalRounded fontSize="large" />
          Skills
        </CardHeader>

        <TransitionGroup
          component={Box}
          display={"flex"}
          flexDirection={"column"}
          mx={{ xs: 0, sm: 1 }}
          mt={2}
        >
          {limitedData.map((item, index) => (
            <Collapse key={index}>
              {index != 0 && <Divider sx={{ my: 1 }} />}
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
                    <Typography fontSize={20} fontWeight={"bold"} mb={0.5}>
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
                  <Typography mb={0.5}>{item.description}</Typography>
                </Box>
              </Box>
            </Collapse>
          ))}
        </TransitionGroup>
        <MoreButtonSection
          isLimit={isLimit}
          setIsLimit={setIsLimit}
          setLimitedData={setLimitedData}
          limit={limit}
          data={data}
        />
      </CardContent>
    </Card>
  );
}

FrameworksCard.propTypes = {
  data: PropTypes.array.isRequired,
  limit: PropTypes.number,
};
