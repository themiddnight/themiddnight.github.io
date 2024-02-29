import { Card, CardContent, Typography } from "@mui/material";
import { SchoolRounded } from "@mui/icons-material";
import PropTypes from "prop-types";
import CardHeader from "./elements/CardHeader";

export default function ProfileCard({ data }) {
  return (
    <Card>
      <CardContent>
        <CardHeader>
          <SchoolRounded fontSize="large" />
          Education
        </CardHeader>
        
        {data.map((item, index) => (
          <div key={index}>
            <Typography fontWeight={"bold"} fontSize={"large"}>
              {item.title} - {item.degree}
            </Typography>
            <Typography fontWeight={"bold"}>{item.school}</Typography>
            <Typography fontWeight="light">{item.year}</Typography>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

ProfileCard.propTypes = {
  data: PropTypes.array.isRequired,
};