import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import VerticalLabelAutocompleteInput from "../../../../commons/VerticalLabelAutocompleteInput";
import VerticalPlaceInput from "../../../../commons/VerticalPlaceInput";

const useStyles = makeStyles({
  btnImg: {
    padding: 0,
    "&:hover": {
      opacity: 0.8,
    },
  },
});

const editBusFields = [
  { label: "Model name", inputName: "name", type: "text" },
  { label: "Guest quantity", inputName: "guestQuantity", type: "number" },
  { label: "Ticket price", inputName: "ticketPrice", type: "number" },
];

const editTrainFields = [
  { label: "Model name", inputName: "name", type: "text" },
  { label: "Ticket price", inputName: "ticketPrice", type: "number" },
];

const editCarFields = [
  { label: "Model name", inputName: "name", type: "text" },
  { label: "Luggage payload", inputName: "luggagePayload", type: "number" },
  { label: "Guest quantity", inputName: "guestQuantity", type: "number" },
  {
    label: "Standard price per km",
    inputName: "standardPricePerKm",
    type: "number",
  },
];

const editFlightFields = [
  { label: "Model name", inputName: "name", type: "text" },
  { label: "Guest quantity", inputName: "guestQuantity", type: "number" },
];

function getEditFields(transportType) {
  switch (transportType) {
    case "buses":
      return editBusFields;
    case "trains":
      return editTrainFields;
    case "cars":
      return editCarFields;
    case "flights":
      return editFlightFields;
    default:
      break;
  }
}

export default function VehicleEditForm({
  errors,
  classes,
  vehicle,
  control,
  loading,
  register,
  onSubmit,
  photoFile,
  dialogOpen,
  closeDialog,
  transportType,
  onPhotoChange,
}) {
  const uiClasses = useStyles();

  return (
    <Dialog open={dialogOpen} maxWidth="md" fullWidth>
      <DialogTitle>{vehicle.name}</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid
              container
              item
              xs={12}
              md={6}
              justify="center"
              alignItems="center"
              direction="column"
              style={{ gap: 20 }}
            >
              <Grid item>
                <input
                  hidden
                  id="photo"
                  type="file"
                  name="photo"
                  ref={register}
                  accept="image/*"
                  onChange={onPhotoChange}
                />
                <label htmlFor="photo">
                  <Button
                    disabled={loading}
                    color="default"
                    component="span"
                    className={uiClasses.btnImg}
                  >
                    <img
                      width="100%"
                      style={{ borderRadius: 10 }}
                      src={
                        photoFile
                          ? URL.createObjectURL(photoFile)
                          : vehicle.photoUrl
                      }
                      alt={vehicle.name}
                    />
                  </Button>
                </label>
              </Grid>
            </Grid>

            <Grid
              container
              item
              xs={12}
              md={6}
              justify="center"
              direction="column"
              style={{ gap: 15 }}
            >
              {getEditFields(transportType).map((field, index) => (
                <Grid container item direction="column" key={index}>
                  <Grid item>
                    <Typography
                      variant="caption"
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {field.label}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      size="small"
                      type={field.type}
                      variant="outlined"
                      disabled={loading}
                      inputRef={register}
                      name={field.inputName}
                      defaultValue={vehicle[field.inputName]}
                      helperText={errors[field.inputName]?.message}
                      error={!!errors[field.inputName]?.message.length}
                    />
                  </Grid>
                </Grid>
              ))}

              {transportType !== "flights" && (
                <Grid item>
                  <VerticalLabelAutocompleteInput
                    register={register}
                    label="Vehicle class"
                    helperText={errors.class?.message}
                    loading={loading}
                    inputName="class"
                    selections={classes}
                    error={!!errors.class?.message.length}
                    defaultValue={() => {
                      const rankIndex = classes.findIndex(
                        (vehicleClass) => vehicleClass.id === vehicle.classId
                      );
                      return classes[rankIndex];
                    }}
                  />
                </Grid>
              )}

              {transportType === "cars" && (
                <Grid item>
                  <VerticalPlaceInput
                    control={control}
                    loading={loading}
                    register={register}
                    label="Working place"
                    inputName="workingPlace"
                    transportType={transportType}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={closeDialog}>
            Back
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
