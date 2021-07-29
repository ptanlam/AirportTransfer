import { Button, Grid, Typography } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import React from 'react';

export default function HorizontalPhotoInput({
  loading,
  register,
  photoFile,
  onPhotoChange,
}) {
  return (
    <Grid container alignItems='center' spacing={2}>
      <Grid item xs={3}>
        <Typography variant='subtitle2'>Photo</Typography>
      </Grid>
      <Grid container item xs={9} style={{ gap: 10 }} direction='column'>
        <Grid item>
          {photoFile && (
            <Grid item>
              <img
                style={{ borderRadius: 10 }}
                width='100%'
                src={URL.createObjectURL(photoFile)}
                alt='logo'
              />
            </Grid>
          )}
        </Grid>
        <Grid item>
          <input
            hidden
            disabled={loading}
            id='photo'
            type='file'
            name='photo'
            ref={register}
            accept='image/*'
            onChange={onPhotoChange}
          />
          <label htmlFor='photo'>
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
  );
}
