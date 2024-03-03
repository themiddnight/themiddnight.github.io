import {
  Box,
  Card,
  CardContent,
  Tooltip,
  Typography,
} from "@mui/material";
import { ConstructionRounded } from "@mui/icons-material";
import PropTypes from "prop-types";
import { Image } from "./styled/Image";
import CardHeader from "./elements/CardHeader";

export default function FrameworksCard({ data }) {
  return (
    <Card>
      <CardContent>
        <CardHeader>
          <ConstructionRounded fontSize="large" />
          Tools / Frameworks
        </CardHeader>
        <Typography>
          I&apos;ve some experience with:
        </Typography>
        
        <Box display={"flex"} flexWrap={"wrap"} justifyContent={'center'} gap={3} mt={3} px={1}>
          {data.map((item, index) => (
            <Tooltip 
              key={index}
              placement="top"
              enterTouchDelay={0}
              leaveTouchDelay={5000}
              arrow 
              title={
                <>
                  <Typography fontSize={'small'} fontWeight={"bold"}>{item.title}</Typography>
                  <Typography fontSize={'small'}>{item.description}</Typography>
                </>
              }
            >
              <Image
                src={`icons/frameworks/${item.icon}`}
                alt={item.icon}
                width={35}
                height={35}
                className={item.isMono ? "svg-invert icon" : "icon"}
                zoomed
              />
            </Tooltip>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

FrameworksCard.propTypes = {
  data: PropTypes.array.isRequired,
};