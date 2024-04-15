import {
  Typography,
  Box,
  Button,
  Divider,
  TextField,
  Container,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
  FormGroup,
  FormControlLabel,
  Switch,
  Link,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import { Edit, DeleteForever } from "@mui/icons-material";
import { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

import {
  fetchUser,
  updateUser,
  sendResetPassword,
  createResume,
  updateResume,
  deleteResume,
  sendVerificationEmail,
} from "../utils/fetch";

import Themes from "../Themes";

export default function CreatePage() {
  const hostUrl = import.meta.env.VITE_HOST_URL;

  const [userData, setUserData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaveSuccess, setIsSaveSuccess] = useState(null);
  const [message, setMessage] = useState();
  const [isResumeNameEdit, setIsResumeNameEdit] = useState([]);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const resumeNameRefs = useRef([]);

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchUser();
      setUserData(data);
      setIsResumeNameEdit(new Array(data.resumes.length).fill(false));
      setIsLoaded(true);
      setIsSaving(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  async function handleChangeUser(field, data, email) {
    setIsSaving(true);
    try {
      const result = await updateUser(field, data, email);
      setMessage(result);
      setIsSaveSuccess(null);
      setTimeout(() => {
        setIsSaveSuccess(true);
        fetchData();
        setIsSaving(false);
      }, 100);
    } catch (error) {
      setMessage(error);
      setIsSaveSuccess(null);
      setTimeout(() => {
        setIsSaveSuccess(false);
        setIsSaving(false);
      }, 100);
    }
  }

  async function handleResetPassword(email) {
    setIsSaving(true);
    try {
      const result = await sendResetPassword(email);
      setMessage(result);
      setIsSaveSuccess(null);
      setTimeout(() => {
        setIsSaveSuccess(true);
        fetchData();
        setIsSaving(false);
      }, 100);
    } catch (error) {
      setMessage(error);
      setIsSaveSuccess(null);
      setTimeout(() => {
        setIsSaveSuccess(false);
        setIsSaving(false);
      }, 100);
    }
  }

  async function handleVerifyEmail(email) {
    setIsSaving(true);
    try {
      const result = await sendVerificationEmail(email);
      setMessage(result);
      setIsSaveSuccess(null);
      setTimeout(() => {
        setIsSaveSuccess(true);
        fetchData();
        setIsSaving(false);
      }, 100);
    } catch (error) {
      setMessage(error);
      setIsSaveSuccess(null);
      setTimeout(() => {
        setIsSaveSuccess(false);
        setIsSaving(false);
      }, 100);
    }
  }

  async function handleCreateResume() {
    setIsSaving(true);
    try {
      const result = await createResume();
      setMessage(result);
      setIsSaveSuccess(null);
      setTimeout(() => {
        setIsSaveSuccess(true);
        fetchData();
        setIsSaving(false);
      }, 100);
    } catch (error) {
      setMessage(error);
      setIsSaveSuccess(null);
      setTimeout(() => {
        setIsSaveSuccess(false);
        setIsSaving(false);
      }, 100);
    }
  }

  async function handleUpdateResume(resumeId, data) {
    setIsSaving(true);
    try {
      const result = await updateResume(resumeId, data);
      setMessage(result);
      setIsSaveSuccess(null);
      setTimeout(() => {
        setIsSaveSuccess(true);
        fetchData();
        setIsSaving(false);
      }, 100);
    } catch (error) {
      setMessage(error);
      setIsSaveSuccess(null);
      setTimeout(() => {
        setIsSaveSuccess(false);
        setIsSaving(false);
      }, 100);
    }
  }

  async function handleDeleteResume(resumeId) {
    setIsSaving(true);
    try {
      const result = await deleteResume(resumeId);
      setMessage(result);
      setIsSaveSuccess(null);
      setTimeout(() => {
        setIsSaveSuccess(true);
        fetchData();
        setIsSaving(false);
      }, 100);
    } catch (error) {
      setMessage(error);
      setIsSaveSuccess(null);
      setTimeout(() => {
        setIsSaveSuccess(false);
        setIsSaving(false);
      }, 100);
    }
  }

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!isLoaded) {
    return (
      <Themes>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"100vh"}
        >
          <CircularProgress />
        </Box>
      </Themes>
    );
  }

  return (
    <Themes>
      <Helmet>
        <title>Create Resume</title>
      </Helmet>

      <Container>
        {/* alear box */}
        <Snackbar open={isSaveSuccess === true} autoHideDuration={5000} onClose={() => setIsSaveSuccess(null)}>
          <Alert severity="success" onClose={() => setIsSaveSuccess(null)}>{`${message}`}</Alert>
        </Snackbar>
        <Snackbar open={isSaveSuccess === false} onClose={() => setIsSaveSuccess(null)}>
          <Alert severity="error" onClose={() => setIsSaveSuccess(null)}>{message ? `${message}` : "Something went wrong!"}</Alert>
        </Snackbar>

        <Box display={"flex"} flexDirection={"column"} gap={2} py={5}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h5" fontWeight="bold">
              Account Information
            </Typography>

            <Button 
              variant="text" 
              color="error" 
              size="small"
              onClick={() => {
                if (window.confirm("Are you sure you want to logout?")) {
                  localStorage.removeItem("token");
                  window.location.href = "/#/login";
                }
              }}
            >
              Logout
            </Button>
          </Box>
          <Divider />

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box display={"flex"} flexDirection={"column"} gap={1.5}>
                <EditField
                  label="Your name"
                  type="text"
                  value={userData.name}
                  inputRef={nameRef}
                  onSave={(value) => handleChangeUser("name", value, userData.email)}
                />

                <EditField
                  label="Email"
                  type="email"
                  helperText={
                    "You have to verify your email again if you change it."
                  }
                  value={userData.email}
                  inputRef={emailRef}
                  onSave={(value) => handleChangeUser("email", value, userData.email)}
                />

                <Box
                  display={"flex"}
                  flexDirection={{ xs: "column", sm: "row" }}
                  alignItems={"baseline"}
                  columnGap={1}
                >
                  <Typography fontWeight={"bold"} width={85} py={1.2}>
                    Password:
                  </Typography>
                  <Button 
                    variant="text" 
                    size="small" 
                    color="primary"
                    disabled={isSaving}
                    onClick={() => handleResetPassword(userData.email)}
                  >
                    Reset
                  </Button>
                </Box>

                <Box
                  display={"flex"}
                  flexDirection={{ xs: "column", sm: "row" }}
                  alignItems={{ xs: "stretch", sm: "baseline" }}
                  gap={1}
                >
                  <Typography fontWeight={"bold"} width={100} py={1.2}>
                    Verified:
                  </Typography>
                  <Typography marginInlineStart={{ xs: 2, sm: 0 }} color={userData.verified ? "success" : "error"}>
                    {userData.verified ? "Yes" : "No"}
                  </Typography>
                  {userData.verified === false && (
                    <Button 
                      variant="text" 
                      size="small"
                      disabled={isSaving}
                      onClick={() => handleVerifyEmail(userData.email)}
                    >
                      Send verification email
                    </Button>
                  )}
                </Box>
                {!userData.verified && 
                <Typography variant="body2" sx={{ opacity: 0.5 }}>
                  You have to verify your email to create a resume or make your resume visible.
                </Typography>}
              </Box>
            </CardContent>
          </Card>

          <Typography variant="h5" fontWeight="bold">
            Resumes
          </Typography>
          <Divider />
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box display={"flex"} flexDirection={"column"} gap={2}>

                {userData.resumes.map((data, index) => (
                  <Box
                    key={index}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={2}
                  >
                    <Box display={"flex"} flexWrap={'wrap'} justifyContent={'space-between'} alignItems={"center"} gap={2}>
                      <Box display={"flex"} alignItems={'baseline'} gap={1} flexGrow={1}>
                        {!isResumeNameEdit[index] &&
                        <Box display={'flex'} alignItems={'baseline'} gap={1}>
                          <Link
                            href={isSaving ? null : `${hostUrl}/#/${data.resume_id}`}
                            target="_blank" 
                            fontWeight={"bold"} 
                          >
                            {data.resume_name}
                          </Link>
                          <Button 
                            disabled={isSaving}
                            variant="text" 
                            color="info" 
                            size="small"
                            onClick={() => {
                              setIsResumeNameEdit(prev => {
                                const newState = [...prev];
                                newState[index] = !newState[index];
                                return newState;
                              });
                            }}
                          >
                            Rename
                          </Button>
                        </Box>}

                        {isResumeNameEdit[index] &&
                        <Box 
                          display={'flex'} 
                          flexDirection={{ xs: 'column', sm: 'row' }} 
                          alignItems={{ xs: "stretch", sm: "baseline" }}
                          gap={1} 
                          flexGrow={1}
                        >
                          <TextField
                            inputRef={el => resumeNameRefs.current[index] = el}
                            defaultValue={data.resume_name}
                            size="small"
                            variant="outlined"
                            fullWidth
                          />
                          <Box display={'flex'}>
                            <Button
                              disabled={isSaving}
                              variant="text"
                              color="primary"
                              size="small"
                              onClick={() => {
                                handleUpdateResume(
                                  data.resume_id, 
                                  { resume_name: resumeNameRefs.current[index].value }
                                );
                              }}
                            >
                              Save
                            </Button>
                            <Button
                              disabled={isSaving}
                              variant="text"
                              color="error"
                              size="small"
                              onClick={() => {
                                setIsResumeNameEdit(prev => {
                                  const newState = [...prev];
                                  newState[index] = !newState[index];
                                  return newState;
                                });
                              }}
                            >
                              Cancel
                            </Button>
                          </Box>
                        </Box>}
                      </Box>
                      <Box 
                        display={"flex"} 
                        alignItems={'center'} 
                      >

                        <Tooltip title="Public" placement="top">
                          <FormGroup sx={{ ml: 1 }}>
                            <FormControlLabel
                              control={
                                <Switch
                                  disabled={isSaving}
                                  size="small"
                                  checked={data.active}
                                  onChange={() => handleUpdateResume(data.resume_id, { active: !data.active })}
                                />
                              }
                            />
                          </FormGroup>
                        </Tooltip>

                        <Tooltip title="Edit" placement="top">
                          <IconButton 
                            disabled={isSaving}
                            color="secondary"
                            LinkComponent={Link} 
                            href={`${hostUrl}/#/create/${data.resume_id}`}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete" placement="top">
                          <IconButton
                            disabled={isSaving}
                            color="error"
                            onClick={() => {
                              if (window.confirm("Are you sure you want to delete this resume?")) {
                                handleDeleteResume(data.resume_id);
                              }
                            }}
                          >
                            <DeleteForever fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                    <Divider />
                  </Box>
                ))}

                <Button
                  disabled={isSaving || userData.verified === false}
                  variant="text"
                  color="success"
                  size="small"
                  sx={{ px: 3, alignSelf: "center" }}
                  onClick={handleCreateResume}
                >
                  {userData.verified === false ? "Verify your email to create resume" : "Create Resume"}
                </Button>
              </Box>
            </CardContent>
          </Card>
          <Divider />

          <Box display={"flex"} justifyContent={"space-between"} mt={3} gap={3}>
            <Button variant="text" color="inherit" size="small" sx={{ px: 3 }}>
              Delete Account
            </Button>
          </Box>
        </Box>
      </Container>
    </Themes>
  );
}

const EditField = ({
  label,
  value,
  type = "text",
  helperText,
  inputRef,
  onSave,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <Box
      display={"flex"}
      flexDirection={{ xs: "column", sm: "row" }}
      alignItems={{ xs: "stretch", sm: "baseline" }}
      gap={1}
    >
      <Typography fontWeight={"bold"} width={100} py={{ xs: 0, sm: 1.2 }}>
        {label}:
      </Typography>

      {!isEdit && <Typography>{value}</Typography>}

      <Box
        display={"flex"}
        flexDirection={{ xs: "column", sm: "row" }}
        alignItems={"baseline"}
        flexGrow={1}
        gap={1}
      >
        {isEdit && (
          <TextField
            inputRef={inputRef}
            type={type}
            helperText={helperText}
            size="small"
            variant="outlined"
            fullWidth
            defaultValue={value}
          />
        )}

        <Box display={"flex"} flexShrink={0}>
          {isEdit && (
            <Button
              variant="text"
              size="small"
              color="primary"
              onClick={() => {
                onSave(inputRef.current.value)
                setIsEdit(!isEdit)
              }}
            >
              Save
            </Button>
          )}
          <Button
            variant="text"
            size="small"
            color={isEdit ? "error" : "primary"}
            onClick={() => setIsEdit(!isEdit)}
          >
            {isEdit ? "Cancel" : "Edit"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

EditField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  helperText: PropTypes.string,
  type: PropTypes.string,
  inputRef: PropTypes.object,
  onSave: PropTypes.func,
};
