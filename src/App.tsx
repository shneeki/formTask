import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useSnackbar } from 'notistack';

function getAge(dateString: string) {
  const today = new Date();
  const birthDate = new Date(dateString);
  const age = today.getFullYear() - birthDate.getFullYear();
  return age;
}

const signupSchema = yup.object().shape({
  userName: yup.string().required('You must enter your user name'),
  birthday: yup.string().required('You must select your birthday'),
  age: yup
    .number()
    .test('DOB', 'Incorrect date selected, must be older than 18', (value) => {
      if (value === undefined || value >= 18) return true;
      return false;
    }),
  isTermsAgreed: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and  conditions'),
});

interface ISignUp {
  userName: string;
  birthday: Date;
  isTermsAgreed: boolean;
  age: number;
}
const defaultValues: Omit<ISignUp, 'age' | 'birthday'> = {
  userName: '',
  isTermsAgreed: false,
};

function App() {
  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    control,
    reset,
  } = useForm<ISignUp>({
    defaultValues,

    resolver: yupResolver(signupSchema),
  });

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data: any) => {
    enqueueSnackbar(JSON.stringify(getValues()));
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh">
      <form className="signupForm" name="submitForm">
        <Controller
          name="userName"
          control={control}
          render={({ field }) => (
            <div className="formInput">
              <TextField
                fullWidth
                label="Username"
                value={field.value}
                onChange={(newValue) => {
                  field.onChange(newValue);
                }}
              />
              {errors.userName && (
                <p className="formError">{errors.userName.message}</p>
              )}
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
                    if (newValue)
                      setValue('age', getAge(newValue.toString()), {
                        shouldValidate: true,
                      });
                  }}
                  renderInput={(params: any) => (
                    <TextField {...params} fullWidth />
                  )}
                />
              </LocalizationProvider>
              {errors.birthday && (
                <p className="formError">{errors.birthday.message}</p>
              )}
            </div>
          )}
        />

        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <div
              className="formInput"
              style={{ pointerEvents: 'none', userSelect: 'none' }}>
              <TextField
                fullWidth
                InputLabelProps={{ shrink: true }}
                label="Age"
                id="outlined"
                value={field.value}
                InputProps={{
                  readOnly: true,
                }}
              />
              {errors.age && <p className="formError">{errors.age.message}</p>}
            </div>
          )}
        />
        <Controller
          name="isTermsAgreed"
          control={control}
          render={({ field }) => (
            <>
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
              {errors.isTermsAgreed && (
                <p className="formError">{errors.isTermsAgreed.message}</p>
              )}
            </>
          )}
        />

        <Button onClick={handleSubmit(onSubmit)} variant={'contained'}>
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default App;
