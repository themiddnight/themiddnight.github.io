import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { MenuBook, DriveFileRenameOutline, RecordVoiceOver, Hearing } from "@mui/icons-material";
import CircularProgressWithLabel from "./elements/CircularProgressWithLabel";
import { languagesData } from "../../data/data";

export default function LanguagesCard() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Languages
        </Typography>
        <Box display={'flex'} flexDirection={'column'} gap={2}>

          {languagesData.map((item, index) => (
          <Box key={index}>
            <Typography fontWeight={"bold"} fontSize={'large'} gutterBottom>{item.title}</Typography>
            
            <Box display={'flex'} flexWrap={'wrap'} justifyContent={'space-around'} gap={2}>
              <Box display={'flex'} justifyContent={'space-around'} flexGrow={1} gap={2}>

                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={1}>
                  <CircularProgressWithLabel value={item.read.value}>
                    <MenuBook />
                  </CircularProgressWithLabel>
                  <Typography fontWeight={"light"} fontSize={'small'} fontStyle={'italic'}>{item.read.level}</Typography>
                </Box>

                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={1}>
                  <CircularProgressWithLabel value={item.write.value}>
                    <DriveFileRenameOutline />
                  </CircularProgressWithLabel>
                  <Typography fontWeight={"light"} fontSize={'small'} fontStyle={'italic'}>{item.write.level}</Typography>
                </Box>

              </Box>

              <Box display={'flex'} justifyContent={'space-around'} flexGrow={1}  gap={2}>

                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={1}>
                  <CircularProgressWithLabel value={item.listen.value}>
                    <Hearing />
                  </CircularProgressWithLabel>
                  <Typography fontWeight={"light"} fontSize={'small'} fontStyle={'italic'}>{item.listen.level}</Typography>
                </Box>

                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={1}>
                  <CircularProgressWithLabel value={item.speak.value}>
                    <RecordVoiceOver />
                  </CircularProgressWithLabel>
                  <Typography fontWeight={"light"} fontSize={'small'} fontStyle={'italic'}>{item.speak.level}</Typography>
                </Box>
                
              </Box>
            </Box>

          </Box>
          ))}

        </Box>
      </CardContent>
    </Card>
  );
}
