import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import CardView from '../../../commons/CardView';
import AnonymousHome from '../../unauthenticated/home/Home';
import { BASE_API_URL } from '../../../../constants';
import { toast } from 'react-toastify';

const useStyles = makeStyles({
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'url(https://positiveesolutions.com/images/background.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left top',
  },
});

function Home({ isAuthenticated }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState([0, 0, 0]);
  const dashboard = [
    {
      title: 'Users',
      subtitle: 'have registered',
      background: '#f4597a',
      path: '/users',
    },
    {
      title: 'Partners',
      subtitle: 'not activated',
      background: '#1976d2',
      path: '/partners',
    },
    {
      title: 'Reports',
      subtitle: 'revenue in',
      background: '#ec1e20',
      path: '/reports',
    },
  ];
  useEffect(() => {
    (async function () {
      setLoading(true);
      const getYear = new Date().getFullYear();
      try {
        const responseUser = await axios.get(`${BASE_API_URL}/auth/users`);
        const responsePartner = await axios.get(
          `${BASE_API_URL}/partners/admin`
        );
        setTotal([
          responseUser.data.length,
          responsePartner.data.partners.length,
          getYear,
        ]);
        setLoading(false);
      } catch (error) {
        console.log('error.message :>> ', error.message);
        toast.error(error.message);
      }
    })();
  }, []);
  dashboard.map((item, index) => (item.value = total[index]));
  return (
    <>
      {isAuthenticated ? (
        <Box component='div' className={classes.container}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Container maxWidth='md'>
              <Grid container>
                {dashboard.map((value, index) => {
                  return (
                    <Grid item xs={4} key={index}>
                      <CardView
                        title={value.title}
                        subtitle={value.subtitle}
                        background={value.background}
                        path={value.path}
                        value={value.value}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Container>
          )}
        </Box>
      ) : (
        <AnonymousHome />
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
