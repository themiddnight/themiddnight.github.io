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
} from "@mui/material";
import { SaveRounded } from "@mui/icons-material";
import PropTypes from "prop-types";

export function EditPageTemplateHeader({
  title = "Edit Page",
  dataTitle,
  dataSubtitle,
  dataActive,
  dataDisplayLimit,
  displayMode = false,
  dataDisplayMode,
  dataDisplayModeOptions,
  onChange = () => {},
  disableDisplayLimit = false,
  disableSubtitle = false,
  ...props
}) {

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
              onChange={(e) => onChange("display_mode", +e.target.value)}
            >
              {dataDisplayModeOptions.map((option) => (
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
        rowGap={2}
        px={{ xs: 2, sm: 5 }}
        py={2}
        {...props}
      >
        <Button variant="outlined" color="success" onClick={() => onClickAddData("top")}>
          Insert Data {dataLength > 0 && "Before"}
        </Button>

        {children}

        {dataLength > 0 && <Button variant="outlined" color="success" onClick={() => onClickAddData("bottom")}>
          Insert Data After
        </Button>}
        <Divider />
      </Box>
  )
}

export function EditPageTemplateFooter({
  dataActive = true,
  previewelement,
  isSaving = false,
  // onRefresh = () => {},
  onSave = () => {},
  ...props
}) {

  return (
    <Box display={"flex"} flexDirection={"column"} rowGap={2} px={2} pb={12} {...props}>
      {previewelement && <Box display={'flex'} alignItems={'baseline'} gap={1}>
        <Typography variant="h5">Preview</Typography>
        {/* <Button variant="text" onClick={onRefresh}>Refresh</Button> */}
      </Box>}
      
      <Box
        display="grid"
        px={{ xs: 0, sm: 3 }}
        sx={{ opacity: dataActive ? 1 : 0.5 }}
      >
        {previewelement}
      </Box>
      <Divider sx={{ my: 2 }} />

      <Button
        disabled={isSaving}
        variant="contained"
        color="primary"
        size="large"
        onClick={onSave}
        startIcon={isSaving ? <CircularProgress size={16} color="grey" /> : <SaveRounded />}
      >
        {isSaving ? "Saving..." : "Save"}
      </Button>

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
  dataDisplayModeOptions: PropTypes.array,
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
  onSave: PropTypes.func,
  // onRefresh: PropTypes.func,
  isSaving: PropTypes.bool,
  previewelement: PropTypes.node,
};