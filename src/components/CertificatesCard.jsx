import { Card, CardContent, Typography, Box, Link } from "@mui/material";
import { certificatesData } from "../../data/data";
import { PropTypes } from "prop-types";

export default function CertificatesCard({ setOpen, setImageModalSrc }) {
  function handleOpenModal(e) {
    e.preventDefault();
    setImageModalSrc(e.target.src);
    setOpen(true);
    console.log(e.target.src);
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Certificates
        </Typography>
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          {certificatesData.map((cert) => (
            <Box
              key={cert.title}
              display={"flex"}
              alignItems={"center"}
              gap={2}
            >
              <Box
                width={120}
                height={90}
                flexBasis={120}
                flexShrink={0}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                overflow={"hidden"}
              >
                <img
                  src={`images/certificates/${cert.credentialImage}`}
                  alt={cert.title}
                  width={"100%"}
                  height={"100%"}
                  style={{ cursor: "pointer" }}
                  onClick={handleOpenModal}
                />
              </Box>
              <Box display={"flex"} flexDirection={"column"}>
                <Link
                  href={cert.credentialUrl}
                  target={"_blank"}
                  fontWeight={"bold"}
                >
                  {cert.title}
                </Link>
                <Typography fontSize={"small"}>
                  Issued by {cert.issuedBy}
                </Typography>
                <Typography fontSize={"small"}>{cert.issuedDate}</Typography>
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
  setImageModalSrc: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
};