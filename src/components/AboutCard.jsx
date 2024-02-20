import { Card, CardContent, Typography } from "@mui/material";
import { PersonRounded } from "@mui/icons-material";
import { aboutData } from "../../data/data";
import CardHeader from "./elements/CardHeader";

export default function ProfileCard() {
  return (
    <Card>
      <CardContent>
        <CardHeader>
          <PersonRounded fontSize="large" />
          Profile
        </CardHeader>
        
        {aboutData.map((item, index) => (
          <Typography key={index} pb={index !== aboutData.length - 1 ? 2 : 0}>
            {item}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
}
