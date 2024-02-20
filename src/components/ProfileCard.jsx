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
  LocationOn,
  LinkedIn,
  GitHub,
} from "@mui/icons-material";
import profilePic from "/images/profile3.jpeg";

export default function ProfileCard() {
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
            flexDirection: { xs: "column", md: "row" },
            flexWrap: "wrap",
          }}
        >
          <Avatar
            alt="Pathompong Thitithan's profile picture"
            src={profilePic}
            sx={{ width: 140, height: 140, boxShadow: 3 }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexBasis: 0,
              flexGrow: 1,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography variant="h4" fontWeight={"bold"} gutterBottom>
              Pathonpong Thitithan
            </Typography>
            <Typography variant="body2" fontWeight="light">
              Who seeks the way to be a developer.
            </Typography>
          </Box>
        </Box>
        <List disablePadding>
          <ListItem>
            <ListItemIcon>
              <LocationOn />
            </ListItemIcon>
            <ListItemText>Bangkok, Thailand</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Email color={"primary"} />
            </ListItemIcon>
            <Link
              sx={{ paddingBlock: "4px"}}
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
