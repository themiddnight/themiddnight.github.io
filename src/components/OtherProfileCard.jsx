import {
  Card,
  CardContent,
  List,
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
          Other Profiles
        </CardHeader>

        <List disablePadding>
          {otherProfilesData.map((item, index) => (
            <ListItem key={index} sx={{ py: 0.5 }}>
              <Link href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title}
              </Link>
              <ListItemIcon sx={{ mx: 1 }}>
                <OpenInNewRounded fontSize="small" color="primary" />
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
