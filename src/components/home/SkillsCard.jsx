import {
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  Collapse,
} from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { TipsAndUpdatesRounded } from "@mui/icons-material";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Image } from "../styled/Image";
import CardHeader from "../elements/CardHeader";
import MoreButtonSection from "../elements/MoreButton";

export default function SkillsCard({ data }) {
  const iconSize = 30;
  const [isLimit, setIsLimit] = useState(true);
  const [activeData, setActiveData] = useState(data.data.filter(item => item.active));
  const [limitedData, setLimitedData] = useState(activeData.slice(0, data.display_limit));

  useEffect(() => {
    setActiveData(data.data.filter(item => item.active));
  }, [data.data]);

  useEffect(() => {
    setLimitedData(activeData.slice(0, isLimit ? data.display_limit : activeData.length));
  }, [isLimit, activeData, data.display_limit]);

  return (
    <Card>
      <CardContent>
        <CardHeader>
          <TipsAndUpdatesRounded fontSize="large" />
          {data.title}
        </CardHeader>
        <Typography fontStyle={"italic"} mb={ data.subtitle ? 2 : 0 }>
          {data.subtitle}
        </Typography>

        <TransitionGroup
          component={Box}
          display={"flex"}
          flexDirection={"column"}
          mx={{ xs: 0, md: 1 }}
          mt={2}
        >
          {limitedData.map((item, index) => (
            <Collapse key={index} hidden={!item.active}>
              {index != 0 && <Divider sx={{ my: 1 }} />}
              <Box display={"flex"} alignItems={"center"}>
                {item.image_url && <Box
                  width={iconSize}
                  height={iconSize}
                  sx={{ marginInlineEnd: 2 }}
                >
                  <Image
                    src={`${item.image_url}`}
                    alt={item.title}
                    width={iconSize}
                    height={iconSize}
                    className={item.is_mono ? "svg-invert" : ""}
                  />
                </Box>}
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
          data={activeData}
          limit={data.display_limit}
          setLimitedData={setLimitedData}
        />
      </CardContent>
    </Card>
  );
}

SkillsCard.propTypes = {
  data: PropTypes.object,
};
