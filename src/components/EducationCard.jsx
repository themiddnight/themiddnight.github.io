import { Card, CardContent, Typography } from "@mui/material";
import { SchoolRounded } from "@mui/icons-material";
import CardHeader from "./elements/CardHeader";

export default function ProfileCard() {
  return (
    <Card>
      <CardContent>
        <CardHeader><SchoolRounded fontSize="large"/>Education</CardHeader>
        <Typography fontWeight={"bold"} fontSize={'large'}>
          Information and Communication Technology - B.S.
        </Typography>
        <Typography fontWeight={"bold"}>Silpakorn University</Typography>
        <Typography fontWeight='light'>2009 - 2014</Typography>
      </CardContent>
    </Card>
  );
}
