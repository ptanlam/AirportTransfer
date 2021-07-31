import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import PartnersManagement from './PartnersManagement';
import LoadingIndicator from '../../../commons/LoadingIndicator';
import { toast } from 'react-toastify';
import checking from '../../../../assets/done_checking.png';
import { BASE_API_URL } from '../../../../constants';

const useStyles = makeStyles({
  flex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
  },
  box: {
    overflow: 'hidden',
    height: 'auto',
    paddingTop: 100,
  },
  image: {
    height: '50vh',
  },
});

export default function PartnersList() {
  const classes = useStyles();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpdatePartnersList = (indexPartnerId) => {
    setPartners([
      ...partners.slice(0, indexPartnerId),
      ...partners.slice(indexPartnerId + 1),
    ]);
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    let unmounted = false;
    async function fetchUnactivePartners() {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_API_URL}/partners/admin`, {
          cancelToken: source.token,
        });
        if (!unmounted) {
          setPartners([...response.data.partners]);
        }
      } catch (error) {
        if (!unmounted) {
          toast.error(error.response.data.message);
        }
      } finally {
        if (!unmounted) {
          setLoading(false);
        }
      }
    }

    fetchUnactivePartners();

    return () => {
      unmounted = true;
      source.cancel();
    };
  }, []);

  return (
    <Box component='div' className={classes.box}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          {partners.length === 0 ? (
            <Box component='div' className={classes.flex}>
              <Box component='img' src={checking} className={classes.image} />
              <Typography variant='h5'>You have already checked</Typography>
            </Box>
          ) : (
            <Container maxWidth='md'>
              <Grid container spacing={2}>
                {partners.map((value, index) => {
                  return (
                    <Grid item container direction='column' key={index}>
                      <PartnersManagement
                        partners={partners}
                        partnerId={value.id}
                        name={value.name}
                        email={value.email}
                        hotline={value.hotline}
                        transportType={value.transportType}
                        logoUrl={value.logoUrl}
                        handleUpdatePartnersList={handleUpdatePartnersList}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Container>
          )}
        </>
      )}
    </Box>
  );
}
