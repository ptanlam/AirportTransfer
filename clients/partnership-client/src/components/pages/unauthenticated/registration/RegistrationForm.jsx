import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Alert, AlertTitle } from '@material-ui/lab';
import React from 'react';
import { Controller } from 'react-hook-form';
import HorizontalLabelInput from '../../../commons/HorizontalLabelInput';

const transportTypes = [
  { label: 'Bus', value: 'buses' },
  { label: 'Train', value: 'trains' },
  { label: 'Car', value: 'cars' },
  { label: 'Flight', value: 'flights' },
];

const presenterInformation = [
  {
    label: 'First Name',
    inputName: 'presenterFirstName',
    maxLength: 40,
    minLength: 2,
  },
  {
    label: 'Last Name',
    inputName: 'presenterLastName',
    maxLength: 40,
    minLength: 2,
  },
  {
    label: 'Phone Number',
    inputName: 'presenterPhoneNumber',
    maxLength: 15,
    minLength: 10,
  },
];

const companyInformation = [
  {
    label: 'Company Name ',
    note: 'please aware that you can not change company name in the future',
    inputName: 'companyName',
    maxLength: 250,
    minLength: 3,
  },
  {
    label: 'Company Hotline',
    inputName: 'companyHotline',
    maxLength: 15,
    minLength: 10,
  },
  {
    label: 'Company Email',
    inputName: 'companyEmail',
    maxLength: 320,
    minLength: 3,
  },
];

const accountInformation = [
  {
    label: 'Email',
    inputName: 'email',
    type: 'text',
  },
  {
    label: 'Password',
    inputName: 'password',
    type: 'password',
  },
  {
    label: 'Enter your password again',
    inputName: 'passwordConfirmation',
    type: 'password',
  },
];

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    background:
      'linear-gradient(0, rgba(2,0,36,1) 0%, rgba(146,174,245,1) 0%, rgba(255,255,255,1) 0%, rgba(29,128,195,1) 100%)',
    paddingTop: '100px',
  },
  formContainer: {
    padding: 10,
  },
  paper: {
    padding: '20 70',
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    color: '#fff',
    padding: '5 50',
    borderRadius: 10,
    background: '#0194f3',
  },
  confirmBtn: {
    backgroundColor: '#FF5E1F',
    color: '#fff',
    fontWeight: 'bold',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#FF5E1F',
      opacity: '0.9',
    },
  },
});

export default function RegistrationForm({
  errors,
  dialog,
  control,
  loading,
  register,
  onSubmit,
  logoFile,
  onLogoChange,
  transportType,
  responseErrors,
  backToHomeClick,
}) {
  const uiClasses = useStyles();

  return (
    <Box className={uiClasses.root}>
      <Container className={uiClasses.formContainer} maxWidth='md'>
        <Grid container>
          <Grid item xs={12}>
            <Paper className={uiClasses.paper}>
              <form onSubmit={onSubmit}>
                <Grid container direction='column' style={{ gap: 20 }}>
                  {Object.keys(responseErrors).length > 0 && (
                    <Grid item>
                      <Alert variant='filled' severity='error'>
                        <AlertTitle>Error</AlertTitle>
                        <strong>{responseErrors.message}</strong>
                      </Alert>
                    </Grid>
                  )}
                  <Grid container item justify='center'>
                    <Typography variant='h5' className={uiClasses.title}>
                      Presenter Information
                    </Typography>
                  </Grid>
                  {presenterInformation.map((info, index) => (
                    <Grid item key={index}>
                      <HorizontalLabelInput
                        loading={loading}
                        label={info.label}
                        register={register}
                        maxLength={info.maxLength}
                        minLength={info.minLength}
                        inputName={info.inputName}
                        helperText={errors?.[info.inputName]?.message}
                        error={errors?.[info.inputName]?.message.length > 0}
                      />
                    </Grid>
                  ))}

                  <Grid container item justify='center'>
                    <Typography variant='h5' className={uiClasses.title}>
                      Account Information
                    </Typography>
                  </Grid>
                  {accountInformation.map((info) => (
                    <Grid item key={info.inputName}>
                      <HorizontalLabelInput
                        type={info.type}
                        loading={loading}
                        label={info.label}
                        register={register}
                        inputName={info.inputName}
                        helperText={errors[info.inputName]?.message}
                        error={errors[info.inputName]?.message.length > 0}
                      />
                    </Grid>
                  ))}

                  <Grid container item justify='center'>
                    <Typography variant='h5' className={uiClasses.title}>
                      Company Information
                    </Typography>
                  </Grid>
                  {companyInformation.map((info, index) => (
                    <Grid item key={index}>
                      <HorizontalLabelInput
                        label={info.label}
                        loading={loading}
                        register={register}
                        maxLength={info.maxLength}
                        minLength={info.minLength}
                        inputName={info.inputName}
                        helperText={errors?.[info.inputName]?.message}
                        error={errors?.[info.inputName]?.message.length > 0}
                      />
                    </Grid>
                  ))}

                  <Grid item>
                    <Grid container alignItems='center'>
                      <Grid item xs={12} md={3}>
                        <Typography variant='subtitle2'>
                          Transport Type
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <Controller
                          rules={{ required: true }}
                          control={control}
                          defaultValue={transportType}
                          name='transportType'
                          as={
                            <RadioGroup row>
                              {transportTypes.map((type, index) => (
                                <FormControlLabel
                                  disabled={loading}
                                  key={index}
                                  value={type.value}
                                  control={<Radio />}
                                  label={type.label}
                                />
                              ))}
                            </RadioGroup>
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid container alignItems='center'>
                      <Grid item xs={3}>
                        <Typography variant='subtitle2'>Logo</Typography>
                      </Grid>
                      <Grid
                        container
                        item
                        direction='column'
                        xs={9}
                        style={{ gap: 10 }}>
                        {logoFile && (
                          <Grid item>
                            <img
                              style={{ borderRadius: 10 }}
                              width='100%'
                              src={URL.createObjectURL(logoFile)}
                              alt='logo'
                            />
                          </Grid>
                        )}
                        <Grid item>
                          <input
                            onChange={onLogoChange}
                            type='file'
                            id='logo'
                            name='logo'
                            accept='image/*'
                            ref={register}
                            hidden
                          />
                          <label htmlFor='logo'>
                            <Button
                              disabled={loading}
                              variant='contained'
                              color='default'
                              startIcon={<CloudUploadIcon />}
                              component='span'>
                              Upload
                            </Button>
                          </label>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid container item justify='flex-end'>
                    {loading ? (
                      <CircularProgress />
                    ) : (
                      <Button
                        className={uiClasses.confirmBtn}
                        type='submit'
                        size='large'>
                        Confirm
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Dialog open={dialog.open}>
        <DialogTitle>Congratulations!</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{dialog.content}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={backToHomeClick}>Back to home</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
