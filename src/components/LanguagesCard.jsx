import {
  Box,
  Card,
  CardContent,
  Typography,
  Collapse,
} from "@mui/material";
import { MenuBook, DriveFileRenameOutline, RecordVoiceOver, Hearing, Language } from "@mui/icons-material";
import { TransitionGroup } from "react-transition-group";
import { useState } from "react";
import PropTypes from "prop-types";
import CircularProgressWithLabel from "./elements/CircularProgressWithLabel";
import CardHeader from "./elements/CardHeader";
import MoreButtonSection from "./elements/MoreButton";

export default function LanguagesCard({ data }) {
  const limit = 2;
  const [isLimit, setIsLimit] = useState(true);
  const [limitedData, setLimitedData] = useState(data.slice(0, limit));

  return (
    <Card>
      <CardContent>
        <CardHeader>
          <Language fontSize="large" />
          Languages
        </CardHeader>
        
        <TransitionGroup component={Box} display={'flex'} flexDirection={'column'} gap={1}>

          {limitedData.map((item, index) => (
          <Collapse key={index}>
            <Box display={'flex'} alignItems={'baseline'} gap={1}>
              <Typography m={0} fontWeight={"bold"} fontSize={'large'} gutterBottom>{item.title}:</Typography>
              {item.native && <Typography fontWeight={"light"} fontStyle={'italic'}>Native</Typography>}
            </Box>

            {!item.native && (
              <Box display={'flex'} flexWrap={'wrap'} justifyContent={'space-around'}>
                <Box display={'flex'} justifyContent={'space-around'} flexGrow={1}>

                  <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} width={70}>
                    <CircularProgressWithLabel value={item.read.value}>
                      <MenuBook />
                    </CircularProgressWithLabel>
                    <Typography>Read</Typography>
                    <Typography fontWeight={"light"} fontSize={'small'} fontStyle={'italic'}>{item.read.level}</Typography>
                  </Box>

                  <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} width={70}>
                    <CircularProgressWithLabel value={item.write.value}>
                      <DriveFileRenameOutline />
                    </CircularProgressWithLabel>
                    <Typography>Write</Typography>
                    <Typography fontWeight={"light"} fontSize={'small'} fontStyle={'italic'}>{item.write.level}</Typography>
                  </Box>

                </Box>

                <Box display={'flex'} justifyContent={'space-around'} flexGrow={1}>

                  <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} width={70}>
                    <CircularProgressWithLabel value={item.listen.value}>
                      <Hearing />
                    </CircularProgressWithLabel>
                    <Typography>Listen</Typography>
                    <Typography fontWeight={"light"} fontSize={'small'} fontStyle={'italic'}>{item.listen.level}</Typography>
                  </Box>

                  <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} width={70}>
                    <CircularProgressWithLabel value={item.speak.value}>
                      <RecordVoiceOver />
                    </CircularProgressWithLabel>
                    <Typography>Speak</Typography>
                    <Typography fontWeight={"light"} fontSize={'small'} fontStyle={'italic'}>{item.speak.level}</Typography>
                  </Box>
                  
                </Box>
              </Box>
            )}

          </Collapse>
          ))}

        </TransitionGroup>
        <MoreButtonSection
          isLimit={isLimit}
          setIsLimit={setIsLimit}
          data={data}
          limit={limit}
          setLimitedData={setLimitedData}
        />
      </CardContent>
    </Card>
  );
}

LanguagesCard.propTypes = {
  data: PropTypes.array.isRequired,
};