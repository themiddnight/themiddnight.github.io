import { Card, CardContent, Divider, Typography, Collapse } from "@mui/material";
import { useState } from "react";
import { TransitionGroup } from "react-transition-group";
import { WorkRounded } from "@mui/icons-material";
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
          <WorkRounded fontSize="large" />
          Experiences
        </CardHeader>
        <Typography fontStyle={'italic'} mb={2}>
          in most recent order
        </Typography>
        
        <TransitionGroup>
          {limitedData.map((item, index) => (
            <Collapse key={index}>
              {index != 0 && <Divider sx={{ my: 2 }} />}
              <Typography fontWeight={"bold"} fontSize={20}>
                {item.title} - {item.company}
              </Typography>
              <Typography fontWeight='light' gutterBottom>{item.year}</Typography>
              <Typography>
                {item.description}
              </Typography>
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