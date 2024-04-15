import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Container,
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import Themes from "../Themes";

export default function ResetPasswordPage() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [message, setMessage] = useState("");

  const email = searchParams.get("email");

  async function handleResetPassword(password) {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${apiUrl}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setIsSuccess(true);
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.href = "/#/login";
        }, 1000);
      } else {
        setIsSuccess(false);
      }
      setMessage(data.message);
      setIsSubmitting(false);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
      setIsSuccess(false);
      setIsSubmitting(false);
    }
  }

  return (
    <Themes>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"} height={"100vh"} justifyContent={"center"}>
        <Container maxWidth={'sm'}>
          <Card>
            <CardHeader title="Reset Password" subheader={`For ${email}`} />
            <CardContent>
              <Box display={"flex"} flexDirection={"column"} rowGap={2}>
                <TextField
                  fullWidth
                  label="New password"
                  type="password"
                  size="small"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  size="small"
                  value={confirmPassword}
                  error={password !== confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => handleResetPassword(password)}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <CircularProgress size={24} /> : "Reset Password"}
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Snackbar
            open={isSuccess === false}
            autoHideDuration={5000}
            onClose={() => setIsSuccess(null)}
          >
            <Alert severity="error">{message}</Alert>
          </Snackbar>
          <Snackbar
            open={isSuccess}
            autoHideDuration={5000}
            onClose={() => setIsSuccess(null)}
          >
            <Alert severity="success">{message}</Alert>
          </Snackbar>

        </Container>
      </Box>
    </Themes>
  );

}
