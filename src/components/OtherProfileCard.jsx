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
import PropTypes from "prop-types";

export default function OtherProfileCard({ data }) {
  return (
    <Card>
      <CardContent>
        <CardHeader>
          <GroupsRounded fontSize="large" />
          Other Profiles
        </CardHeader>

        <List disablePadding>
          {data.map((item, index) => (
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

OtherProfileCard.propTypes = {
  data: PropTypes.array.isRequired,
};