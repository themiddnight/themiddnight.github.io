import { Box, Typography, Link, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Themes from "../Themes";

export default function VerifyEmailPage() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const frontendApiKey = import.meta.env.VITE_API_KEY;
  const { token } = useParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    async function verifyEmail() {
      try {
        const response = await fetch(`${apiUrl}/auth/verify-email?key=${frontendApiKey}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        if (response.ok) {
          setIsVerifying(false);
          setIsVerified(true);
        } else {
          setIsVerifying(false);
          setIsVerified(false);
        }
      } catch (error) {
        setIsVerifying(false);
        console.error(error);
      }
    }

    verifyEmail();
  }, [apiUrl, frontendApiKey, token]);
  
  return (
    <Themes>
      <Helmet>
        <title>Verify Email</title>
      </Helmet>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100dvh",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Verify Email
        </Typography>
        {isVerifying && <Box display="flex" alignItems="center" gap={2}>
          <Typography>Verifying...</Typography>
          <CircularProgress size={20} />
        </Box>}
        {isVerified && <Typography>
          Email verified! <Link href="/#/login">click to continue.</Link> 
        </Typography>}
        {!isVerifying && !isVerified && <Typography>
          Failed to verify email. <Link href="/#/login">Login to send a new verification email again.</Link> 
        </Typography>}
      </Box>
    </Themes>
  );
}