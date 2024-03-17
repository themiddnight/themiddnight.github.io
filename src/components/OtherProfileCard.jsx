import {
  Card,
  CardContent,
  ListItem,
  ListItemIcon,
  Link,
  Collapse,
} from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { GroupsRounded, OpenInNewRounded } from "@mui/icons-material";
import { useState } from "react";
import PropTypes from "prop-types";

import CardHeader from "./elements/CardHeader";
import MoreButtonSection from "./elements/MoreButton";

export default function OtherProfileCard({ data, limit = 3 }) {
  const [isLimit, setIsLimit] = useState(true);
  const [limitedData, setLimitedData] = useState(data.slice(0, limit));

  return (
    <Card>
      <CardContent>
        <CardHeader>
          <GroupsRounded fontSize="large" />
          Other Profiles
        </CardHeader>

        <TransitionGroup>
          {limitedData.map((item, index) => (
            <Collapse key={index}>
              <ListItem sx={{ p: 0.5 }}>
                <Link href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </Link>
                <ListItemIcon sx={{ mx: 1 }}>
                  <OpenInNewRounded fontSize="small" color="primary" />
                </ListItemIcon>
              </ListItem>
            </Collapse>
          ))}
        </TransitionGroup>
        <MoreButtonSection
          isLimit={isLimit}
          setIsLimit={setIsLimit}
          data={data}
          limit={limit}
          setLimitedData={setLimitedData}
          mt={1}
        />
      </CardContent>
    </Card>
  );
}

OtherProfileCard.propTypes = {
  data: PropTypes.array.isRequired,
  limit: PropTypes.number,
};
