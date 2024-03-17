import { Card, CardContent, Typography } from "@mui/material";
import { PersonRounded } from "@mui/icons-material";
import PropTypes from "prop-types";
import CardHeader from "./elements/CardHeader";

export default function AboutCard({ data }) {
  return (
    <Card>
      <CardContent>
        <CardHeader>
          <PersonRounded fontSize="large" />
          About
        </CardHeader>
        
        {data.map((item, index) => (
          <Typography key={index} pb={index !== data.length - 1 ? 2 : 0}>
            {item}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
}

AboutCard.propTypes = {
  data: PropTypes.array.isRequired,
};