import {
  Link,
  Box,
  Divider,
  Typography,
  CircularProgress,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import {
  ArrowBackIos,
  Circle,
  CircleOutlined,
  OpenInNew,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import { fetchSummaryData } from "../../utils/fetch";

export default function EditSidebar({
  resumeId,
  isSidebarHidden,
  updateActiveData,
  pageList,
  currentPage,
  onClick,
}) {
  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const listIconMinWidth = 25;

  const SidebarBox = ({ children }) => {
    return (
      <Box
        sx={{
          display: { xs: isSidebarHidden ? "none" : "flex", md: "flex" },
          flexDirection: "column",
          gap: 2,
          flexShrink: 0,
          width: 250,
          height: "100dvh",
          position: { xs: "fixed", md: "sticky" },
          top: 0,
          left: 0,
          zIndex: 997,
          p: { xs: 2, sm: 3 },
          bgcolor: "background.paper",
          overflowY: "auto",
          boxShadow: 5,
        }}
      >
        {children}
      </Box>
    );
  };
  SidebarBox.propTypes = {
    children: PropTypes.node,
  };

  const ActiveCircle = ({ isActive = true, color = "primary" }) => {
    return isActive 
    ? <Circle color={ color } sx={{ width: 15 }} /> 
    : <CircleOutlined color="disabled" sx={{ width: 15 }} />
  };
  ActiveCircle.propTypes = {
    isActive: PropTypes.bool,
    color: PropTypes.string,
  };

  useEffect(() => {
    setIsLoaded(false);
    fetchSummaryData(resumeId).then((data) => {
      setData(data);
      setIsLoaded(true);
    });
  }, [resumeId]);

  useEffect(() => {
    const newDataActive = { ...data.data_active, ...updateActiveData };
    setData(prev => ({ ...prev, data_active: newDataActive }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateActiveData]);

  if (!isLoaded) {
    return (
      <SidebarBox>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"100vh"}
        >
          <CircularProgress />
        </Box>
      </SidebarBox>
    );
  }

  return (
    <SidebarBox>
      <Box>
        <Typography variant="h5" fontWeight={"bold"} gutterBottom>
          Edit
        </Typography>
        <Typography fontWeight={"bold"}>{data.owner}&apos;s</Typography>
        <Typography gutterBottom>{data.resume_name}</Typography>
        <Typography fontSize={"small"}>ID: {resumeId}</Typography>
      </Box>
      <Divider />
      <Link href="/#/edit" display={"flex"} alignItems={"center"}>
        <ArrowBackIos fontSize="small" />
        Back to main
      </Link>

      <List sx={{ p: 0, m: 0 }}>
        {pageList.map((page, index) => (
          <Box key={index}>
            {page.name === 'settings' && <Divider sx={{ my: 1 }} />}
            <ListItemButton
              selected={currentPage.name === pageList[index].name}
              onClick={() => onClick(index)}
            >
              {page.name !== 'settings' && <ListItemIcon sx={{ minWidth: listIconMinWidth }}>
                <ActiveCircle isActive={data.data_active[page.name]} />
              </ListItemIcon>}
              <ListItemText primary={page.title} />
            </ListItemButton>
            {page.name === 'settings' && <Divider sx={{ my: 1 }} />}
          </Box>
        ))}
      </List>

      <Divider />
      
      <Link
        href={`/#/${resumeId}`}
        target="_blank"
        display={"flex"}
        alignItems={"center"}
        gap={1}
      >
        <OpenInNew fontSize="small" />
        View Resume
      </Link>
    </SidebarBox>
  );
}

EditSidebar.propTypes = {
  resumeId: PropTypes.string.isRequired,
  isSidebarHidden: PropTypes.bool,
  setIsSidebarHidden: PropTypes.func,
  updateActiveData: PropTypes.object,
  onClick: PropTypes.func,
  pageList: PropTypes.array,
  currentPage: PropTypes.object,
};
