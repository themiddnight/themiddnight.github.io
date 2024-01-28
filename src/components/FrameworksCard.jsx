import {
  Card,
  CardContent,
} from "@mui/material";
import { frameworksData } from "../../data/data";
import LevelList from "./elements/LevelList";
import CardHeader from "./elements/CardHeader";

export default function FrameworksCard() {
  return (
    <Card>
      <CardContent>
        <CardHeader>
          Tools / Frameworks
        </CardHeader>
        <LevelList data={frameworksData} color='warning' />
      </CardContent>
    </Card>
  );
}
