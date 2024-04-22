import {
  Box,
  Button,
  Divider,
  TextField,
  Container,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  Link,
  Snackbar,
  Alert,
  Typography,
  Fade,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";

import { sendResetPassword } from "../utils/fetch";

import Themes from "../Themes";
import Footer from "../components/elements/Footer";

export default function LoginPage() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const frontendApiKey = import.meta.env.VITE_API_KEY;

  const [isMatched, setIsMatched] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      setIsMatched(false);
      setMessage("Please fill in all fields");
      return;
    }

    try {
      setIsSaving(true);
      const response = await fetch(`${apiUrl}/auth/login?key=${frontendApiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        setIsMatched(null);
        setIsSaving(false);
        window.location.href = "/#/create";
      } else {
        setIsMatched(false);
        setMessage(data.message);
        setIsSaving(false);
      }
    } catch (error) {
      console.error(error);
      setMessage(error.message);
      setIsSaving(false);
    }
  }

  const handleResetPassword = async () => {
    const email = emailRef.current.value;
    if (!email) {
      setMessage("Please fill in your email");
      setIsMatched(false);
      return;
    }

    try {
      setIsSaving(true);
      await sendResetPassword(email);
      setIsSaving(false);
      setIsMatched(true);
      setMessage("We have sent you an email to reset your password. Please check your inbox.");
    } catch (error) {
      console.error(error);
      setMessage(error.message);
      setIsMatched(false);
      setIsSaving(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/#/create";
    }
  }, []);

  return (
    <Themes>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <Snackbar
        open={isMatched === false}
        autoHideDuration={5000}
        onClose={() => setIsMatched(null)}
      >
        <Alert severity="error">{message}</Alert>
      </Snackbar>

      <Snackbar
        open={isMatched === true}
        autoHideDuration={5000}
        onClose={() => setIsMatched(null)}
      >
        <Alert severity="success">{message}</Alert>
      </Snackbar>

      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        // height={"100dvh"}
        justifyContent={"center"}
      >
        <Container>
          <Fade in={true} timeout={500}>
          <Box>
          <Container maxWidth={"sm"}>
            <Card sx={{ mt: 10 }}>
              <CardHeader title="Create your resume" subheader="Login" />
              <CardContent>
                <Box display={"flex"} flexDirection={"column"} rowGap={2}>
                  <TextField
                    inputRef={emailRef}
                    label="Email"
                    type="email"
                    variant="outlined"
                    size="small"
                    fullWidth
                    disabled={isSaving}
                    error={isMatched === false}
                    onChange={() => setIsMatched(null)}
                  />
                  <TextField
                    inputRef={passwordRef}
                    label="Password"
                    type="password"
                    variant="outlined"
                    size="small"
                    fullWidth
                    disabled={isSaving}
                    helperText={
                      <Typography variant="caption">
                        Forgot password?{" "}
                        <Link 
                          color={isSaving ? "text.disabled" : "primary"}
                          onClick={isSaving ? null : handleResetPassword} 
                          sx={{ 
                            cursor: isSaving ? "not-allowed" : "pointer",
                          }}
                        >
                          Reset password
                        </Link>
                      </Typography>
                    }
                    error={isMatched === false}
                    onChange={() => setIsMatched(null)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleLogin();
                      }
                    }}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isSaving}
                    startIcon={
                      isSaving && <CircularProgress size={16} color="grey" />
                    }
                    sx={{ px: 5, my: 1, alignSelf: "center" }}
                    onClick={handleLogin}
                  >
                    {isSaving ? "Loading" : "Login"}
                  </Button>

                  <Divider />
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={1}
                  >
                    <Typography>Don&apos;t have an account?</Typography>
                    <Link textAlign={"center"} href="/#/register">
                      Register
                    </Link>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            </Container>
            <Footer />
          </Box>
          </Fade>
        </Container>
      </Box>
    </Themes>
  );
}