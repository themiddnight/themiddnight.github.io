import { Box, IconButton, TextField, Autocomplete } from "@mui/material";
import { Cancel, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import PropTypes from "prop-types";

export default function EditLink({
  title,
  url,
  onChange,
  onMove,
  onDelete,
  autocomplete = false,
  autocompleteOptions,
}) {
  const urlRegex = /^(https?:\/\/)/;

  return (
    <Box display={"flex"} gap={1} justifyContent={"space-between"} alignItems={"center"} sx={{ flexGrow: 1 }}>
      <Box display={"flex"} flexDirection={{ xs: "column", sm: "row" }} gap={2} flexGrow={1}>

        {autocomplete && <Autocomplete
          size="small"
          sx={{ width: { xs: "100%", md: 250 } }}
          inputValue={title}
          onInputChange={(e, value) => onChange("title", value)}
          options={autocompleteOptions}
          freeSolo
          renderInput={(params) => (
            <TextField {...params} error={!title} label={title ? "Title" : "Title required"} />
          )}
        />}
        {!autocomplete && <TextField
          label={title ? "Title" : "Title required"}
          variant="outlined"
          size="small"
          error={!title}
          value={title}
          onChange={(e) => onChange("title", e.target.value)}
        />}

        <TextField
          label={url ? !urlRegex.test(url) ? "Must include 'http://' or 'https://'" : "URL" : "URL required"}
          size="small"
          type="url"
          fullWidth
          value={url}
          error={!url || !urlRegex.test(url)}
          onChange={(e) => onChange("url", e.target.value)}
          onKeyDown={(e) => e.key === " " && e.preventDefault()}
        />
      </Box>
      <Box display={"flex"} flexDirection={{ xs: "column", sm: "row" }} >
        <IconButton onClick={() => onMove(-1)}>
          <KeyboardArrowUp fontSize="small" />
        </IconButton>

        <IconButton onClick={() => onMove(1)}>
          <KeyboardArrowDown fontSize="small" />
        </IconButton>

        <IconButton onClick={() => onDelete()}>
          <Cancel fontSize="small" color="error" />
        </IconButton>
      </Box>
    </Box>
  )
}

EditLink.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  autocomplete: PropTypes.bool,
  autocompleteOptions: PropTypes.array,
}