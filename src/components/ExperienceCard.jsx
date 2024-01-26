import { Card, CardContent, Divider, Typography } from "@mui/material";

export default function ProfileCard() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Experiences
        </Typography>
        <Typography fontWeight={"bold"} fontSize={"large"}>
          Layout Artist - Riff Animation Studio
        </Typography>
        <Typography gutterBottom>2013 - 2017</Typography>
        <Typography>
          Working with photo composition in the animation works. And I started
          to work as Technical Director, which working with Python coding to
          make the production flows.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography fontWeight={"bold"} fontSize={"large"}>
          Lead Layout/Technical Director - Yggdrazil Group
        </Typography>
        <Typography gutterBottom>2017 - 2023</Typography>
        <Typography>
          Working with photo composition in the animation works. And I started
          to work as Technical Director, which working with Python coding to
          make the production flows.
        </Typography>
      </CardContent>
    </Card>
  );
}
