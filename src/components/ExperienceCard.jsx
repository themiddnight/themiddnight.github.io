import { Card, CardContent, Divider, Typography, Box } from "@mui/material";
import { experiencesData } from "../../data/data";

export default function ProfileCard() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Experiences
        </Typography>
        
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
