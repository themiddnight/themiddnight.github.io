import {
  Box,
  Card,
  CardContent,
  Typography,
  Collapse,
} from "@mui/material";
import {
  MenuBook,
  DriveFileRenameOutline,
  RecordVoiceOver,
  Hearing,
  Language,
} from "@mui/icons-material";
import { TransitionGroup } from "react-transition-group";
import { useState } from "react";
import PropTypes from "prop-types";

import CircularProgressWithLabel from "./elements/CircularProgressWithLabel";
import CardHeader from "./elements/CardHeader";
import MoreButtonSection from "./elements/MoreButton";

function LanguageItem({ label, icon, data }) {
  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} width={70}>
      <CircularProgressWithLabel value={data.value}>
        {icon}
      </CircularProgressWithLabel>
      <Typography>{label}</Typography>
      <Typography fontWeight={"light"} fontSize={'small'} fontStyle={'italic'}>{data.level}</Typography>
    </Box>
  )
}

export default function LanguagesCard({ data, limit = 2 }) {
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
                    <LanguageItem label={'Read'} icon={<MenuBook />} data={item.read} />
                    <LanguageItem label={'Write'} icon={<DriveFileRenameOutline />} data={item.write} />
                  </Box>
                  <Box display={'flex'} justifyContent={'space-around'} flexGrow={1}>
                    <LanguageItem label={'Listen'} icon={<Hearing />} data={item.listen} />
                    <LanguageItem label={'Speak'} icon={<RecordVoiceOver />} data={item.speak} />
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
  limit: PropTypes.number,
};

LanguageItem.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  data: PropTypes.object.isRequired,
};