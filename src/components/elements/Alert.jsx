import { Alert } from "@mui/material";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const AlertWrapper = styled.div`
  animation: slideAnimation 3s forwards;
  
  @keyframes slideAnimation {
    0%, 100% {
      transform: translateY(-150%);
    }
    5%, 95% {
      transform: translateY(0);
    }
  }
`;

export function SuccessAlert({ message }) {
  return (
    <AlertWrapper>
      <Alert severity="success" sx={{ boxShadow: 5 }}>{message}</Alert>
    </AlertWrapper>
  );
}


export function ErrorAlert({ message }) {
  return (
    <AlertWrapper>
      <Alert severity="error" sx={{ boxShadow: 5 }}>{message}</Alert>
    </AlertWrapper>
  );
}


export function InfoAlert({ message }) {
  return (
    <AlertWrapper>
      <Alert severity="info" sx={{ boxShadow: 5 }}>{message}</Alert>
    </AlertWrapper>
  );
}


export function WarningAlert({ message }) {
  return (
    <AlertWrapper>
      <Alert severity="warning" sx={{ boxShadow: 5 }}>{message}</Alert>
    </AlertWrapper>
  );
}

SuccessAlert.propTypes = {
  message: PropTypes.string.isRequired,
};

ErrorAlert.propTypes = {
  message: PropTypes.string.isRequired,
};

InfoAlert.propTypes = {
  message: PropTypes.string.isRequired,
};

WarningAlert.propTypes = {
  message: PropTypes.string.isRequired,
};