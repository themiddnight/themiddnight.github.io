import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { skillsData } from "../../data/data";
import LevelList from "./elements/LevelList";

export default function FrameworksCard() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Skills
        </Typography>
        <LevelList data={skillsData} color='secondary' />
      </CardContent>
    </Card>
  );
}
