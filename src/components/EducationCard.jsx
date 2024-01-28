import { Card, CardContent, Typography } from "@mui/material";
import CardHeader from "./elements/CardHeader";

export default function ProfileCard() {
  return (
    <Card>
      <CardContent>
        <CardHeader>Education</CardHeader>
        <Typography fontWeight={"bold"} fontSize={'large'}>
          Information and Communication Technology - B.S.
        </Typography>
        <Typography fontWeight={"bold"}>Silpakorn University</Typography>
        <Typography fontWeight='light'>2009 - 2014</Typography>
      </CardContent>
    </Card>
  );
}
