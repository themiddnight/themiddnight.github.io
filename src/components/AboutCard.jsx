import { Card, CardContent, Typography } from "@mui/material";
import { PersonRounded } from "@mui/icons-material";
import CardHeader from "./elements/CardHeader";

export default function ProfileCard() {
  return (
    <Card>
      <CardContent>
        <CardHeader><PersonRounded fontSize="large" />Profile</CardHeader>
        <Typography>
          Experienced animation layout artist skilled in Python for workflow
          optimization. Transitioning to web development with a keen interest in
          emerging technologies. Adept at merging creativity with coding to
          craft visually compelling and functional digital experiences.
        </Typography>
      </CardContent>
    </Card>
  );
}
