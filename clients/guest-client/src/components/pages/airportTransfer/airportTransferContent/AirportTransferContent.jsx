import React, { useState } from 'react';
import { Divider, makeStyles } from '@material-ui/core';
import { Grid, Container, Typography, Box } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { AirportPartnerImageData } from './AirportPartnerImageData';
import { AirportTransferBookingStepData } from './AirportTransferBookingStepData';

const useStyles = makeStyles((theme) => ({
  flex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 170,
    marginBottom: 30,
  },
  margin: {
    marginBottom: 10,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === 0 && (
        <Grid container>
          <Grid item xs={12}>
            <Box component='div' mt={3} mb={3}>
              <Typography variant='h5' p={3}>
                Di chuyển từ sân bay
              </Typography>
            </Box>
            <Box component='div' mb={2}>
              <Typography variant='body1' p={3}>
                Tìm xe ở sân bay có thể không dễ dàng, nhất là khi bạn đang ở
                một nơi xa lạ. Có phải chăng ngay khi vừa bước ra khỏi cửa đến
                sân bay, bạn thấy mình ngay lập tức bị bao quanh bởi đội quân
                taxi dù đông đảo, trong khi hàng người đợi taxi sân bay chính
                hãng thì dài không điểm dừng?
              </Typography>
            </Box>
            <Box component='div' mb={2}>
              <Typography variant='body1' p={3}>
                Với Traveloka, giờ đây bạn có thể đặt trước xe đưa đón sân bay.
                Từ xe riêng đến phương tiện công cộng, bạn sẽ dễ dàng chọn được
                chuyến đi phù hợp với nhu cầu và thoải mái nhất sau chuyến bay.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default function AirportTransferContent() {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container maxWidth='md'>
      <Box component='div' className={classes.flex}>
        <Box component='div' className={classes.margin}>
          <Grid container>
            <Grid item xs />
            <Grid item xs={7}>
              <Typography
                variant='h6'
                style={{ textAlign: 'center', padding: 10 }}
              >
                Tại sao tôi nên đặt xe đưa đón sân bay qua Traveloka?
              </Typography>
            </Grid>
            <Grid item xs />
          </Grid>
          <Grid container>
            <Grid item xs={4}>
              <Box style={{ textAlign: 'center' }}>
                <CardContent>
                  <img
                    src='https://ik.imagekit.io/tvlk/image/imageResource/2020/10/13/1602575545560-6dae87c0db3aee2120066d7e66628677.png'
                    alt='Phu hop voi nhu cau'
                    style={{ width: 100, height: 100 }}
                  />
                </CardContent>
                <CardContent>
                  <Typography variant='h6' component='span'>
                    Phù hợp với nhu cầu
                  </Typography>
                  <Typography variant='body2' component='p'>
                    Với nhiều lựa chọn từ xe riêng đến xe buýt sân bay, bạn có
                    thể dễ dàng tìm lựa chọn phương tiện đến sân bay phù hợp
                    nhất.
                  </Typography>
                </CardContent>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box style={{ textAlign: 'center' }}>
                <CardContent>
                  <img
                    src='https://ik.imagekit.io/tvlk/image/imageResource/2020/10/13/1602575548755-6be702e660aba5dadc0db5079b7cac20.png'
                    alt='Khong can lo lang'
                    style={{ width: 100, height: 100 }}
                  />
                </CardContent>
                <CardContent>
                  <Typography variant='h6' component='h6'>
                    Không cần lo lắng
                  </Typography>
                  <Typography variant='body2' component='p'>
                    Đặt trước để không phải xếp hàng tại sân bay. Giá cuối cùng
                    đã bao gồm phí cầu đường và đậu xe, bạn không cần phải lo
                    lắng phải trả thêm phí.
                  </Typography>
                </CardContent>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box style={{ textAlign: 'center' }}>
                <CardContent>
                  <img
                    src='https://ik.imagekit.io/tvlk/image/imageResource/2020/10/13/1602575551840-c0690511d837b645c85558300fe07dbe.png'
                    alt='Doi tac tot nhat'
                    style={{ width: 100, height: 100 }}
                  />
                </CardContent>
                <CardContent>
                  <Typography variant='h6' component='h6'>
                    Đối tác tốt nhất
                  </Typography>
                  <Typography variant='body2' component='p'>
                    Sự thoải mái của bạn là ưu tiên của chúng tôi. Vì thế, chúng
                    tôi luôn chọn làm việc cùng những đối tác có nhiều kinh
                    nghiệm tốt nhất trên thị trường.
                  </Typography>
                </CardContent>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box component='div' className={classes.margin}>
          <Grid container spacing={5}>
            <Grid item xs={4}>
              <Typography variant='h6' component='p'>
                Đối tác xe đưa đón sân bay
              </Typography>
              <Typography variant='body1'>
                Chúng tôi hợp tác với các công ty vận tải hàng đầu trong và
                ngoài nước để mang đến cho bạn một chuyến đi thoải mái từ và đến
                sân bay.
              </Typography>
            </Grid>
            <Grid item xs={8} container spacing={1}>
              {AirportPartnerImageData.map((val, index) => (
                <Grid item xs={3} key={index}>
                  <Box component='img' src={val.image} alt={val.imageId} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
        <Box component='div' className={classes.margin}>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item xs={7}>
              <Typography
                variant='h6'
                style={{ textAlign: 'center', padding: 10 }}
              >
                Trải nghiệm chuyến đi suôn sẻ từ và đến sân bay!
              </Typography>
            </Grid>
            <Grid item xs></Grid>
          </Grid>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item xs={12}>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor='primary'
                textColor='primary'
                centered
              >
                <Tab label='Từ sân bay' />
                <Tab label='Đến sân bay' />
              </Tabs>
              <Divider />
              <TabPanel value={value} index={0} />
              <TabPanel value={value} index={1} />
            </Grid>
            <Grid item xs></Grid>
          </Grid>
        </Box>
        <Box component='div' className={classes.margin}>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item xs={7}>
              <Typography
                variant='h6'
                style={{ textAlign: 'center', padding: 10 }}
              >
                Cách đặt chỗ
              </Typography>
            </Grid>
            <Grid item xs></Grid>
            <Grid item xs={12}>
              {AirportTransferBookingStepData.map((val, index) => (
                <Box
                  key={index}
                  component='img'
                  src={val.step}
                  alt={index}
                  style={{ width: '100%' }}
                />
              ))}
            </Grid>
          </Grid>
        </Box>
        <Box component='div' className={classes.margin}>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item xs={8}>
              <Typography
                variant='h6'
                style={{ textAlign: 'center', padding: 10 }}
              >
                Di chuyển tiện lợi với dịch vụ Đưa đón sân bay của Traveloka
              </Typography>
            </Grid>
            <Grid item xs></Grid>
            <Grid item xs={12}>
              <Box component='div'>
                <Typography variant='body1' style={{ lineHeight: 2 }}>
                  Với tiềm năng lớn vẫn chưa được khai thác hết của du lịch Việt
                  Nam, bên cạnh các đại lý truyền thống, ngành OTA - Đại lý du
                  lịch trực tuyến ngày một phát triển với sự tham gia của nhiều
                  “ông lớn", trong đó có Traveloka. Nhận được sự yêu thích của
                  rất nhiều dân mê du lịch, Traveloka ngày một cố gắng hoàn
                  thiện những dịch vụ của mình nhằm đáp ứng mọi nhu cầu của
                  người dùng.
                  <br />
                  Traveloka chỉ chọn hợp tác với một số đối tác nhất định nhằm
                  mang lại trải nghiệm tốt nhất cho người dùng. Hiện nay, những
                  đối tác hàng đầu trong nước và quốc tế của Traveloka gồm có
                  Golden Bird, xe trung chuyển sân bay Big Bird, Conxxe, KLIA
                  Express, xe trung chuyển sân bay XTrans, xe trung chuyển sân
                  bay Jackal Holidays, và xe trung chuyển sân bay DAMRI. Đây là
                  những công ty chuyên nghiệp và có kinh nghiệm trong ngành dịch
                  vụ chuyên chở sân bay, gồm cả dịch vụ xe trung chuyển lớn và
                  xe riêng.
                  <br />
                  Cùng với các đối tác của mình, dịch vụ Đưa đón sân bay
                  Traveloka phục vụ những tuyến đường phổ biến, như sân bay quốc
                  tế Soekarno-Hatta International Airport – Bandung (khứ hồi),
                  sân bay Halim Perdanakusuma – Bekasi, sân bay quốc tế
                  Soekarno-Hatta – Gambir, và hơn thế nữa.
                  <br />
                  Không chỉ kết hợp với những đối tác hàng đầu, dịch vụ Đưa đón
                  sân bay của Traveloka còn mang lại nhiều lợi ích khác cho
                  người dùng. Khách có thể chọn nhiều loại xe với ưu điểm riêng,
                  từ xe buýt, xe trung chuyển, taxi đến xe riêng, trên
                  Traveloka.
                  <br />
                  Để giúp người dùng tìm được phương tiện đưa đón sân bay phù
                  hợp, Traveloka còn cung cấp thông tin đầy đủ của từng xe, bao
                  gồm giá và lịch trình. Bạn có thể dễ dàng tiếp cận thông tin
                  này bằng cách chạm tay trên điện thoại hoặc di chuột trên màn
                  hình máy tính. Bạn không cần tìm ở nơi đâu khác.
                  <br />
                  Thông qua xe đưa đón sân bay, Traveloka mang đến một chuyến đi
                  tiện lợi và khó quên đến/từ sân bay. Bạn không cần phải xếp
                  hàng tìm xe ở sân bay nữa. Chỉ cần trình phiếu thanh toán
                  Traveloka cho tài xế hoặc nhân viên và sẵn sàng lên đường.
                  <br />
                  Đối với hành khách đặt xe riêng, Traveloka đảm bảo có thời
                  gian chờ thêm trong trường hợp hoãn chuyến bay. Bạn chỉ cần
                  cung cấp số hiệu chuyến bay hợp lệ và tài xế sẽ đợi cho đến
                  khi chuyến bay hạ cánh.
                  <br />
                  Về giá, Traveloka đảm bảo giá đã bao gồm mọi chi phí. Hành
                  khách có thể trải nghiệm dịch vụ đưa đón sân bay mà không cần
                  phải trả thêm phí cầu đường và đậu xe trong chuyến đi.
                  <br />
                  Dịch vụ Đưa đón sân bay Traveloka sẽ mang lại sự tiện lợi và
                  thoải mái cho hành khách cho chuyến đi đến/từ sân bay. Không
                  còn phải lo lỡ chuyến bay hoặc hạ cánh muộn không tìm được xe
                  nữa. Bạn có thể dễ dàng đặt xe đưa đón sân bay mọi lúc mọi
                  nơi. Cùng Traveloka khám phá thế giới, và đặt một chuyến đi
                  đến sân bay không âu lo!
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
