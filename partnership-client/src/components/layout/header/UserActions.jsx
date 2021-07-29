import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  makeStyles,
  Popover,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../constants";
import accountActions from "../../../redux/actions/accountActions";
import partnerActions from "../../../redux/actions/partnerActions";

const useStyles = makeStyles({
  popover: {
    padding: 10,
  },
  itemText: {
    color: "white",
  },
});

function UserActions({
  isAuthenticated,
  loading,
  logoUrl,
  logout,
  clearPartnerInfo,
}) {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const toggleDialog = () => {
    setAnchorEl(null);
    setDialogOpen(!dialogOpen);
  };

  const handleLogoutClick = async () => {
    try {
      await logout();
      toggleDialog();
      clearPartnerInfo();
      window.location.reload();
      toast.success("Logout successfully!");
    } catch (error) {
      if (error.response.status === 401) {
        toast.warning("Please refresh the page and login again to continue");
      } else {
        toast.error(error.message);
      }
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Grid item>
        <Grid container>
          {isAuthenticated ? (
            <>
              <Grid item>
                <IconButton onClick={handleOpenPopover}>
                  <Avatar src={`${BASE_URL}/${logoUrl}`} />
                  <ExpandMore className={classes.itemText} />
                </IconButton>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClosePopover}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Grid
                    className={classes.popover}
                    container
                    direction="column"
                  >
                    <Grid item>
                      <Button
                        size="small"
                        onClick={() => {
                          history.push("/account");
                          setAnchorEl(null);
                        }}
                      >
                        <Grid container alignItems="center" spacing={1}>
                          <Grid item xs={3}>
                            <AccountCircleIcon />
                          </Grid>
                          <Grid item xs={9}>
                            <Typography variant="subtitle2">Account</Typography>
                          </Grid>
                        </Grid>
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button onClick={toggleDialog} size="small">
                        <Grid container alignItems="center" spacing={1}>
                          <Grid item xs={3}>
                            <ExitToAppIcon />
                          </Grid>
                          <Grid item xs={9}>
                            <Typography variant="subtitle2">Logout</Typography>
                          </Grid>
                        </Grid>
                      </Button>
                    </Grid>
                  </Grid>
                </Popover>
              </Grid>
            </>
          ) : (
            <Grid item>
              <Button
                className={classes.itemText}
                component={NavLink}
                to="/login"
              >
                Sign in
              </Button>
              <Button
                component={NavLink}
                style={{ background: "white" }}
                to="/registration"
              >
                Sign up
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Dialog open={dialogOpen} onClose={toggleDialog}>
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={toggleDialog}>
            Cancel
          </Button>
          <Button disabled={loading} onClick={handleLogoutClick}>
            {loading ? "Logging out..." : "Yes"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function mapStateToProps(state) {
  return {
    logoUrl: state.partner.logoUrl,
    loading: state.apiCallsInProgress > 0,
    isAuthenticated: state.account.isAuthenticated,
  };
}

const mapDispatchToProps = {
  logout: accountActions.logout,
  clearPartnerInfo: partnerActions.clearPartnerInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserActions);
