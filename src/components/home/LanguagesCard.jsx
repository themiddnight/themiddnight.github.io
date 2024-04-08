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
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import CircularProgressWithLabel from "../elements/CircularProgressWithLabel";
import CardHeader from "../elements/CardHeader";
import MoreButtonSection from "../elements/MoreButton";

const LanguageItem = ({ label, icon, value }) => {
  const [level, setLevel] = useState("No proficiency");

  function getLevel(value) {
    if (value === 0) return "No proficiency";
    else if (value <= 25) return "Novice";
    else if (value <= 50) return "Intermediate";
    else if (value <= 75) return "Advanced";
    else if (value <= 95) return "Superior";
    else return "Native";
  }

  useEffect(() => {
    setLevel(getLevel(value));
  }, [value]);

  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} width={76}>
      <CircularProgressWithLabel value={value}>
        {icon}
      </CircularProgressWithLabel>
      <Typography>{label}</Typography>
      <Typography textAlign={'center'} fontWeight={"light"} fontSize={'small'} fontStyle={'italic'}>{level}</Typography>
    </Box>
  )
}

export default function LanguagesCard({ data }) {
  const [isLimit, setIsLimit] = useState(true);
  const [activeData, setActiveData] = useState(data.data.filter(item => item.active));
  const [limitedData, setLimitedData] = useState(activeData.slice(0, data.display_limit));

  useEffect(() => {
    setActiveData(data.data.filter(item => item.active));
  }, [data.data]);

  useEffect(() => {
    setLimitedData(activeData.slice(0, isLimit ? data.display_limit : activeData.length));
  }, [isLimit, activeData, data.display_limit]);

  return (
    <Card>
      <CardContent>
        <CardHeader>
          <Language fontSize="large" />
          {data.title}
        </CardHeader>
        <Typography fontStyle={"italic"} mb={ data.subtitle ? 2 : 0 }>
          {data.subtitle}
        </Typography>
        
        <TransitionGroup component={Box} display={'flex'} flexDirection={'column'} gap={1}>
          {limitedData.map((item, index) => (
            <Collapse key={index} hidden={!item.active}>
              
              <Box display={'flex'} alignItems={'baseline'} gap={1}>
                <Typography m={0} fontWeight={"bold"} fontSize={'large'} gutterBottom>{item.title}:</Typography>
                {item.native && <Typography fontWeight={"light"} fontStyle={'italic'}>Native</Typography>}
              </Box>
              {!item.native && (
                <Box display={'flex'} flexWrap={'wrap'} justifyContent={'space-around'} rowGap={1}>
                  <Box display={'flex'} justifyContent={'space-around'} flexGrow={1}>
                    <LanguageItem label={'Read'} icon={<MenuBook />} value={item.skills.read.value} />
                    <LanguageItem label={'Write'} icon={<DriveFileRenameOutline />} value={item.skills.write.value} />
                  </Box>
                  <Box display={'flex'} justifyContent={'space-around'} flexGrow={1}>
                    <LanguageItem label={'Listen'} icon={<Hearing />} value={item.skills.listen.value} />
                    <LanguageItem label={'Speak'} icon={<RecordVoiceOver />} value={item.skills.speak.value} />
                  </Box>
                </Box>
              )}

            </Collapse>
          ))}
        </TransitionGroup>
        <MoreButtonSection
          isLimit={isLimit}
          setIsLimit={setIsLimit}
          data={activeData}
          limit={data.display_limit}
          setLimitedData={setLimitedData}
        />
      </CardContent>
    </Card>
  );
}

LanguagesCard.propTypes = {
  data: PropTypes.object,
};

LanguageItem.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
};