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
import { useState } from "react";
import PropTypes from "prop-types";

import { Image } from "./styled/Image";
import CardHeader from "./elements/CardHeader";
import MoreButtonSection from "./elements/MoreButton";

export default function FrameworksCard({ title, data, limit = 21}) {
  const [isLimit, setIsLimit] = useState(true);
  const [limitedData, setLimitedData] = useState(data.slice(0, limit));

  return (
    <Card>
      <CardContent>
        <CardHeader>
          <ConstructionRounded fontSize="large" />
          {title}
        </CardHeader>
        <Typography fontStyle={"italic"}>
          I&apos;ve some experience with:
        </Typography>

        <TransitionGroup
          component={Box}
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={"center"}
          gap={3}
          mt={3}
          px={1}
        >
          {limitedData.map((item, index) => (
            <Collapse key={index}>
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
                <Image
                  src={`${item.image_url}`}
                  alt={item.icon}
                  width={35}
                  height={35}
                  className={item.isMono ? "svg-invert icon" : "icon"}
                  zoomed
                />
              </Tooltip>
            </Collapse>
          ))}
        </TransitionGroup>
        <MoreButtonSection
          isLimit={isLimit}
          setIsLimit={setIsLimit}
          data={data}
          limit={limit}
          setLimitedData={setLimitedData}
        />
      </CardContent>
    </Card>
  );
}

FrameworksCard.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  limit: PropTypes.number,
};
