import { Card, CardContent, Typography, Box, Link } from "@mui/material";
import { certificatesData } from "../../data/data";
import { useContext } from "react";
import { ModalContext } from "../Home";
import CardHeader from "./elements/CardHeader";

export default function CertificatesCard() {
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
          Certificates
        </CardHeader>
        <Box display={"flex"} flexDirection={"column"} gap={{ xs: 3, sm: 2 }}>
          {certificatesData.map((cert, index) => (
            <Box
              key={index}
              display={"flex"}
              flexDirection={{ xs: "column", sm: "row" }}
              alignItems={{ xs: 'start', sm: 'center'}}
              gap={{ xs: 1, sm: 2 }}
            >
              <Box
                height={110}
                width={150}
                flexBasis={{ xs: 110, sm: 150 }}
                flexShrink={0}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                borderRadius={'5px'}
                overflow={"hidden"}
              >
                <img
                  src={`images/certificates/${cert.credentialImage}`}
                  alt={cert.title}
                  width={"100%"}
                  height={"100%"}
                  style={{ cursor: "pointer", objectFit: "cover" }}
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
                  Issued by: {cert.issuedBy}
                </Typography>
                <Typography fontSize={"small"} fontWeight='light'>{cert.issuedDate}</Typography>
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