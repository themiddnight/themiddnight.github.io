import { Card, CardContent, Typography, Collapse, Divider, Box } from "@mui/material";
import { SchoolRounded } from "@mui/icons-material";
import { TransitionGroup } from "react-transition-group";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import CardHeader from "../elements/CardHeader";
import MoreButtonSection from "../elements/MoreButton";

export default function EducationCard({ data }) {
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
          <SchoolRounded fontSize="large" />
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
                <Typography fontWeight={"bold"} fontSize={20} mb={0.5}>
                  {item.degree} {item.degree ? "-" : "" } {item.title}
                </Typography>
                <Typography fontWeight="light" fontSize={'small'} flexShrink={0}>{item.from} {item.to ? "-" : ""} {item.current ? "Present" : item.to}</Typography>
              </Box>
              <Typography >{item.school}</Typography>
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

EducationCard.propTypes = {
  data: PropTypes.object.isRequired,
};