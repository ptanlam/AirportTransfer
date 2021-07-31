import React from 'react';
import { Divider, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import { AviationPartnerImageData } from './AviationPartnerImageData';
import { PartnerPaymentImageData } from './PartnerPaymentImageData';

const useStyles = makeStyles({
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default function FlightContent() {
  const classes = useStyles();
  return (
    <Grid item xs={12} container spacing={5} justify='center'>
      <Grid item xs={12} container>
        <Grid item xs={5}>
          <Typography variant='h6'>Đối tác hàng không</Typography>
          <Typography variant='body1' color='textSecondary'>
            Đối tác hàng không nội địa và quốc tế
          </Typography>
          <Typography variant='body1'>
            Những đối tác hàng không toàn cầu sẽ chắp cánh đưa bạn đến mọi địa
            điểm trên thế giới.
          </Typography>
        </Grid>
        <Grid item xs={7} container spacing={5}>
          {AviationPartnerImageData.map((val, index) => (
            <Grid item xs={3} key={index}>
              <Box component='div' className={classes.flex}>
                <Box component='img' src={val.image} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={5}>
          <Typography variant='h6'>Đối tác thanh toán</Typography>
          <Typography variant='body1'>
            Những đối tác thanh toán đáng tin cậy của chúng tôi sẽ giúp cho bạn
            luôn an tâm thực hiện mọi giao dịch một cách thuận lợi nhất!
          </Typography>
        </Grid>
        <Grid item xs={7} container spacing={5}>
          {PartnerPaymentImageData.map((val, index) => (
            <Grid item xs={3} key={index}>
              <Box component='div' className={classes.flex}>
                <Box component='img' src={val.image} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={10} container spacing={5}>
        <Grid item xs={12} container justify='center'>
          <Typography variant='h5'>
            Tại sao nên đặt vé máy bay & phòng khách sạn tại Traveloka?
          </Typography>
        </Grid>
        <Grid item xs={12} container justify='center'>
          <Grid item xs={3}>
            <Box
              component='img'
              src='https://ik.imagekit.io/tvlk/image/imageResource/2017/05/17/1495008633454-096d11a8cc4cbd60e1143f974757ef1a.png?tr=q-75'
            />
          </Grid>
          <Grid item xs={8} container>
            <Grid item xs={12}>
              <Typography variant='h6'>Kết quả tìm kiếm bao quát</Typography>
              <Typography variant='body1'>
                Chỉ với một cú nhấp chuột, dễ dàng so sánh các chuyến bay của
                Vietnam Airlines, Jetstar, Vietjet và các chặng bay quốc tế khác
                với 100.000 đường bay ở châu Á Thái Bình Dương và châu Âu.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} container justify='center'>
          <Grid item xs={8}>
            <Typography variant='h6'>Kết quả tìm kiếm bao quát</Typography>
            <Typography variant='body1'>
              Chỉ với một cú nhấp chuột, dễ dàng so sánh các chuyến bay của
              Vietnam Airlines, Jetstar, Vietjet và các chặng bay quốc tế khác
              với 100.000 đường bay ở châu Á Thái Bình Dương và châu Âu.
            </Typography>
          </Grid>
          <Grid item xs={3} container>
            <Grid item xs={12}>
              <Box
                component='img'
                src='https://ik.imagekit.io/tvlk/image/imageResource/2017/05/10/1494412638469-cb1624ec1f89097e71b0b4a1f542e851.png?tr=q-75'
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={11} container spacing={2}>
        <Grid item xs={12} container justify='center'>
          <Typography variant='h5'>
            Tại sao nên đặt vé máy bay với Traveloka?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>
            Thoả sức vi vu cùng Traveloka - Giải pháp đặt vé máy bay trực tuyến
            trọn gói
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1'>
            Traveloka là công ty du lịch trực tuyến, cung cấp nền tảng đặt vé
            máy bay và phòng khách sạn hàng đầu Đông Nam Á. Kể từ khi ra mắt tại
            Indonesia vào năm 2012 đến nay, Traveloka đã phát triển đến năm quốc
            gia khác trong khu vực, và được hơn 40 triệu tín đồ du lịch tin
            dùng. Riêng với dịch vụ đặt vé máy bay trực tuyến, Traveloka đã là
            đối tác của hơn 100 hãng hàng không nội địa và quốc tế, phục vụ hơn
            200.000 đường bay trên toàn thế giới. Nhờ mạng lưới rộng khắp của
            mình, Traveloka trở thành giải pháp đặt vé máy bay trọn gói. Trong
            hơn sáu năm hoạt động, Traveloka đã không ngừng phát triển lớn mạnh
            để trở thành tên tuổi hàng đầu trong thị trường đặt vé máy bay trực
            tuyến, cũng như nhiều dịch vụ du lịch khác. Mục tiêu của Traveloka
            không chỉ là vé máy bay giá rẻ mà còn là một nền tảng thân thiện với
            người dùng, thao tác đơn giản, đặt chỗ nhanh chóng chỉ trong chưa
            đầy một phút.
          </Typography>
        </Grid>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={6}>
            <Box
              component='img'
              src='https://res.cloudinary.com/webspeedtest/image/upload/c_limit,dpr_1,f_webp,fl_awebp,h_253,q_auto,w_380/v1555553318/ieokykuijyn6p5rmkigu.webp'
              alt='content'
              width='100%'
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body1'>
              Traveloka mang đến sự đa dạng về các hãng hàng không trong nước
              lẫn quốc tế. Với các chặng bay nội địa, vé máy bay Vietnam
              Airlines, vé máy bay VietJet Air và vé máy bay Bamboo Airways vẫn
              là những cái tên được nhớ đến đầu tiên. Dù bạn muốn dừng chân tại
              các thành phố lớn như TP. HCM, Hà Nội, Đà Nẵng, hay những địa điểm
              du lịch nổi tiếng như Nha Trang, Phú Quốc, Đà Lạt… thì Traveloka
              cũng sẽ khiến bạn hài lòng với vô vàn sự lựa chọn về thời gian và
              địa điểm khởi hành. Song song đó là hàng chục đối tác hàng không
              quốc tế như Air Asia, Scoot, Nok Air,
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Singapore Airlines, Malaysia Airlines, Cathay Pacific, Cebu Pacific,
            Emirates, Lion Air, Qatar Airways, Thai Airways, Thai Smile, China
            Airlines, Etihad Airways, Eva Air, Hongkong Airlines, Korean Air,
            Japan Airlines, All Nippon Airways… Traveloka mong muốn được đồng
            hành cùng khách hàng đến khắp nơi, với những dịch vụ chất lượng và
            trải nghiệm tuyệt vời nhất.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>
            Với Traveloka, mua vé máy bay giá rẻ là chuyện trong tầm tay
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1'>
            Việc so sánh giữa nhiều hãng hàng không để săn được tấm vé máy bay
            giá rẻ nhất thật tốn thời gian và công sức? Các thủ tục đặt vé đôi
            khi quá rườm rà và phức tạp với bạn? Đừng lo lắng nữa bởi Traveloka
            sẽ giúp bạn quẳng mọi gánh lo ấy đi và dễ dàng sở hữu tấm vé máy bay
            cho hành trình mơ ước của mình.
          </Typography>
        </Grid>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={6}>
            <Typography variant='body1'>
              Sở hữu cơ sở dữ liệu khổng lồ, cùng thuật toán thông minh,
              Traveloka tổng hợp tất cả các chuyến bay và mức giá trên cùng một
              giao diện, góp phần rút ngắn thời gian tìm kiếm mà vẫn đảm bảo đầy
              đủ mọi thông tin cần thiết. Sau khi tìm kiếm chặng bay mong muốn,
              các kết quả sẽ được lọc theo nhu cầu ưu tiên, như đặt vé máy bay
              giá rẻ hoặc bay với hãng hàng không yêu thích. Không cần phải
              chuyển đổi giữa nhiều website riêng biệt, các tín đồ du lịch giờ
              đây chỉ cần tìm, đặt, và thanh toán là hoàn tất đặt chỗ.
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box
              component='img'
              src='https://ik.imagekit.io/tvlk/image/imageResource/2019/04/17/1555511257209-bacfad909e1972f035cb738f46e05eb1.png'
              alt='content'
              width='100%'
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1'>
            Với hơn 100 đối tác hàng không trên toàn thế giới, Traveloka sẵn
            sàng "vi vu" cùng bạn trên mọi điểm đến dù là trong nước hay quốc
            tế. Mỗi lượt tìm kiếm đều có vô vàn lựa chọn về thời gian bay, mức
            giá, hành trình và thời gian quá cảnh để bạn lựa chọn tùy thuộc vào
            lịch trình phù hợp nhất. Các tiện ích, dịch vụ đi kèm như hành lý
            cũng được hiển thị rõ ràng trong cùng một giao diện. Chỉ cần ngồi
            nhà đặt vé máy bay trực tuyến là bạn đã sẵn sàng lên đường mà chẳng
            cần phải lo toan nhiều.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1'>
            Không dừng lại ở đó, “công cuộc” săn vé máy bay giá rẻ trên
            Traveloka cũng đơn giản hơn bao giờ hết với ưu đãi hấp dẫn mỗi ngày.
            Mục Khuyến mãi luôn đầy ắp các chương trình ưu đãi để “nuông chiều”
            mọi hành trình của bạn. Kết hợp với chính sách giá minh bạch - mức
            giá hiển thị chính là mức giá cuối cùng bạn phải trả - mọi lo lắng
            về thuế, phí cao khi đặt vé máy bay không hề xuất hiện khi sử dụng
            Traveloka.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>
            Săn vé máy bay giá rẻ với vô vàn tiện ích ưu việt từ Traveloka
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1'>
            Tại Traveloka, trải nghiệm đặt vé máy bay trực tuyến của khách hàng
            luôn được quan tâm hàng đầu. Mọi tính năng mới, dịch vụ thuận tiện
            và cải tiến về công nghệ luôn hướng đến mục đích lớn nhất là sự hài
            lòng của người dùng.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1'>
            Tính năng Price Alert - Thông báo giá vé - sẽ giúp bạn dễ dàng tìm
            được mức giá tốt nhất cho hành trình mà mình đang tìm kiếm. Chỉ cần
            lựa chọn điểm đi, điểm đến, thời gian và cài đặt “thông báo giá vé”
            là bạn sẽ nhận được thông báo mỗi ngày về kết quả vé máy bay giá rẻ
            nhất, từ đó lựa chọn được chuyến đi phù hợp nhất về thời gian lẫn
            giá cả.
          </Typography>
        </Grid>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={6}>
            <Box
              component='img'
              src='https://res.cloudinary.com/webspeedtest/image/upload/c_limit,dpr_1,f_webp,fl_awebp,h_254,q_auto,w_380/v1555553318/ydlm6c70b5j42cqikkf6.webp'
              alt='content'
              width='100%'
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body1'>
              Thậm chí, nếu lịch trình có thay đổi đột xuất, Traveloka vẫn sẽ hỗ
              trợ tối đa với tính năng Easy Reschedule. Chẳng cần phải tự mình
              liên hệ thủ tục phức tạp, thay đổi chuyến bay giờ đây có thể thực
              hiện trực tiếp ngay tại tài khoản Traveloka. Mọi thông tin chi
              tiết về quy định đổi lịch bay của các hãng hàng không đều được
              Traveloka thông tin cụ thể. Chẳng hạn như vé máy bay VietJet và
              Bamboo Airways đều cho thay đổi lịch trình bay 6 tiếng trước giờ
              khởi hành. Riêng vé máy bay Vietnam Airlines chỉ hỗ trợ với một số
              đường bay nhất định.
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>
            Cùng Traveloka trải nghiệm mua vé máy bay tuyệt vời hơn mỗi ngày
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1'>
            Bạn muốn mua vé máy bay nhưng các bước đặt vé trực tuyến lại quá
            phức tạp? Bạn chẳng biết làm sao để đặt vé máy bay giá rẻ nhất giữa
            hàng trăm lựa chọn hiển thị? Bạn không xác định được mức giá hiển
            thị có phải là mức giá cuối cùng phải trả hay còn nhiều chi phí ẩn
            khác nữa? Traveloka chính là nền tảng đặt vé máy bay trực tuyến sẽ
            thổi bay mọi khó khăn ấy.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1'>
            Với hơn 100 đối tác hàng không trên toàn thế giới, Traveloka sẽ
            khiến trải nghiệm mua vé máy bay trở nên đơn giản hơn bao giờ hết.
            Tại Việt Nam, Traveloka là đối tác của những hãng bay hàng đầu như
            Vietnam Airlines, VietJet Air và Bamboo Airways, góp phần vào việc
            mang đến những lựa chọn hành trình đa dạng và thuận tiện nhất cho
            khách hàng.
          </Typography>
        </Grid>
        <Grid item xs={12} container spacing={1}>
          <Grid item xs={4}>
            <Box
              component='img'
              src='https://res.cloudinary.com/webspeedtest/image/upload/c_limit,dpr_1,f_webp,fl_awebp,h_177,q_auto,w_315/v1555553318/ew5yx5cwkc6ejxjdrgjr.webp'
              alt='content'
              width='100%'
              height='auto'
            />
            <Typography variant='body1'>
              Thuộc Liên minh hàng không toàn cầu SkyTeam, Vietnam Airlines là
              hãng hàng không quốc gia với mạng lưới hơn 1000 điểm đến trên toàn
              thế giới. Với chất lượng 4 sao và đội ngũ nhân viên chuyên nghiệp,
              Vietnam Airlines luôn mang đến những trải nghiệm thoải mái nhất.
              Các chương trình khuyến mãi thường xuyên trong năm mang đến nhiều
              vé máy bay Vietnam Airlines giá rẻ nhất
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Box
              component='img'
              src='https://res.cloudinary.com/webspeedtest/image/upload/c_limit,dpr_1,f_webp,fl_awebp,h_177,q_auto,w_315/v1555553318/on95sukq8gc37ttkbzlk.webp'
              alt='content'
              width='100%'
              height='auto'
            />
            <Typography variant='body1'>
              Nhắc đến vé máy bay VietJet, giá rẻ luôn là điều được nghĩ đến đầu
              tiên. Với khẩu hiệu Bay là thích ngay, VietJet đang ngày một mở
              rộng mạng lưới của mình với các chuyến bay nội địa cùng hơn 30
              điểm đến quốc tế trong khu vực. Song song với đó là các chương
              trình mở bán vé máy bay VietJet khuyến mãi, mang đến những chuyến
              du lịch vừa thuận tiện lại vừa tiết kiệm.
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Box
              component='img'
              src='https://cntres-assets-ap-southeast-1-250226768838-cf675839782fd369.s3.amazonaws.com/imageResource/2020/09/29/1601383783009-3fbfd241ae451ffacd745efaab78770e.jpeg'
              alt='content'
              width='100%'
              height='auto'
            />
            <Typography variant='body1'>
              Bamboo Airways là hãng hàng không giá rẻ có trụ sở tại Việt Nam và
              là thành viên của Tập đoàn FLC. Hiện hãng đang khai thác các chặng
              bay nội địa đến các thành phố lớn, các điểm du lịch tại Việt Nam
              và các chặng bay quốc tế đến các thành phố lớn ở Châu Á, Châu Âu
              và Bắc Mỹ. Hành khách có thể đặt vé máy bay Bamboo Airways giá rẻ
              và trải nghiệm chuyến bay chất lượng 5 sao ngay hôm nay.
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1'>
            Bên cạnh sự đa dạng lựa chọn và mức giá tốt, ưu tiên cao nhất trong
            mọi hoạt động của Traveloka chính là một hệ thống toàn diện trên cả
            máy tính và ứng dụng, mang đến sự đơn giản, thuận tiện nhất cho mọi
            người dùng. Dù bạn đang có nhu cầu tìm kiếm giờ bay phù hợp cho
            chuyến công tác gấp hay săn vé máy bay giá rẻ cho hành trình vi vu
            sắp đến thì Traveloka cũng sẵn sàng đồng hành cùng bạn với những
            trải nghiệm tuyệt vời không ngừng được cải thiện mỗi ngày.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1'>
            Cơ sở dữ liệu đồ sộ cùng thuật toán tinh vi của Traveloka sẽ cho kết
            quả tìm kiếm nhanh, đầy đủ và chính xác nhất. Thiết kế thân thiện
            với người dùng cho phép bạn theo dõi mọi thông tin về hành trình của
            mình trên cùng một giao diện. Chẳng còn phải lưu thông tin trong
            email, bộ nhớ điện thoại, hay in ra nhiều giấy tờ rắc rối; thứ duy
            nhất bạn cần chính là ứng dụng Traveloka để thỏa thích vi vu trên
            mọi hành trình.
          </Typography>
        </Grid>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={6}>
            <Box
              component='img'
              src='https://res.cloudinary.com/webspeedtest/image/upload/c_limit,dpr_1,f_webp,fl_awebp,h_253,q_auto,w_380/v1555553318/y74ut0yumm0yvoycib92.webp'
              alt='content'
              width='100%'
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body1'>
              Traveloka hỗ trợ 5 hình thức thanh toán đa dạng: thẻ thanh toán
              quốc tế, ATM nội địa, chuyển khoản, thanh toán tại bưu điện và hệ
              thống cửa hàng tiện lợi liên kết với Payoo. Với những giao dịch
              trực tuyến, tính năng TravelokaPay cho phép rút ngắn thời gian
              điền thông tin thẻ mỗi lần thanh toán, chỉ cần chạm là mọi thao
              tác đã hoàn tất. Và bạn cũng chẳng cần lo lắng khi thanh toán
              online với Traveloka, bởi giao dịch sẽ được bảo mật nhờ công nghệ
              RapidSSL ủy quyền, hoàn toàn an toàn và riêng tư.
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1'>
            Ngoài ra, để trải nghiệm du lịch của bạn thêm thú vị, bạn còn có thể
            đặt vé tham quan du lịch và tour giá rẻ, nhiều khuyến mãi với
            Traveloka Xperience.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1'>
            Nếu bạn có bất kỳ thắc mắc nào trong quá trình sử dụng thì cũng đừng
            lo lắng, dịch vụ Hỗ trợ khách hàng 24/7 của Traveloka luôn sẵn sàng
            để giải đáp thắc mắc. Bạn có thể liên hệ qua hotline 1900-6978, chat
            trực tuyến hoặc gửi email về cs@traveloka.com để được hỗ trợ kịp
            thời. Với Traveloka, việc đặt vé máy bay giá rẻ giờ chỉ còn là
            chuyện trong tầm tay.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
