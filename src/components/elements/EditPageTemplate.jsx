import {
  Box,
  Button,
  Divider,
  FormGroup,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
  CircularProgress,
  Fab,
} from "@mui/material";
import { SaveRounded } from "@mui/icons-material";
import PropTypes from "prop-types";

export function EditPageTemplateHeader({
  title = "Edit Page",
  dataTitle,
  dataSubtitle,
  dataActive,
  dataDisplayLimit,
  dataDisplayMode,
  onChange = () => {},
  disableDisplayLimit = false,
  disableSubtitle = false,
  displayMode = false,
  ...props
}) {
  const displayModeOptions = [
    { label: "List", value: 0 },
    { label: "Grid", value: 1 },
  ];

  return (
    <Box display={"flex"} flexDirection={"column"} rowGap={2} px={2} pt={4} {...props}>
      <Typography variant="h5" fontWeight={"bold"} flexShrink={0}>
        {title}
      </Typography>
      <Divider />

      <Box
        display={"flex"}
        flexDirection={"column"}
        rowGap={3}
        px={{ xs: 0, sm: 3 }}
        py={2}
      >
        <Box
          display={"flex"}
          flexDirection={{ xs: "column", md: "row" }}
          rowGap={3}
          columnGap={2}
        >
          <FormGroup sx={{ flexShrink: 0 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={dataActive}
                  onChange={(e) => onChange("active", e.target.checked)}
                />
              }
              label="Active"
            />
          </FormGroup>

          <TextField
            label="Title"
            size="small"
            error={dataTitle === ""}
            value={dataTitle}
            sx={{ flexGrow: 2 }}
            onChange={(e) => onChange("title", e.target.value)}
          />
          
          {(displayMode || !disableDisplayLimit) && 
          <Box display={"flex"} alignItems={"center"} gap={2} flexGrow={1}>
            {!disableDisplayLimit && <TextField
              label="Display Limit"
              size="small"
              type="number"
              fullWidth
              error={dataDisplayLimit < 1}
              value={dataDisplayLimit}
              onChange={(e) => onChange("display_limit", +e.target.value)}
            />}

            {displayMode && <TextField
              label="Display Mode"
              size="small"
              select
              fullWidth
              value={dataDisplayMode}
              SelectProps={{ native: true }}
              sx={{ borderRadius: 2.5 }}
              onChange={(e) => onChange("display_mode", e.target.value)}
            >
              {displayModeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>}
          </Box>}

        </Box>

        {!disableSubtitle && <TextField
          label="Subtitle"
          size="small"
          fullWidth
          multiline
          maxRows={2}
          value={dataSubtitle}
          onChange={(e) => onChange("subtitle", e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
        />}
      </Box>
      <Divider />
    </Box>
  )
}

export function EditPageTemplateBody({
  dataLength = 0,
  children,
  onClickAddData = () => {},
  ...props
}) {
  return (
      <Box
        display={"flex"}
        flexDirection={"column"}
        rowGap={3}
        px={{ xs: 2, sm: 5 }}
        py={2}
        {...props}
      >
        <Button variant="outlined" color="success" onClick={() => onClickAddData("top")}>
          Add Data {dataLength > 0 && "Before"}
        </Button>

        {children}

        {dataLength > 0 && <Button variant="outlined" color="success" onClick={() => onClickAddData("bottom")}>
          Add Data After
        </Button>}
        <Divider />
      </Box>
  )
}

export function EditPageTemplateFooter({
  dataActive = true,
  isSaving,
  onSubmit,
  previewelement,
  ...props
}) {
  const btnPosition = { xs: 24, sm: 36, md: 48 };

  return (
    <Box display={"flex"} flexDirection={"column"} rowGap={2} px={2} pb={12} {...props}>
      {previewelement && <Typography variant="h5">Preview</Typography>}
      
      <Box
        display="grid"
        px={{ xs: 0, sm: 3 }}
        sx={{ opacity: dataActive ? 1 : 0.5 }}
      >
        {previewelement}
      </Box>

      <Fab
        disabled={isSaving}
        onClick={onSubmit}
        color="primary"
        sx={{ 
          position: "fixed", 
          bottom: btnPosition, 
          right: btnPosition,
          boxShadow: 4,
        }}
      >
        {isSaving 
          ? <CircularProgress thickness={6} size={32} sx={{ color: "white" }} /> 
          : <SaveRounded sx={{ width: 36, height: 32, color: theme => theme.palette.mode === "dark" ? "black" : "white" }} />
        }
      </Fab>
    </Box>
  )
}


EditPageTemplateHeader.propTypes = {
  title: PropTypes.string,
  dataTitle: PropTypes.string,
  dataSubtitle: PropTypes.string,
  dataActive: PropTypes.bool,
  dataDisplayLimit: PropTypes.number,
  dataDisplayMode: PropTypes.number,
  onChange: PropTypes.func,
  disableDisplayLimit: PropTypes.bool,
  disableSubtitle: PropTypes.bool,
  displayMode: PropTypes.bool,
};

EditPageTemplateBody.propTypes = {
  children: PropTypes.node,
  dataLength: PropTypes.number,
  onClickAddData: PropTypes.func,
};

EditPageTemplateFooter.propTypes = {
  dataActive: PropTypes.bool,
  isSaving: PropTypes.bool,
  onSubmit: PropTypes.func,
  previewelement: PropTypes.node,
};