import {
  Box,
  Avatar,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
} from "@mui/material";
import {
  Email,
  PhoneIphone,
  LocationOn,
  LinkedIn,
  GitHub,
} from "@mui/icons-material";
import profilePic from "/images/profile.jpeg";

export default function ProfileCard() {
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            my: 1,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Avatar
            alt="Pathompong Thitithan"
            src={profilePic}
            sx={{ width: 130, height: 130, boxShadow: 3 }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Typography variant="h4" fontWeight={"bold"}>
              Pathonpong Thitithan
            </Typography>
            <Typography variant="body1" fontWeight="light">
              Who seeking the way of developer
            </Typography>
          </Box>
        </Box>
        <List>
          <ListItem>
            <ListItemIcon>
              <LocationOn />
            </ListItemIcon>
            <ListItemText>Bangkok, Thailand</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PhoneIphone />
            </ListItemIcon>
            <ListItemText>+66846412667</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Email color={"primary"} />
            </ListItemIcon>
            <Link
              sx={{ paddingBlock: "4px" }}
              href="mailto:the.middnight.k.0173@gmail.com"
            >
              the.midnight.k.0173@gmail.com
            </Link>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LinkedIn color={"primary"} />
            </ListItemIcon>
            <Link
              sx={{ paddingBlock: "4px" }}
              href="https://www.linkedin.com/in/pathompong-thitithan-b2a2829b"
              target={"_blank"}
            >
              LinkedIn
            </Link>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <GitHub color={"primary"} />
            </ListItemIcon>
            <Link
              sx={{ paddingBlock: "4px" }}
              href="https://github.com/themiddnight"
              target={"_blank"}
            >
              GitHub
            </Link>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
