import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React from "react";
import { BASE_URL } from "../../../../constants";

const partnerInformation = [
  {
    label: "Company id",
    field: "id",
  },
  {
    label: "Email",
    field: "email",
  },

  {
    label: "Hotline",
    field: "hotline",
  },
];

const useStyles = makeStyles({
  paper: {
    padding: 20,
    boxShadow: "0 0 32px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(8px)",
    borderRadius: 5,
    border: "1px solid #1ba0e2",
  },
  wrapper: { gap: 5 },
  partnerName: {
    fontWeight: "bold",
  },
  btnImg: {
    padding: 0,
    "&:hover": {
      opacity: 0.7,
    },
  },
});

export default function CompanyProfile({
  loading,
  partner,
  logoFile,
  register,
  onSubmit,
  onLogoChange,
  stillHasVehicle,
}) {
  const classes = useStyles();

  return (
    <Box
      position="absolute"
      top={0}
      width="100%"
      minHeight="100vh"
      bgcolor="#1D80C3"
    >
      <Container style={{ paddingTop: 110, marginBottom: 30 }}>
        <Paper className={classes.paper}>
          <Grid
            container
            className={classes.wrapper}
            alignItems="center"
            justify="center"
            direction="column"
          >
            <Grid container item justify="center">
              <Typography className={classes.partnerName} variant="h4">
                {partner.name}
              </Typography>
            </Grid>
            <form onSubmit={onSubmit}>
              <Grid
                container
                item
                direction="column"
                alignItems="center"
                style={{ gap: 15 }}
              >
                <Grid item xs={12} md={8}>
                  <input
                    hidden
                    id="logo"
                    type="file"
                    name="logo"
                    ref={register}
                    accept="image/*"
                    onChange={onLogoChange}
                  />
                  <label htmlFor="logo">
                    <Button
                      disabled={loading}
                      color="default"
                      component="span"
                      className={classes.btnImg}
                    >
                      <img
                        width="100%"
                        style={{ borderRadius: 10 }}
                        src={
                          logoFile
                            ? URL.createObjectURL(logoFile)
                            : partner.logoUrl
                        }
                        alt={partner.name}
                      />
                    </Button>
                  </label>
                </Grid>
                {logoFile && (
                  <Grid item>
                    <Button
                      disabled={loading}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      {loading ? "Updating..." : "Update logo"}
                    </Button>
                  </Grid>
                )}
              </Grid>
            </form>
            <Grid
              container
              item
              alignItems="center"
              direction="column"
              spacing={1}
            >
              {partnerInformation.map((info, index) => (
                <Grid container item xs={12} md={7} key={index} spacing={1}>
                  <Grid container item xs={4}>
                    <Typography variant="subtitle2">{info.label}</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="subtitle2">
                      {partner[info.field]}
                    </Typography>
                  </Grid>
                </Grid>
              ))}

              <Grid container item xs={12} md={7} spacing={1}>
                <Grid item xs={4}>
                  <Typography variant="subtitle2">Registered at</Typography>
                </Grid>
                <Grid container item xs={8} direction="column">
                  <Typography variant="subtitle2">
                    {new Date(partner.createdAt).toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container item xs={12} md={7} spacing={1}>
                <Grid item xs={4}>
                  <Typography variant="subtitle2">Last updated at</Typography>
                </Grid>
                <Grid container item xs={8} direction="column">
                  <Typography variant="subtitle2">
                    {new Date(partner.updatedAt).toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item justify="flex-end">
              <Grid item>
                <Tooltip
                  disableFocusListener
                  title={
                    <Typography
                      align="center"
                      variant="subtitle2"
                      style={{ fontWeight: "bold" }}
                    >
                      {stillHasVehicle
                        ? "Can not unregister due to you " +
                          "still have vehicle!"
                        : "Stop co-operating with us 😢"}
                    </Typography>
                  }
                >
                  <span>
                    <Button
                      disabled={stillHasVehicle}
                      variant="contained"
                      color="secondary"
                    >
                      Unregister
                    </Button>
                  </span>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
