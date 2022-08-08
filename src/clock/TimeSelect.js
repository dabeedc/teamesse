import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export const TimeSelect = ({ title, initialTime, setInitialTime, disabled }) => (
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
      <MenuItem value={5}>5 seconds</MenuItem>
      {[1, ...Array.from({ length: 32 }, (_, i) => 5 * (i + 1))].map(
        (interval) => {
          return (
            <MenuItem key={interval} value={interval * 60}>
              {interval} minutes
            </MenuItem>
          );
        }
      )}
    </Select>
  </FormControl>
);
