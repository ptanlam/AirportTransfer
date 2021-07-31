import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons';
import { IconButton, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { NavBarData } from './NavBarData';
import LoginFormManagement from './loginForm/LoginFormManagement';
import Bar from './Bar';
import userActions from '../../../../../redux/actions/userActions';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  link: {
    background: '#0770cd',
    borderRadius: 7,
    padding: '10px 15px',
    color: '#fff',
  },
  marginLeft: {
    marginLeft: 7,
  },
  accountPopOver: {
    padding: 20,
  },
  buttonAccountData: {
    marginRight: 10,
  },
});

function NavBar({ isAuthenticated, lastName, firstName, logout }) {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLoading = () => {
    setLoading(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [dialogOpen, setDialogOpen] = useState(false);
  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
    setAnchorEl(null);
  };

  const handleLogoutClick = async () => {
    try {
      await logout();
      handleClose();
      toggleDialog();
      history.push('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Grid item xs spacing={1} container justify='flex-end' alignItems='center'>
      {/* NavBar */}
      <Grid item container xs={5} sm={5} md={9} spacing={1} justify='flex-end'>
        {NavBarData.map((val, index) => (
          <Grid item key={index}>
            <Bar
              id={val.iconId}
              icon={val.icon}
              text={val.iconText}
              path={val.path}
            />
          </Grid>
        ))}
      </Grid>

      {/* Check authentication */}
      {isAuthenticated ? (
        <Grid item xs container>
          {loading ? (
            <CircularProgress size='20px' style={{ color: '#1ba0e2' }} />
          ) : (
            <Box className={classes.flex} onClick={handleClick}>
              <IconButton>
                <AccountCircleIcon
                  style={{ fontSize: '20px', color: '#1ba0e2' }}
                />
                {!!firstName && (
                  <Typography
                    variant='body2'
                    style={{ fontWeight: 'bold' }}
                    color='textSecondary'
                    className={classes.marginLeft}
                  >
                    {firstName} {lastName}
                  </Typography>
                )}
              </IconButton>
            </Box>
          )}
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Grid
              container
              direction='column'
              className={classes.accountPopOver}
            >
              <Grid item>
                <Typography variant='h6'>Tài khoản</Typography>
              </Grid>
              <Grid item>
                <Button onClick={() => history.push('/profile')}>
                  <FontAwesomeIcon
                    color='#177ad0'
                    icon={faUser}
                    className={classes.buttonAccountData}
                  />
                  Chỉnh sửa hồ sơ
                </Button>
              </Grid>
              <Grid item>
                <Button size='small' onClick={toggleDialog}>
                  <FontAwesomeIcon
                    color='#177ad0'
                    icon={faPowerOff}
                    className={classes.buttonAccountData}
                  />
                  Đăng xuất
                </Button>
              </Grid>
            </Grid>
          </Popover>
        </Grid>
      ) : (
        <Grid item xs container>
          {/* Login Form */}
          <LoginFormManagement handleLoading={handleLoading} />
          <Grid item xs container justify='center' alignItems='center'>
            <NavLink to='/register' className={classes.link}>
              Đăng ký
            </NavLink>
          </Grid>
        </Grid>
      )}

      {/* Dialog Đăng xuất */}
      <Dialog open={dialogOpen} onClose={toggleDialog}>
        <DialogTitle>Đang đăng xuất</DialogTitle>
        <DialogContent>
          <Typography>
            Ôi không! Bạn sẽ bỏ lỡ rất nhiều điều khi đăng nhập: Điểm thưởng
            Traveloka, Passenger Quick Pick, Thông báo giá vé, và những quyền
            lợi khác chỉ dành cho thành viên. Bạn có chắc vẫn muốn đăng xuất?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutClick} color='default' size='large'>
            Có
          </Button>
          <Button onClick={toggleDialog} variant='contained' color='primary'>
            Không
          </Button>
        </DialogActions>
      </Dialog>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Grid container direction='column' className={classes.accountPopOver}>
          <Grid item>
            <Typography variant='h6'>Tài khoản</Typography>
          </Grid>
          <Grid item>
            <Button onClick={() => history.push('/profile')}>
              <FontAwesomeIcon
                color='#177ad0'
                icon={faUser}
                className={classes.buttonAccountData}
              />
              Chỉnh sửa hồ sơ
            </Button>
          </Grid>
          <Grid item>
            <Button size='small' onClick={toggleDialog}>
              <FontAwesomeIcon
                color='#177ad0'
                icon={faPowerOff}
                className={classes.buttonAccountData}
              />
              Đăng xuất
            </Button>
          </Grid>
        </Grid>
      </Popover>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.isAuthenticated,
    lastName: state.user.lastName,
    firstName: state.user.firstName,
  };
}

const mapDispatchToProps = {
  logout: userActions.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
