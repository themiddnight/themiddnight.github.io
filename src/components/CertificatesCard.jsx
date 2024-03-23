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
import { useContext, useState } from "react";

import { convertDate, sortByDate } from "../utils/utils";
import { ModalContext } from "../App";
import { Image } from "./styled/Image";
import CardHeader from "./elements/CardHeader";
import MoreButtonSection from "./elements/MoreButton";

export default function CertificatesCard({ title, data, limit = 3 }) {
  const { setIsImageModalOpen, setImageModalSrc } = useContext(ModalContext);
  const sortedData = sortByDate(data, "issuedDate");
  const [isLimit, setIsLimit] = useState(true);
  const [limitedData, setLimitedData] = useState(sortedData.slice(0, limit));

  function handleOpenModal(e) {
    e.preventDefault();
    setImageModalSrc(e.target.src);
    setIsImageModalOpen(true);
  }

  return (
    <Card>
      <CardContent>
        <CardHeader
          sx={{
            paddingBlockEnd: 1,
          }}
        >
          <CardMembershipRounded fontSize="large" />
          {title}
        </CardHeader>

        <TransitionGroup
          component={Box}
          display="flex"
          flexDirection="column"
          gap={{ xs: 3, sm: 2 }}
        >
          {limitedData.map((cert, index) => (
            <Collapse key={index}>
              <Box
                display={"flex"}
                alignItems={{ xs: "start", sm: "center" }}
                gap={{ xs: 1, sm: 2 }}
              >
                <Box
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
                </Box>
                <Box display={"flex"} flexDirection={"column"}>
                  <Link
                    href={cert.credentialUrl}
                    target={"_blank"}
                    fontWeight={"bold"}
                    mb={0.5}
                  >
                    {cert.title}
                  </Link>
                  <Typography fontSize={"small"}>
                    Issued by: {cert.issuedBy}
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
          data={sortedData}
          limit={limit}
          text={"Older"}
        />
      </CardContent>
    </Card>
  );
}

CertificatesCard.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  limit: PropTypes.number,
};
