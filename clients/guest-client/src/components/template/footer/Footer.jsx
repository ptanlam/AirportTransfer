import React from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import logoFooter from '../../../assets/images/traveloka_footer_logo.png';
import vrf1 from '../../../assets/images/verfied/vrf_1.svg';
import vrf2 from '../../../assets/images/verfied/vrf_2.svg';
import vrf3 from '../../../assets/images/verfied/vrf_3.svg';
import vrf4 from '../../../assets/images/verfied/vrf_4.png';

const useStyles = makeStyles({
  background: {
    backgroundColor: '#1b1b1b',
    padding: 50,
  },
  margin: {
    marginRight: 10,
  },
  color: {
    color: 'white',
  },
  btnCoop: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #fff',
    borderRadius: 10,
    padding: 12,
  },
});

export default function Footer() {
  const classes = useStyles();
  return (
    <Box component='div' className={classes.background}>
      <Container>
        <Grid container spacing={5}>
          <Grid item xs={3} container spacing={3}>
            <Grid item container spacing={2}>
              {/* ========== Logo ==========*/}
              <Grid item>
                <Box component={NavLink} to='/'>
                  <Box component='img' src={logoFooter} width='200px' />
                </Box>
              </Grid>
              <Grid item container direction='column' spacing={3}>
                <Grid item xs container>
                  <Box component='img' src={vrf1} className={classes.margin} />
                  <Box component='img' src={vrf2} className={classes.margin} />
                  <Box component='img' src={vrf3} className={classes.margin} />
                </Grid>
                <Grid item xs>
                  <Box component='img' src={vrf4} className={classes.margin} />
                  <Box component='img' src={vrf4} className={classes.margin} />
                </Grid>
              </Grid>
            </Grid>
            {/* ========== Cooperation ==========*/}
            <Grid item>
              <Box
                component={NavLink}
                className={classnames(classes.color, classes.btnCoop)}
                to='/register'
              >
                <FontAwesomeIcon
                  icon={faHandshake}
                  style={{ fontSize: 30, marginRight: 10 }}
                />
                <Typography>H???p t??c v???i Traveloka</Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={8} container className={classes.color}>
            <Grid item container>
              {/* ========== Col 1 ==========*/}
              <Grid item xs={5} container spacing={5}>
                <Grid item>
                  <Typography variant='h5'>V??? traveloka</Typography>
                  <Typography>
                    <NavLink to=''>C??ch ?????t ch???</NavLink>
                  </Typography>
                  <Typography>
                    <NavLink to=''>Li??n h??? ch??ng t??i</NavLink>
                  </Typography>
                  <Typography>
                    <NavLink to=''>Tr??? gi??p</NavLink>
                  </Typography>
                  <Typography>
                    <NavLink to=''>Tuy???n d???ng</NavLink>
                  </Typography>
                  <Typography>
                    <NavLink to=''>V??? ch??ng t??i</NavLink>
                  </Typography>
                </Grid>
                {/*  Social Media */}
                <Grid item>
                  <Typography variant='h5'>Theo d??i ch??ng t??i tr??n</Typography>
                  <Typography>
                    <NavLink to=''>Twitter</NavLink>
                  </Typography>
                  <Typography>
                    <NavLink to=''>Facebook</NavLink>
                  </Typography>
                  <Typography>
                    <NavLink to=''>Instagram</NavLink>
                  </Typography>
                  <Typography>
                    <NavLink to=''>Youtube</NavLink>
                  </Typography>
                </Grid>
              </Grid>
              {/* ========== Col 2 ==========*/}
              <Grid item xs={4}>
                <Typography variant='h5'>S???n ph???m</Typography>
                <Typography>
                  <NavLink to=''>V?? m??y bay</NavLink>
                </Typography>
                <Typography>
                  <NavLink to=''>Kh??ch s???n</NavLink>
                </Typography>
                <Typography>
                  <NavLink to=''>Combo ti???t ki???m</NavLink>
                </Typography>
                <Typography>
                  <NavLink to=''>Xperience</NavLink>
                </Typography>
                <Typography>
                  <NavLink to=''>????a ????n s??n bay</NavLink>
                </Typography>
                <Typography>
                  <NavLink to=''>Bi???t th???</NavLink>
                </Typography>
                <Typography>
                  <NavLink to=''>C??n h???</NavLink>
                </Typography>
                <Typography>
                  <NavLink to=''>Car Rental</NavLink>
                </Typography>
                <Typography>
                  <NavLink to=''>JR Pass</NavLink>
                </Typography>
              </Grid>
              {/* ========== Col 3 ==========*/}
              <Grid item xs={3}>
                <Typography variant='h5'>Kh??c</Typography>
                <Typography>
                  <NavLink to=''>Traveloka Aifiliate</NavLink>
                </Typography>
                <Typography>
                  <NavLink to=''>Traveloka Blog</NavLink>
                </Typography>
                <Typography>
                  <NavLink to=''>Ch??nh s??ch quy???n ri??ng t??</NavLink>
                </Typography>
                <Typography>
                  <NavLink to=''>??i???u kho???n & ??i???u ki???n</NavLink>
                </Typography>
                <Typography>
                  <NavLink to=''>Quy ch??? ho???t ?????ng</NavLink>
                </Typography>
                <Typography>
                  <NavLink to=''>????ng k?? n??i ngh??? c???a b???n</NavLink>
                </Typography>
                <Typography>
                  <NavLink to=''>
                    ????ng k?? doanh nghi???p ho???t ?????ng du l???ch c???a b???n
                  </NavLink>
                </Typography>
                <Typography>
                  <NavLink to=''>Khu v???c b??o ch??</NavLink>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
