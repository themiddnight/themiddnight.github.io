import {
  Card,
  CardContent,
  ListItem,
  ListItemIcon,
  Link,
} from "@mui/material";
import { GroupsRounded, OpenInNewRounded } from "@mui/icons-material";
import CardHeader from "./elements/CardHeader";
import { otherProfilesData } from "../../data/data";

export default function OtherProfileCard() {
  return (
    <Card>
      <CardContent>
        <CardHeader>
          <GroupsRounded fontSize="large" />
          Other Profile
        </CardHeader>

        {otherProfilesData.map((item, index) => (
          <ListItem key={index}>
            <Link href={item.url} target="_blank" rel="noopener noreferrer">
              {item.title}
            </Link>
            <ListItemIcon sx={{ mx: 1 }}>
              <OpenInNewRounded fontSize="small" color="primary" />
            </ListItemIcon>
          </ListItem>
        ))}
      </CardContent>
    </Card>
  );
}
