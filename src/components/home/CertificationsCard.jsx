import {
  Card,
  CardContent,
  Typography,
  Box,
  Link,
  Collapse,
} from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { CardMembershipRounded } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useContext, useState, useEffect } from "react";

import { convertDate } from "../../utils/utils";
import { ModalContext } from "../../App";
import { Image } from "../styled/Image";
import CardHeader from "../elements/CardHeader";
import MoreButtonSection from "../elements/MoreButton";

export default function CertificationsCard({ data }) {
  const { setIsImageModalOpen, setImageModalSrc } = useContext(ModalContext);
  const [isLimit, setIsLimit] = useState(true);
  const [activeData, setActiveData] = useState(data.data.filter(item => item.active));
  const [limitedData, setLimitedData] = useState(activeData.slice(0, data.display_limit));

  function handleOpenModal(e) {
    e.preventDefault();
    setImageModalSrc(e.target.src);
    setIsImageModalOpen(true);
  }

  useEffect(() => {
    setActiveData(data.data.filter(item => item.active));
  }, [data.data]);

  useEffect(() => {
    setLimitedData(activeData.slice(0, isLimit ? data.display_limit : activeData.length));
  }, [isLimit, activeData, data.display_limit]);

  return (
    <Card>
      <CardContent>
        <CardHeader
          sx={{
            paddingBlockEnd: 1,
          }}
        >
          <CardMembershipRounded fontSize="large" />
          {data.title}
        </CardHeader>
        <Typography fontStyle={"italic"} mb={ data.subtitle ? 2 : 0 }>
          {data.subtitle}
        </Typography>

        <TransitionGroup
          component={Box}
          display="flex"
          flexDirection="column"
        >
          {limitedData.map((cert, index) => (
            <Collapse key={index} hidden={!cert.active}>
              <Box
                display={"flex"}
                alignItems={{ xs: "start", sm: "center" }}
                gap={{ xs: 1, sm: 2 }}
                mt={index === 0 ? 0 : 2}
              >
                {cert.image_url && <Box
                  height={60}
                  width={80}
                  flexBasis={{ xs: 90, sm: 90 }}
                  flexShrink={0}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderRadius={"5px"}
                  overflow={"hidden"}
                  sx={{
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.1)" },
                  }}
                >
                  <Image
                    src={`${cert.image_url}`}
                    alt={cert.title}
                    width="100%"
                    height="100%"
                    style={{ cursor: "pointer" }}
                    onClick={handleOpenModal}
                  />
                </Box>}
                <Box display={"flex"} flexDirection={"column"}>
                  <Typography
                    component={cert.credentialUrl ? Link : "span"}
                    href={cert.credentialUrl}
                    target={"_blank"}
                    fontWeight={"bold"}
                    mb={0.5}
                  >
                    {cert.title}
                  </Typography>
                  <Typography fontSize={"small"}>
                    {cert.issuedBy ? "Issued by: " : ""} {cert.issuedBy}
                  </Typography>
                  <Typography fontSize={"small"} fontWeight="light">
                    {convertDate(cert.issuedDate, true)}
                  </Typography>
                </Box>
              </Box>
            </Collapse>
          ))}
        </TransitionGroup>
        <MoreButtonSection
          isLimit={isLimit}
          setIsLimit={setIsLimit}
          setLimitedData={setLimitedData}
          data={activeData}
          limit={data.display_limit}
        />
      </CardContent>
    </Card>
  );
}

CertificationsCard.propTypes = {
  data: PropTypes.object,
};
