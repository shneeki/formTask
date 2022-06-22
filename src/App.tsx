import React, { useState } from 'react';

import { useForm, Controller } from 'react-hook-form';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

interface ISignUp {
  userName: string;
  birthday: Date;
  age: number;
  isTermsAgreed: boolean;
}
const defaultValues: ISignUp = {
  userName: '',
  birthday: new Date(),
  age: 0,
  isTermsAgreed: false,
};

function App() {
  // const [value, setValue] = React.useState<Date | null>(null);
  const { handleSubmit, getValues, setValue, watch, control } =
    useForm<ISignUp>({
      defaultValues,
    });
  const onSubmit = (data: any) => console.log(data);
  console.log(watch('userName'));
  console.log('birthday' + watch('birthday'));
  console.log('isTermsAgreed' + watch('isTermsAgreed'));
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh">
      <form className="signupForm">
        <Controller
          name="userName"
          control={control}
          render={({ field }) => (
            <div className="formInput">
              <TextField
                required
                fullWidth
                label="Username"
                value={field.value}
                onChange={(newValue) => {
                  field.onChange(newValue);
                }}
              />
            </div>
          )}
        />
        <Controller
          name="birthday"
          control={control}
          render={({ field }) => (
            <div className="formInput">
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Birthday"
                  value={field.value}
                  onChange={(newValue) => {
                    field.onChange(newValue);
                  }}
                  renderInput={(params: any) => (
                    <TextField {...params} fullWidth />
                  )}
                />
              </LocalizationProvider>
            </div>
          )}
        />

        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <div className="formInput">
              <TextField
                fullWidth
                disabled
                id="outlined"
                label="Age"
                // value={getValues().birthday?.}
                // InputProps={{
                //   readOnly: true,
                // }}
              />
            </div>
          )}
        />

        <Controller
          name="isTermsAgreed"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={field.value}
                  size="medium"
                  onChange={(newValue) => {
                    field.onChange(newValue);
                  }}
                />
              }
              label="I have read and agree to User Agreement and Privacy Policy."
            />
          )}
        />
        {/* <input type="submit" /> */}
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Register
        </Button>
      </form>
    </Box>
  );
}

export default App;
