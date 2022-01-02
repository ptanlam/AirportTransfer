import React from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { NavLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core';
import logo from '../../../assets/images/traveloka_logo.png';
import DrawerNavigation from '../header/top/drawer/DrawerNavigation';
import NavBar from './top/navbar/NavBar';
import SubNavBar from './subnavbar/SubNavBar';

const useStyles = makeStyles((theme) => ({
  logo: {
    [theme.breakpoints.down('xs')]: {
      width: 100,
    },
    width: 140,
  },
}));

// Scrolling
function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function Header(props) {
  const classes = useStyles();
  return (
    <Box component='div' position='sticky' zIndex={1000}>
      <ElevationScroll {...props}>
        <AppBar color='default'>
          <Toolbar>
            <Container>
              <Grid container spacing={2}>
                <Grid item xs={5} md={3} lg={3} container spacing={1}>
                  {/* ========== Drawer Navigation ========== */}
                  <Grid item xs={1} sm={2} md={3} container>
                    <DrawerNavigation />
                  </Grid>
                  {/* ========== Logo ========== */}
                  <Grid item xs={3} container alignItems='center'>
                    <NavLink to='/'>
                      <Box
                        component='img'
                        src={logo}
                        className={classes.logo}
                      />
                    </NavLink>
                  </Grid>
                </Grid>
                {/* ========== Navbar ========== */}
                <NavBar />
              </Grid>
            </Container>
          </Toolbar>
          <SubNavBar />
        </AppBar>
      </ElevationScroll>
    </Box>
  );
}
