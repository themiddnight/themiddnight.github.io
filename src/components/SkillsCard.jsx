import {
  Card,
  CardContent,
} from "@mui/material";
import { TerminalRounded } from "@mui/icons-material";
import { skillsData } from "../../data/data";
import LevelList from "./elements/LevelList";
import CardHeader from "./elements/CardHeader";

export default function FrameworksCard() {
  return (
    <Card>
      <CardContent>
        <CardHeader>
          <TerminalRounded fontSize="large" />
          Skills
        </CardHeader>
        <LevelList data={skillsData} src_path='icons/skills' color='secondary' />
      </CardContent>
    </Card>
  );
}
