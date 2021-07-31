import React from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import feature1 from '../../../assets/images/features/feature_5.svg';
import feature2 from '../../../assets/images/features/feature_6.svg';
import feature3 from '../../../assets/images/features/feature_7.svg';
import feature4 from '../../../assets/images/features/feature_8.svg';

function Feature(props) {
  return (
    <Grid item xs={6} container>
      <Grid item>
        <Box component='img' src={props.image} width='100%' height='100px' />
      </Grid>
      <Grid item>
        <Typography variant='h6'>{props.title}</Typography>
        <Typography>{props.para}</Typography>
        <Typography>
          <NavLink to='#' style={{ color: 'white' }}>
            Tìm hiểu thêm
          </NavLink>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default function RegistrationFeatures() {
  return (
    <Grid item xs={8} container spacing={2}>
      <Feature
        image={feature1}
        title='Nhận thưởng cho mỗi đặt chỗ'
        para='Tích điểm cho mỗi đặt vé máy bay và phòng khách sạn. Quy đổi để du lịch tiết kiệm hơn!'
      />
      <Feature
        image={feature2}
        title='Tiện lợi ngay cả sau khi đặt chỗ'
        para='Xem vé điện tử và phiếu thanh toán khi không có kết nối
                mạng. Hoàn tiền hoặc đổi lịch dễ dàng khi bạn phải thay
                đổi kế hoạch'
      />
      <Feature
        image={feature3}
        title='Thanh toán không cần thẻ với travelokaPay'
        para='Lưu thông tin thẻ trong My Cards để thanh toán an toàn và
                thuận tiện cho lần sau.'
      />
      <Feature
        image={feature4}
        title='Trải nghiệm đặt chỗ suôn sẻ'
        para='Tính năng Thông báo giá giúp bạn dễ dàng đặt vé vào thời
                điểm thích hợp nhất. Điền thông tin hành khách trong nháy
                mắt với Passenger Quick Pick.'
      />
    </Grid>
  );
}
