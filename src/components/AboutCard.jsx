import { Card, CardContent, Typography } from "@mui/material";
import CardHeader from "./elements/CardHeader";

export default function ProfileCard() {
  return (
    <Card>
      <CardContent>
        <CardHeader>Profile</CardHeader>
        <Typography>
          A self-learner web developer experienced in Python in the CG industry.
          Learned Front-end in boot-camps and self-learned for the back-end.
          Graduated BS for Information and Communication Technology from
          Silpakorn University
        </Typography>
      </CardContent>
    </Card>
  );
}
