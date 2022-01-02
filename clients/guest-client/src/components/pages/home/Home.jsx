import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import background from '../../../assets/images/background_home.png';


const useStyles = makeStyles({
  flex: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100vh',
  },
});

function Home({ loading }) {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>
          Traveloka - Ứng dụng đặt phòng khách sạn, vé máy bay và du lịch tự
          túc, tham quan & giải trí giá rẻ (Xperience). Rẻ hơn đến 500k mỗi
          ngày. Giá sao trả vậy, không phí ẩn, không thuế ẩn.
        </title>
      </Helmet>
      {/* ========== Main ========== */}
      {loading ? (
        <Box component='div' className={classes.flex}>
          <CircularProgress color='secondary' />
        </Box>
      ) : (
        <>
          <Box component='img' src={background} className={classes.image} />
        </>
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
