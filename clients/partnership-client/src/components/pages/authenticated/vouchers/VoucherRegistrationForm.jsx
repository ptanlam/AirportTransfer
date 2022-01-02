import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import React from 'react';
import HorizontalLabelDatePicker from '../../../commons/HorizontalLabelDatePicker';
import HorizontalPhotoInput from '../../../commons/HorizontalPhotoInput';
import VerticalLabelInput from '../../../commons/VerticalLabelInput';

const voucherRegistrationFields = [
  {
    label: 'Voucher name',
    inputName: 'Name',
    maxLength: 200,
    type: 'text',
  },
  {
    label: 'Point cost',
    inputName: 'PointCost',
    type: 'number',
  },
  {
    label: 'Money discount',
    inputName: 'MoneyDiscount',
    type: 'number',
  },
  {
    label: 'Discount',
    inputName: 'Discount',
    type: 'number',
  },
  {
    label: 'Quantity',
    inputName: 'Quantity',
    type: 'number',
  },
  {
    label: 'Content header',
    inputName: 'ContentHeader',
    maxLength: 1000,
    type: 'text',
  },
  {
    label: 'Pre content',
    inputName: 'PreContent',
    maxLength: 2000,
    type: 'text',
  },
  {
    label: 'Contents',
    inputName: 'Contents',
    maxLength: 4000,
    type: 'text',
  },
  {
    label: 'Voucher note',
    inputName: 'VoucherNote',
    maxLength: 1000,
    type: 'text',
  },
];

export default function VoucherRegistrationForm({
  errors,
  loading,
  onClose,
  onSubmit,
  register,
  dialogOpen,
  photoFile,
  onPhotoChange,
}) {
  return (
    <Dialog open={dialogOpen} maxWidth='md' fullWidth>
      <DialogTitle>Register new voucher</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Grid container direction='column' style={{ gap: 15 }}>
            <Grid container item spacing={2}>
              {voucherRegistrationFields.map((field, index) => (
                <Grid item key={index} xs={12} md={6}>
                  <VerticalLabelInput
                    loading={loading}
                    type={field.type}
                    label={field.label}
                    register={register}
                    inputName={field.inputName}
                    maxLength={field.maxLength}
                    helperText={errors?.[field.inputName]?.message}
                    error={!!errors?.[field.inputName]?.message.length}
                  />
                </Grid>
              ))}
            </Grid>
            <Grid item>
              <HorizontalLabelDatePicker
                loading={loading}
                label='Start date'
                register={register}
                inputName='CreateDate'
              />
            </Grid>
            <Grid item>
              <HorizontalLabelDatePicker
                label='End date'
                loading={loading}
                register={register}
                inputName='ExpDate'
              />
            </Grid>
            <Grid item>
              <HorizontalPhotoInput
                loading={loading}
                register={register}
                photoFile={photoFile}
                onPhotoChange={onPhotoChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Back
          </Button>
          <Button
            type='submit'
            color='primary'
            disabled={loading}
            variant='contained'>
            {loading ? 'Adding...' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
