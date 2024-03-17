import { Card, CardContent, Typography, Collapse, Divider } from "@mui/material";
import { SchoolRounded } from "@mui/icons-material";
import { TransitionGroup } from "react-transition-group";
import { useState } from "react";
import PropTypes from "prop-types";

import { sortByDate } from "../utils/utils";
import CardHeader from "./elements/CardHeader";
import MoreButtonSection from "./elements/MoreButton";

export default function ProfileCard({ data }) {
  const limit = 2;
  const sortedData = sortByDate(data);
  const [isLimit, setIsLimit] = useState(true);
  const [limitedData, setLimitedData] = useState(sortedData.slice(0, limit));

  return (
    <Card>
      <CardContent>
        <CardHeader>
          <SchoolRounded fontSize="large" />
          Education
        </CardHeader>

        {limitedData.length > 1 && <Typography fontStyle={'italic'} mb={2}>
          in most recent order
        </Typography>}
        
        <TransitionGroup>
          {limitedData.map((item, index) => (
            <Collapse key={index}>
              {index != 0 && <Divider sx={{ my: 2 }} />}
              <Typography fontWeight={"bold"} fontSize={20} mb={0.5}>
                {item.degree} - {item.title}
              </Typography>
              <Typography >{item.school}</Typography>
              <Typography fontWeight="light">{item.from} - {item.to}</Typography>
            </Collapse>
          ))}
        </TransitionGroup>
        <MoreButtonSection
          isLimit={isLimit}
          setIsLimit={setIsLimit}
          data={sortedData}
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