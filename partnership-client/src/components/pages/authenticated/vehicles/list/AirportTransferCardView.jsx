import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RemoveIcon from "@material-ui/icons/Remove";
import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import vehicleActions from "../../../../../redux/actions/vehicleActions";
import convertToCurrency from "../../../../../utils/convertToCurrency";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightBold,
  },
  licencePlate: {
    fontWeight: "bold",
    background: "rgb(255, 94, 31)",
    color: "white",
    padding: "10 20",
    borderRadius: 5,
  },
}));

const busInformation = [
  {
    label: "Id",
    field: "id",
  },
  {
    label: "Guest quantity",
    field: "guestQuantity",
  },
];

const trainInformation = [
  {
    label: "Id",
    field: "id",
  },
];

const carInformation = [
  {
    label: "Id",
    field: "id",
  },
  {
    label: "Luggage payload",
    field: "luggagePayload",
  },
  {
    label: "Guest quantity",
    field: "guestQuantity",
  },
  {
    label: "Working city",
    field: "city",
  },
  {
    label: "Working country",
    field: "country",
  },
];

function getVehicleInformation(transportType) {
  switch (transportType) {
    case "cars":
      return carInformation;
    case "buses":
      return busInformation;
    case "trains":
      return trainInformation;
    default:
      return [];
  }
}

function AirportTransferCardView({
  vehicle,
  removeCar,
  transportType,
  openAddCarDialog,
  openVehicleEditDialog,
  openJourneyDetailsDialog,
  openCancelRegistrationDialog,
  openJourneyRegistrationDialog,
}) {
  const [loading, setLoading] = useState(false);
  const [carRemovalDialog, setCarRemovalDialog] = useState(false);
  const [chosenCarId, setChosenCarId] = useState(null);
  const classes = useStyles();

  const displayPriceLabel = () =>
    transportType === "cars" ? "Standard price per km" : "Ticket price";

  const handleOpenCarRemovalDialog = (carId) => {
    setChosenCarId(carId);
    setCarRemovalDialog(true);
  };

  const handleCloseCarRemovalDialog = () => {
    setChosenCarId(null);
    setCarRemovalDialog(false);
  };

  const onCarRemovalConfirm = async () => {
    setLoading(true);
    try {
      await removeCar(chosenCarId);
      handleCloseCarRemovalDialog();
      toast.success("Remove car successfully!");
    } catch (error) {
      if (error.response.status === 401) {
        toast.warning("Please login again to continue!");
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const journeyActionButtons = () => (
    <Grid container item justify="flex-end">
      <Grid item xs={4}>
        <Typography variant="subtitle2">Journeys</Typography>
      </Grid>
      <Grid container item xs={8}>
        <ButtonGroup>
          <Button
            style={{ borderRadius: 0 }}
            size="small"
            variant="outlined"
            onClick={() => {
              openJourneyDetailsDialog(vehicle.id);
            }}
          >
            Journeys
          </Button>
          <Button
            style={{ borderRadius: 0 }}
            size="small"
            variant="outlined"
            onClick={() => openJourneyRegistrationDialog(vehicle.id)}
          >
            Add journey
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );

  const carAdditionalInformation = () => (
    <Grid container item justify="flex-end">
      <Grid item xs={12} md={7}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              {vehicle.details.length === 1
                ? `${vehicle.details.length} car`
                : `${vehicle.details.length} cars`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container direction="column" style={{ gap: 5 }}>
              {vehicle.details.map((car) => (
                <Grid
                  container
                  item
                  key={car.id}
                  alignItems="center"
                  spacing={1}
                >
                  <Grid container item xs={12} md={5}>
                    <Grid item xs={4}>
                      <Typography variant="caption">Licence plate</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography
                        variant="caption"
                        className={classes.licencePlate}
                      >
                        {car.licencePlate}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container item xs={10} md={6}>
                    <Grid item xs={2}>
                      <Typography variant="caption">Color</Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <Box
                        bgcolor={car.color}
                        height={20}
                        boxShadow="0px 5px 5px #ccc"
                      ></Box>
                    </Grid>
                  </Grid>
                  <Grid container item xs={2} md={1}>
                    <IconButton
                      color="secondary"
                      onClick={() => handleOpenCarRemovalDialog(car.id)}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}

              <Grid container item justify="center">
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => openAddCarDialog(vehicle.id)}
                >
                  Add car
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );

  return (
    <>
      <Paper className={classes.paper} key={vehicle.id}>
        <Grid
          container
          item
          alignItems="center"
          direction="column"
          style={{ gap: 10 }}
        >
          <Grid item>
            <Typography
              className={classes.partnerName}
              style={{
                fontWeight: "bold",
              }}
              variant="h4"
              align="center"
            >
              {vehicle.name}
            </Typography>
          </Grid>
          <Grid item>
            <Chip label={vehicle.className} />
          </Grid>

          <Grid container item spacing={4}>
            <Grid container item xs={12} md={5} justify="center">
              <img
                width="100%"
                style={{ borderRadius: 10 }}
                src={vehicle.photoUrl}
                alt={vehicle.name}
              />
            </Grid>

            <Grid
              container
              item
              xs={12}
              md={7}
              justify="center"
              direction="column"
              style={{ gap: 15 }}
            >
              <Grid container item direction="column" style={{ gap: 10 }}>
                {getVehicleInformation(transportType).map((info, index) => (
                  <Grid container item key={index}>
                    <Grid item xs={4}>
                      <Typography variant="subtitle2">{info.label}</Typography>
                    </Grid>
                    <Grid container item xs={8} direction="column">
                      <Typography variant="subtitle2">
                        {vehicle[info.field]}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}

                <Grid container item>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2">Registered at</Typography>
                  </Grid>
                  <Grid container item xs={8} direction="column">
                    <Typography variant="subtitle2">
                      {new Date(vehicle.createdAt).toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2">Last updated at</Typography>
                  </Grid>
                  <Grid container item xs={8} direction="column">
                    <Typography variant="subtitle2">
                      {new Date(vehicle.updatedAt).toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2">
                      {displayPriceLabel()}
                    </Typography>
                  </Grid>
                  <Grid container item xs={8} direction="column">
                    <Typography variant="subtitle2">
                      {convertToCurrency(
                        vehicle.ticketPrice || vehicle.standardPricePerKm
                      )}
                    </Typography>
                  </Grid>
                </Grid>
                {transportType !== "cars" && journeyActionButtons()}
              </Grid>
            </Grid>

            {transportType === "cars" && carAdditionalInformation()}

            <Grid container item justify="flex-end" spacing={1}>
              <Grid item>
                <Button
                  onClick={() => openVehicleEditDialog(vehicle.id)}
                  size="small"
                  variant="contained"
                  style={{
                    background: "#0A5F69",
                    color: "white",
                    borderRadius: 0,
                  }}
                >
                  Edit
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="secondary"
                  size="small"
                  variant="contained"
                  style={{ borderRadius: 0 }}
                  onClick={() => openCancelRegistrationDialog(vehicle.id)}
                >
                  Unregister
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Dialog open={carRemovalDialog}>
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <Typography>Do you really want to remove this car?</Typography>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={handleCloseCarRemovalDialog}>
            Back
          </Button>
          <Button
            disabled={loading}
            variant="contained"
            color="secondary"
            onClick={onCarRemovalConfirm}
          >
            {loading ? "Removing..." : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  removeCar: vehicleActions.removeCar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AirportTransferCardView);
