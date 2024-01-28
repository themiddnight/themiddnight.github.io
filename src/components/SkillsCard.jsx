import {
  Card,
  CardContent,
} from "@mui/material";
import { skillsData } from "../../data/data";
import LevelList from "./elements/LevelList";
import CardHeader from "./elements/CardHeader";

export default function FrameworksCard() {
  return (
    <Card>
      <CardContent>
        <CardHeader>
          Skills
        </CardHeader>
        <LevelList data={skillsData} color='secondary' />
      </CardContent>
    </Card>
  );
}
