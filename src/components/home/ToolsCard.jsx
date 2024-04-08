import {
  Box,
  Card,
  CardContent,
  Tooltip,
  Typography,
  Collapse,
} from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { ConstructionRounded } from "@mui/icons-material";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Image } from "../styled/Image";
import CardHeader from "../elements/CardHeader";
import MoreButtonSection from "../elements/MoreButton";

export default function ToolsCard({ data }) {
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
          <ConstructionRounded fontSize="large" />
          {data.title}
        </CardHeader>
        <Typography fontStyle={"italic"} mb={ data.subtitle ? 2 : 0 }>
          {data.subtitle}
        </Typography>

        <TransitionGroup
          component={Box}
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={limitedData.every((item) => item.image_url) ? "center" : "flex-start"}
          gap={3}
          mt={3}
          px={1}
        >
          {limitedData.map((item, index) => (
            <Collapse key={index} hidden={!item.active}>
              <Tooltip
                placement="top"
                enterTouchDelay={0}
                leaveTouchDelay={5000}
                arrow
                title={
                  <>
                    <Typography fontSize={"small"} fontWeight={"bold"}>
                      {item.title}
                    </Typography>
                    <Typography fontSize={"small"}>
                      {item.description}
                    </Typography>
                  </>
                }
              >
                {item.image_url 
                ? <Image
                  src={`${item.image_url}`}
                  alt={item.icon}
                  width={35}
                  height={35}
                  className={item.isMono ? "svg-invert icon" : "icon"}
                  zoomed
                />
                : item.title}
              </Tooltip>
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

ToolsCard.propTypes = {
  data: PropTypes.object,
};
