import { Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import userActions from '../../redux/actions/userActions';
import logo from '../../traveloka_admin.png';
import LoginFormManagement from './loginForm/LoginFormManagement';
import Navigation from './Navigation';

const useStyles = makeStyles({
  box: {
    background: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: 60,
  },
  buttonPopover: {
    cursor: 'pointer',
    '&hover': {
      background: '#ccc',
    },
  },

  popover: {
    padding: 10,
  },
});

function Header({ isAuthenticated, firstName, lastName, loading, logout }) {
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
    setDialogOpen(!dialogOpen);
  };

  const handleLogoutClick = async () => {
    try {
      await logout();
      toast.success('Logout Successfully !');
      handleClosePopover();
      toggleDialog();
      history.push('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box component='div' position='absolute' className={classes.box}>
      <Container>
        <Grid container justify='space-between' alignItems='center'>
          <Grid item>
            <Box
              component='img'
              src={logo}
              style={{ width: '70%', cursor: 'pointer' }}
              onClick={() => history.push('/')}
            />
          </Grid>
          {isAuthenticated ? (
            <>
              <Grid item container justify='center' xs={6}>
                <Navigation />
              </Grid>
              <Grid item>
                <Box
                  component='div'
                  className={classes.buttonPopover}
                  onClick={handleOpenPopover}>
                  <Typography variant='body1' color='primary'>
                    {firstName} {lastName}
                  </Typography>
                </Box>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClosePopover}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}>
                  <Grid
                    className={classes.popover}
                    container
                    alignItems='flex-end'
                    direction='column'>
                    <Grid item>
                      <Button onClick={toggleDialog} size='small'>
                        Logout
                      </Button>
                    </Grid>
                  </Grid>
                </Popover>
              </Grid>
            </>
          ) : (
            <Grid item xs={1} container>
              <LoginFormManagement />
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Dialog Đăng xuất */}
      <Dialog open={dialogOpen} onClose={toggleDialog} fullWidth>
        <DialogTitle>Confirm Log Out</DialogTitle>
        <DialogContent>
          <Typography>Are you sure to exit?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={loading}
            onClick={handleLogoutClick}
            color='default'>
            {loading ? 'Logging out...' : 'Yes'}
          </Button>
          <Button
            disabled={loading}
            onClick={toggleDialog}
            variant='contained'
            color='primary'>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.isAuthenticated,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = { logout: userActions.logout };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
