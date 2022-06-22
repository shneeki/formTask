import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function App() {
  const [value, setValue] = React.useState<Date | null>(null);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh">
      <form className="signupForm">
        <div className="formInput">
          <TextField
            required
            fullWidth
            id="outlined-required"
            label="Username"
            defaultValue=""
          />
        </div>
        <div className="formInput">
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Birthday"
              value={value}
              onChange={(newValue: Date | null) => {
                setValue(newValue);
              }}
              renderInput={(params: any) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </div>

        <div className="formInput">
          <TextField
            fullWidth
            disabled
            id="outlined"
            label="Age"
            defaultValue=""
            // InputProps={{
            //   readOnly: true,
            // }}
          />
        </div>
        <FormControlLabel
          control={<Checkbox size="medium" />}
          label="I have read and agree to User Agreement and Privacy Policy."
        />

        <Button variant="contained">Register</Button>
      </form>
    </Box>
  );
}

export default App;
