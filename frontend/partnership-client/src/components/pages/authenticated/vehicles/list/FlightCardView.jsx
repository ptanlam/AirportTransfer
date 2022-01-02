import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  paper: {
    padding: 20,
    borderRadius: 20,
  },
});

const flightInformation = [
  {
    label: "Id",
    field: "id",
  },
  {
    label: "Guest quantity",
    field: "guestQuantity",
  },
];

export default function FlightCardView({ vehicle, openVehicleEditDialog }) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} key={vehicle.id}>
      <Grid
        container
        alignItems="center"
        direction="column"
        style={{ gap: 20 }}
      >
        <Grid item>
          <Typography
            className={classes.partnerName}
            style={{ fontWeight: "bold" }}
            variant="h4"
          >
            {vehicle.name}
          </Typography>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={12} md={5}>
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
            direction="column"
            justify="center"
            style={{ gap: 20 }}
            xs={12}
            md={7}
          >
            <Grid container item direction="column" spacing={1}>
              {flightInformation.map((info, index) => (
                <Grid container item key={index} spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="subtitle2">{info.label}</Typography>
                  </Grid>
                  <Grid container item xs={9} direction="column">
                    <Typography variant="subtitle2">
                      {vehicle[info.field]}
                    </Typography>
                  </Grid>
                </Grid>
              ))}

              <Grid container item spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="subtitle2" editable="true">
                    Registered at
                  </Typography>
                </Grid>
                <Grid container item xs={9} direction="column">
                  <Typography variant="subtitle2">
                    {new Date(vehicle.createdAt).toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container item spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="subtitle2">Last updated at</Typography>
                </Grid>
                <Grid container item xs={9} direction="column">
                  <Typography variant="subtitle2">
                    {new Date(vehicle.updatedAt).toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item justify="flex-end" spacing={1}>
            <Grid item>
              <Button
                onClick={() => openVehicleEditDialog(vehicle.id)}
                size="small"
                style={{ background: "#0A5F69", color: "white" }}
              >
                Edit
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                variant="contained"
                style={{ background: "#df4759", color: "white" }}
              >
                Unregister
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
