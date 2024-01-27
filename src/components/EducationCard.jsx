import { Card, CardContent, Typography } from "@mui/material";

export default function ProfileCard() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Education
        </Typography>
        <Typography fontWeight={"bold"} fontSize={'large'}>
          Information and Communication Technology - B.S.
        </Typography>
        <Typography fontWeight={"bold"}>Silpakorn University</Typography>
        <Typography fontWeight='light'>2009 - 2014</Typography>
      </CardContent>
    </Card>
  );
}
