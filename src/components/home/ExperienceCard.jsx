import { Card, CardContent, Divider, Typography, Collapse, Box } from "@mui/material";
import { WorkRounded } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";

import { convertDate } from "../../utils/utils";
import CardHeader from "../elements/CardHeader";
import MoreButtonSection from "../elements/MoreButton";

export default function ExperienceCard({ data }) {
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
          <WorkRounded fontSize="large" />
          {data.title}
        </CardHeader>
        
        <Typography fontStyle={"italic"} mb={ data.subtitle ? 2 : 0 }>
          {data.subtitle}
        </Typography>
        
        <TransitionGroup>
          {limitedData.map((item, index) => (
            <Collapse key={index} hidden={!item.active}>
              {index != 0 && <Divider sx={{ my: 2 }} />}
              <Box 
                display={'flex'} 
                flexDirection={{ xs: "column", xl: "row" }} 
                justifyContent={'space-between'} 
                alignItems={'baseline'} 
                mb={1.5} 
                gap={{ xs: 0.5, xl: 2 }}
              >
                <Typography fontWeight={"bold"} fontSize={20}>
                  {item.title} {item.company ? "-" : ""} {item.company}
                </Typography>
                <Typography fontWeight='light' fontSize={'small'} flexShrink={0}>
                  {convertDate(item.from)} - {item.current ? "Present" : convertDate(item.to)}
                </Typography>
              </Box>
              {item.description.map((desc, index) => (
                <Typography key={index} mb={index !== item.description.length - 1 ? 1 : 0}>
                  {desc.content}
                </Typography>
              ))}
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

ExperienceCard.propTypes = {
  data: PropTypes.object,
};