import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { frameworksData } from "../../data/data";
import LevelList from "./elements/LevelList";

export default function FrameworksCard() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Tools/Frameworks
        </Typography>
        <LevelList data={frameworksData} color='primary' />
      </CardContent>
    </Card>
  );
}
