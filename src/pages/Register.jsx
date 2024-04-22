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
  Fade,
} from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet";

import Themes from "../Themes";
import Footer from "../components/elements/Footer";

export default function RegistarPage() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const frontendApiKey = import.meta.env.VITE_API_KEY;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regex test, email format
  const passwordRegex = /.{8,}/; // regex test, at least 8 any characters

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullnameValid, setFullnameValid] = useState(null);
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(null);
  const [isFormValid, setIsFormValid] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (name.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0) {
      if (name.length === 0) setFullnameValid(false);
      if (email.length === 0) setEmailValid(false);
      if (password.length === 0) setPasswordValid(false);
      if (confirmPassword.length === 0) setConfirmPasswordValid(false);
      setIsFormValid(false);
      return;
    }

    try {
      setIsSaving(true);
      const response = await fetch(`${apiUrl}/auth/register?key=${frontendApiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (response.status === 409) {
        setIsSuccess(false);
        setMessage("Email already exists");
        setEmailValid(false);
        setIsSaving(false);
        return;
      }
      else if (response.ok) {
        setIsSuccess(true);
        setMessage("We have sent you an email to verify your account. Please check your inbox.");
        setIsSaving(false);
        setPassword("");
        setConfirmPassword("");
      } else {
        setIsSaving(false);
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to register");
      setIsSaving(false);
    }
  }

  return (
    <Themes>
      <Helmet>
        <title>Register</title>
      </Helmet>

      <Snackbar
        open={isFormValid === false}
        autoHideDuration={5000}
        onClose={() => setIsFormValid(null)}
      >
        <Alert severity="error">Please fill all fields</Alert>
      </Snackbar>

      <Snackbar
        open={isSuccess}
        autoHideDuration={5000}
        onClose={() => setIsSuccess(null)}
      >
        <Alert severity="success">{message}</Alert>
      </Snackbar>

      <Snackbar
        open={isSuccess === false}
        autoHideDuration={5000}
        onClose={() => setIsSuccess(null)}
      >
        <Alert severity="error">{message}</Alert>
      </Snackbar>

      <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
        <Container maxWidth={'lg'}>
          <Fade in={true} timeout={500}>
          <Box>
          <Container maxWidth='sm'>
          <Card sx={{ mt: 10 }}>
            <CardHeader title="Register" />
            <CardContent>
              <Box display={"flex"} flexDirection={"column"} rowGap={2}>
                <TextField
                  label="Fullname"
                  helperText="This will be displayed on your resumes"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={name}
                  error={fullnameValid === false}
                  disabled={isSaving}
                  onChange={(e) => {
                    setName(e.target.value);
                    setFullnameValid(e.target.value.length > 0);
                  }}
                />
                <TextField
                  label="Email"
                  helperText="We will send you an email to confirm your email address"
                  type="email"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={email}
                  error={emailValid === false}
                  disabled={isSaving}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailValid(emailRegex.test(e.target.value));
                  }}
                />
                <TextField
                  label={passwordRegex.test(password) ? "Password" : "Password (at least 8 characters)"}
                  type="password"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={password}
                  error={passwordValid === false}
                  disabled={isSaving}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordValid(passwordRegex.test(e.target.value));
                  }}
                />
                <TextField
                  label={password === confirmPassword ? "Confirm Password" : "Password does not match"}
                  type="password"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={confirmPassword}
                  error={confirmPasswordValid === false}
                  disabled={isSaving}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmPasswordValid(password === e.target.value);
                  }}
                />
                
                <Button 
                  variant="contained" 
                  color="primary" 
                  disabled={isSaving}
                  startIcon={isSaving && <CircularProgress size={16} color="grey" />}
                  sx={{ px: 5, my: 1, alignSelf: 'center' }}
                  onClick={handleSubmit}
                >
                  {isSaving ? "Processing..." : "Register"}
                </Button>

                <Divider />
                <Box display={"flex"} alignItems={'center'} justifyContent={'center'} gap={1}>
                  <Link textAlign={'center'} href="/#/login">Back to Login</Link>
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