import { Card, CardContent, Typography, Box, Link } from "@mui/material";
import { CardMembershipRounded } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useContext } from "react";
import { Image } from "./styled/Image";
import { ModalContext } from "../App";
import CardHeader from "./elements/CardHeader";

export default function CertificatesCard({ data }) {
  const { setIsImageModalOpen, setImageModalSrc } = useContext(ModalContext);

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
          Certifications
        </CardHeader>

        <Box display={"flex"} flexDirection={"column"} gap={{ xs: 3, sm: 2 }}>
          {data.map((cert, index) => (
            <Box
              key={index}
              display={"flex"}
              alignItems={{ xs: "start", sm: "center" }}
              gap={{ xs: 1, sm: 2 }}
            >
              <Box
                height={90}
                width={90}
                flexBasis={{ xs: 90, sm: 90 }}
                flexShrink={0}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                borderRadius={"5px"}
                overflow={"hidden"}
                sx={{ transition: "transform 0.3s", "&:hover": { transform: "scale(1.1)" }}}
              >
                <Image
                  src={`images/certificates/${cert.credentialImage}`}
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
                  {cert.issuedDate}
                </Typography>
                <Typography fontSize={"small"}>
                  ID: {cert.credentialId}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

CertificatesCard.propTypes = {
  data: PropTypes.array.isRequired,
};
