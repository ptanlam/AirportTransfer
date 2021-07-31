import {
  faAward,
  faPaperPlane,
  faHotel,
  faSynagogue,
  faParking,
  faCarAlt,
  faSubway,
} from '@fortawesome/free-solid-svg-icons';

export const SubNavBarData = [
  {
    iconId: 1,
    icon: faPaperPlane,
    iconText: 'Vé máy bay',
    path: '/flight',
  },
  {
    iconId: 2,
    icon: faHotel,
    iconText: 'Khách sạn',
    path: '/',
  },
  {
    iconId: 3,
    icon: faSynagogue,
    iconText: 'Combo tiết kiệm',
    path: '',
  },
  {
    iconId: 4,
    icon: faParking,
    iconText: 'Đưa đón sân bay',
    path: '/airport-transfer',
  },
  {
    iconId: 5,
    icon: faAward,
    iconText: 'Xperience',
    path: '',
  },
  {
    iconId: 6,
    icon: faCarAlt,
    iconText: 'Cho thuê xe',
    path: '',
  },
  {
    iconId: 7,
    icon: faSubway,
    iconText: 'JR Pass',
    path: '',
  },
];
