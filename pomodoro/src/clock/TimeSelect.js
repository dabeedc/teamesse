import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export const TimeSelect = ({
  title,
  initialTime,
  setInitialTime,
  disabled,
}) => (
  <FormControl>
    <InputLabel sx={{ color: "white" }} id="interval-picker">
      {title}
    </InputLabel>
    <Select
      MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
      value={initialTime}
      label="Age"
      onChange={(e) => setInitialTime(e.target.value)}
      disabled={disabled}
    >
      {Array.from({ length: 32 }, (_, i) => i + 1).map((interval) => {
        return (
          <MenuItem key={interval} value={interval * 5 * 60}>
            {interval * 5} minutes
          </MenuItem>
        );
      })}
    </Select>
  </FormControl>
);
