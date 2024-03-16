import { Card, CardContent, Typography, Collapse } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { SchoolRounded } from "@mui/icons-material";
import { useState } from "react";
import PropTypes from "prop-types";
import CardHeader from "./elements/CardHeader";
import MoreButtonSection from "./elements/MoreButton";

export default function ProfileCard({ data }) {
  const limit = 2;
  const [isLimit, setIsLimit] = useState(true);
  const [limitedData, setLimitedData] = useState(data.slice(0, limit));

  return (
    <Card>
      <CardContent>
        <CardHeader>
          <SchoolRounded fontSize="large" />
          Education
        </CardHeader>
        
        <TransitionGroup>
        {limitedData.map((item, index) => (
          <Collapse key={index}>
            <Typography fontWeight={"bold"} fontSize={20} mb={0.5}>
              {item.degree} - {item.title}
            </Typography>
            <Typography >{item.school}</Typography>
            <Typography fontWeight="light">{item.year}</Typography>
          </Collapse>
        ))}
        </TransitionGroup>
        <MoreButtonSection
          isLimit={isLimit}
          setIsLimit={setIsLimit}
          data={data}
          limit={limit}
          setLimitedData={setLimitedData}
          text={"Older"}
        />
      </CardContent>
    </Card>
  );
}

ProfileCard.propTypes = {
  data: PropTypes.array.isRequired,
};