import { Card, CardContent, Divider, Typography, Box } from "@mui/material";
import { WorkRounded } from "@mui/icons-material";
import { experiencesData } from "../../data/data";
import CardHeader from "./elements/CardHeader";

export default function ProfileCard() {
  return (
    <Card>
      <CardContent>
        <CardHeader>
          <WorkRounded fontSize="large" />
          Experiences
        </CardHeader>
        
        {experiencesData.map((item, index) => (
          <Box key={index}>
            <Typography fontWeight={"bold"} fontSize={"large"}>
              {item.title} - {item.company}
            </Typography>
            <Typography fontWeight='light' gutterBottom>{item.year}</Typography>
            <Typography>
              {item.description}
            </Typography>
            {index !== experiencesData.length - 1 && <Divider sx={{ my: 2 }} />}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}
