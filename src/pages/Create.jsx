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
  Switch,
  Link,
  Tooltip,
  Snackbar,
  Alert,
  Modal,
} from "@mui/material";
import { Edit, DeleteForever, AddCircleOutlineRounded } from "@mui/icons-material";
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
  deleteUser,
} from "../utils/fetch";

import Themes from "../Themes";
import Footer from "../components/elements/Footer";

export default function CreatePage() {
  const hostUrl = import.meta.env.VITE_HOST_URL;

  const [userData, setUserData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaveSuccess, setIsSaveSuccess] = useState(null);
  const [message, setMessage] = useState();
  const [isResumeNameEdit, setIsResumeNameEdit] = useState([]);
  const [createResumeName, setCreateResumeName] = useState("");
  const [createResumeId, setCreateResumeId] = useState("");
  const [createResumeIdError, setCreateResumeIdError] = useState(false);
  const [newResumeModalOpen, setNewResumeModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const resumeRenameRefs = useRef([]);

  const onSuccess = async (cb) => {
    setIsSaveSuccess(null);
    const result = await cb();
    setMessage(result);
    await fetchData();
    setIsSaveSuccess(true);
    setIsSaving(false);
  }

  const onError = (error) => {
    setMessage(error);
    setIsSaveSuccess(null);
    setTimeout(() => {
      setIsSaveSuccess(false);
      setIsSaving(false);
    }, 100);
  }

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchUser();
      setUserData(data);
      setIsResumeNameEdit(new Array(data.resumes.length).fill(false));
      setIsLoaded(true);
      setIsSaving(false);
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
      window.location.href = "/#/login";
    }
  }, []);

  async function handleChangeUser(field, data, email) {
    setIsSaving(true);
    try {
      await onSuccess(() => updateUser(field, data, email));
    } catch (error) {
      onError(error);
    }
  }

  async function handleResetPassword(email) {
    setIsSaving(true);
    try {
      await onSuccess(() => sendResetPassword(email));
    } catch (error) {
      onError(error);
    }
  }

  async function handleVerifyEmail(email) {
    setIsSaving(true);
    try {
      await onSuccess(() => sendVerificationEmail(email));
    } catch (error) {
      onError(error);
    }
  }

  async function handleCreateResume() {
    setIsSaving(true);
    try {
      await onSuccess(() => createResume(createResumeName, createResumeId));
      setNewResumeModalOpen(false);
      setCreateResumeName("");
      setCreateResumeId("");
      setCreateResumeIdError(false);
    } catch (error) {
      onError(error);
      setCreateResumeIdError(true);
    }
  }

  async function handleUpdateResume(resumeId, data) {
    setIsSaving(true);
    try {
      await onSuccess(() => updateResume(resumeId, data));
    } catch (error) {
      onError(error);
    }
  }

  async function handleDeleteResume(resumeId) {
    setIsSaving(true);
    try {
      await onSuccess(() => deleteResume(resumeId));
    } catch (error) {
      onError(error);
    }
  }

  async function handleDeleteAccount(password) {
    setIsSaving(true);
    try {
      setIsSaveSuccess(null);
      await deleteUser(password);
      localStorage.removeItem("token");
      location.href = "/#/login";
    } catch (error) {
      onError(error);
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
          height={"100dvh"}
        >
          <CircularProgress />
        </Box>
      </Themes>
    );
  }

  return (
    <Themes>
      <Helmet>
        <title>{userData.name} - Create Resume</title>
      </Helmet>

      {/* alear box */}
      <Snackbar
        open={isSaveSuccess === true}
        autoHideDuration={5000}
        onClose={() => setIsSaveSuccess(null)}
      >
        <Alert
          severity="success"
          onClose={() => setIsSaveSuccess(null)}
        >{`${message}`}</Alert>
      </Snackbar>
      <Snackbar
        open={isSaveSuccess === false}
        onClose={() => setIsSaveSuccess(null)}
      >
        <Alert severity="error" onClose={() => setIsSaveSuccess(null)}>
          {message ? `${message}` : "Something went wrong!"}
        </Alert>
      </Snackbar>
      <Snackbar open={isSaving}>
        <Alert severity="info">Processing...</Alert>
      </Snackbar>

      {/* Create resume modal */}
      <Modal
        open={newResumeModalOpen}
        onClose={() => {
          setCreateResumeName("");
          setCreateResumeId("");
          setCreateResumeIdError(false);
          setNewResumeModalOpen(false);
        }}
        disableAutoFocus
        disableEnforceFocus
        aria-labelledby="create-resume-modal"
        aria-describedby="create-resume-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: 500,
            width: "calc(100% - 32px)",
            bgcolor: "background.paper",
            borderRadius: 4,
            boxShadow: 24,
            p: { xs: 2, sm: 3 },
          }}
        >
          <Typography id="create-resume-modal" variant="h6" component="h2">
            Create Resume
          </Typography>
          <TextField
            label="Resume name"
            variant="outlined"
            size="small"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isSaving}
            value={createResumeName}
            onChange={(e) => setCreateResumeName(e.target.value)}
          />
          <TextField
            label="Resume ID"
            helperText={
              <>
                <Typography variant="caption">
                  This will be displayed on the URL. Leave it blank to auto
                  generate a random ID.
                </Typography>
                <Typography
                  variant="caption"
                  fontWeight={"bold"}
                  sx={{ ml: 0.5, textDecoration: "underline" }}
                >
                  You can not change this later.
                </Typography>
              </>
            }
            variant="outlined"
            size="small"
            fullWidth
            sx={{ mt: 2 }}
            error={createResumeIdError}
            disabled={isSaving}
            value={createResumeId}
            onChange={(e) => {
              setCreateResumeId(e.target.value);
              setCreateResumeIdError(false);
            }}
            onKeyDown={(e) => {
              if (e.key === " ") e.preventDefault();
              if (e.key === "Enter") handleCreateResume();
            }}
          />
          <Button
            disabled={isSaving || createResumeName.length === 0}
            variant="contained"
            color="primary"
            sx={{ width: "100%", mt: 3 }}
            onClick={handleCreateResume}
          >
            Create
          </Button>
        </Box>
      </Modal>

      {/* Delete account modal */}
      <PasswordFormModalDeleteAccount
        isSaving={isSaving}
        onDelete={(password) => handleDeleteAccount(password)}
        open={passwordModalOpen}
        setIsOpen={setPasswordModalOpen}
      />

      <Container>
        <Box display={"flex"} flexDirection={"column"} gap={2} py={5}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"baseline"}
          >
            <Typography variant="h5" fontWeight="bold">
              Account
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
                  helperText={"This will be displayed on your resumes"}
                  value={userData.name}
                  inputRef={nameRef}
                  isSaving={isSaving}
                  onSave={(value) =>
                    handleChangeUser("name", value, userData.email)
                  }
                />

                <EditField
                  label="Email"
                  type="email"
                  helperText={
                    "You have to verify your email again if you change it."
                  }
                  value={userData.email}
                  inputRef={emailRef}
                  isSaving={isSaving}
                  onSave={(value) =>
                    handleChangeUser("email", value, userData.email)
                  }
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
                    disabled={isSaving}
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to reset your password? We will send you an email to reset your password."
                        )
                      ) {
                        handleResetPassword(userData.email);
                      }
                    }}
                  >
                    Reset
                  </Button>
                </Box>

                <Box
                  display={"flex"}
                  flexDirection={{ xs: "column", sm: "row" }}
                  alignItems={{ xs: "stretch", sm: "center" }}
                  gap={1}
                >
                  <Typography fontWeight={"bold"} width={100} py={1.2}>
                    Verified:
                  </Typography>
                  <Box display={"flex"} alignItems={"center"} gap={1}>
                    <Typography
                      marginInlineStart={{ xs: 2, sm: 0 }}
                      color={userData.verified ? "success" : "error"}
                    >
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
                </Box>
                {!userData.verified && (
                  <Typography variant="body2" sx={{ opacity: 0.5 }}>
                    You have to verify your email to create a resume or make
                    your resume visible.
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>

          <Typography variant="h5" fontWeight="bold">
            Resumes
          </Typography>
          <Divider />

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Button
                  disabled={isSaving || userData.verified === false}
                  variant="text"
                  color="success"
                  size="small"
                  startIcon={<AddCircleOutlineRounded />}
                  sx={{ px: 3, alignSelf: "center" }}
                  onClick={() => setNewResumeModalOpen(true)}
                >
                  {userData.verified === false
                    ? "Verify your email to create resume"
                    : "Create Resume"}
                </Button>
              </Box>

              <Box display={"flex"} flexDirection={"column"} gap={2} mt={2}>
                {userData.resumes.map((data, index) => (
                  <Box
                    key={index}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={2}
                  >
                    {index !== 0 && <Divider />}
                    <Box
                      display={"flex"}
                      flexWrap={"wrap"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      gap={2}
                    >
                      <Box
                        display={"flex"}
                        alignItems={"baseline"}
                        gap={1}
                        flexGrow={1}
                      >
                        {!isResumeNameEdit[index] && (
                          <Box display={"flex"} alignItems={"baseline"} gap={1}>
                            <Link
                              href={
                                isSaving
                                  ? null
                                  : `${hostUrl}/#/${data.resume_id}`
                              }
                              target="_blank"
                              fontWeight={"bold"}
                            >
                              {data.resume_name}
                            </Link>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {data.resume_id}
                            </Typography>
                          </Box>
                        )}

                        {isResumeNameEdit[index] && (
                          <Box
                            display={"flex"}
                            flexDirection={{ xs: "column", sm: "row" }}
                            alignItems={{ xs: "stretch", sm: "baseline" }}
                            gap={1}
                            flexGrow={1}
                          >
                            <TextField
                              inputRef={(el) =>
                                (resumeRenameRefs.current[index] = el)
                              }
                              defaultValue={data.resume_name}
                              size="small"
                              variant="outlined"
                              fullWidth
                              disabled={isSaving}
                            />
                            <Box display={"flex"}>
                              <Button
                                disabled={isSaving}
                                variant="text"
                                color="primary"
                                size="small"
                                onClick={() => {
                                  handleUpdateResume(data.resume_id, {
                                    resume_name:
                                      resumeRenameRefs.current[index].value,
                                  });
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
                                  setIsResumeNameEdit((prev) => {
                                    const newState = [...prev];
                                    newState[index] = !newState[index];
                                    return newState;
                                  });
                                }}
                              >
                                Cancel
                              </Button>
                            </Box>
                          </Box>
                        )}
                      </Box>
                      <Box display={"flex"} alignItems={"center"}>
                        {!isResumeNameEdit[index] && (
                          <Button
                            disabled={isSaving}
                            variant="text"
                            color="info"
                            size="small"
                            sx={{ px: 1 }}
                            onClick={() => {
                              setIsResumeNameEdit((prev) => {
                                const newState = [...prev];
                                newState[index] = !newState[index];
                                return newState;
                              });
                            }}
                          >
                            Rename
                          </Button>
                        )}

                        <Tooltip title="Public" placement="top">
                          <FormGroup sx={{ ml: 1 }}>
                            <Switch
                              disabled={isSaving}
                              size="small"
                              checked={data.active}
                              sx={{ mx: 1 }}
                              onChange={() =>
                                handleUpdateResume(data.resume_id, {
                                  active: !data.active,
                                })
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
                              if (
                                window.confirm(
                                  "Are you sure you want to delete this resume?"
                                )
                              ) {
                                handleDeleteResume(data.resume_id);
                              }
                            }}
                          >
                            <DeleteForever fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Footer />
        <Divider />

        <Box display={"flex"} justifyContent={"center"} my={3} gap={3}>
          <Button
            variant="text"
            color="inherit"
            size="small"
            sx={{ px: 3, opacity: 0.5, fontSize: 'small' }}
            onClick={() => {
              if (window.confirm("Are you sure you want to delete your account?")) {
                setPasswordModalOpen(true);
              }
            }}
          >
            Delete Account
          </Button>
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
  isSaving,
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
            disabled={isSaving}
          />
        )}

        <Box display={"flex"} flexShrink={0}>
          {isEdit && (
            <Button
              variant="text"
              size="small"
              color="primary"
              disabled={isSaving}
              onClick={async () => {
                await onSave(inputRef.current.value)
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
            disabled={isSaving}
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
  isSaving: PropTypes.bool,
};


const PasswordFormModalDeleteAccount = ({ isSaving, onDelete, open, setIsOpen }) => {
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  return (
    <Modal
      open={open}
      onClose={() => setIsOpen(false)}
      disableAutoFocus
      disableEnforceFocus
      aria-labelledby="delete-account-modal"
      aria-describedby="delete-account-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: 500,
          width: "calc(100% - 32px)",
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: 24,
          p: { xs: 2, sm: 3 },
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography id="delete-account-modal" variant="h6" component="h2">
          Delete Account
        </Typography>
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          size="small"
          fullWidth
          value={password}
          error={passwordValid === false}
          disabled={isSaving}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordValid(e.target.value.length > 0);
          }}
        />
        <Button
          disabled={isSaving || password.length === 0}
          variant="contained"
          color="error"
          onClick={() => onDelete(password)}
        >
          Delete Account
        </Button>
      </Box>
    </Modal>
  );
}

PasswordFormModalDeleteAccount.propTypes = {
  isSaving: PropTypes.bool,
  onDelete: PropTypes.func,
  open: PropTypes.bool,
  setIsOpen: PropTypes.func,
};