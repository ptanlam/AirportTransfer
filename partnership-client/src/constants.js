import {
  Apartment,
  Assessment,
  Assignment,
  Commute,
  EmojiTransportationTwoTone,
  Flight,
  FlightTakeoff,
} from "@material-ui/icons";
import AirlineSeatReclineNormalIcon from "@material-ui/icons/AirlineSeatReclineNormal";
import ClassIcon from "@material-ui/icons/Class";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import PolicyIcon from "@material-ui/icons/Policy";
import axios from "axios";

axios.defaults.withCredentials = true;

export const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
export const VOUCHER_API_URL = process.env.REACT_APP_VOUCHER_API_URL;

export const anonymousNavItems = [
  {
    name: "Airport Transfer",
    link: "airport-transfer",
    icon: <FlightTakeoff fontSize="small" style={{ color: "white" }} />,
  },
  {
    name: "Flights",
    link: "flights",
    icon: <Flight style={{ color: "white" }} />,
  },
];

export const authenticatedAirportTransferNavItems = [
  {
    name: "Company Profile",
    link: "company",
    icon: (
      <EmojiTransportationTwoTone fontSize="small" style={{ color: "white" }} />
    ),
  },
  {
    name: "Classes",
    link: "classes",
    icon: <ClassIcon fontSize="small" style={{ color: "white" }} />,
  },
  {
    name: "Policies",
    link: "policies",
    icon: <PolicyIcon fontSize="small" style={{ color: "white" }} />,
  },
  {
    name: "Vehicles",
    link: "vehicles",
    icon: <Commute fontSize="small" style={{ color: "white" }} />,
  },
  {
    name: "Schedules",
    link: "schedules",
    icon: <Assignment fontSize="small" style={{ color: "white" }} />,
  },
  {
    name: "Vouchers",
    link: "vouchers",
    icon: (
      <ConfirmationNumberIcon fontSize="small" style={{ color: "white" }} />
    ),
  },
  {
    name: "Reports",
    link: "reports",
    icon: <Assessment style={{ color: "white" }} />,
  },
];

export const authenticatedAirlineNavItems = [
  {
    name: "Company Profile",
    link: "company",
    icon: <Apartment fontSize="small" style={{ color: "white" }} />,
  },
  {
    name: "Planes",
    link: "vehicles",
    icon: <Flight fontSize="small" style={{ color: "white" }} />,
  },
  {
    name: "Tickets",
    link: "tickets",
    icon: (
      <ConfirmationNumberIcon fontSize="small" style={{ color: "white" }} />
    ),
  },
  {
    name: "Seat classes",
    link: "classes",
    icon: (
      <AirlineSeatReclineNormalIcon
        fontSize="small"
        style={{ color: "white" }}
      />
    ),
  },
  {
    name: "Policies",
    link: "policies",
    icon: <PolicyIcon fontSize="small" style={{ color: "white" }} />,
  },
  {
    name: "Vouchers",
    link: "vouchers",
    icon: (
      <ConfirmationNumberIcon fontSize="small" style={{ color: "white" }} />
    ),
  },
  {
    name: "Reports",
    link: "reports",
    icon: <Assessment style={{ color: "white" }} />,
  },
];

export const anonymousDrawerItems = [
  {
    name: "Airport Transfer",
    link: "airport-transfer",
    icon: <FlightTakeoff fontSize="small" style={{ color: "black" }} />,
  },
  {
    name: "Flights",
    link: "flights",
    icon: <Flight style={{ color: "black" }} />,
  },
];

export const authenticatedAirportTransferDrawerItems = [
  {
    name: "Company Profile",
    link: "company",
    icon: (
      <EmojiTransportationTwoTone fontSize="small" style={{ color: "black" }} />
    ),
  },
  {
    name: "Classes",
    link: "classes",
    icon: <ClassIcon fontSize="small" style={{ color: "black" }} />,
  },
  {
    name: "Policies",
    link: "policies",
    icon: <PolicyIcon fontSize="small" style={{ color: "black" }} />,
  },
  {
    name: "Vehicles",
    link: "vehicles",
    icon: <Commute fontSize="small" style={{ color: "black" }} />,
  },
  {
    name: "Schedules",
    link: "schedules",
    icon: <Assignment fontSize="small" style={{ color: "black" }} />,
  },
  {
    name: "Vouchers",
    link: "vouchers",
    icon: (
      <ConfirmationNumberIcon fontSize="small" style={{ color: "black" }} />
    ),
  },
  {
    name: "Reports",
    link: "reports",
    icon: <Assessment style={{ color: "black" }} />,
  },
];

export const authenticatedAirlineDrawerItems = [
  {
    name: "Company Profile",
    link: "company",
    icon: <Apartment fontSize="small" style={{ color: "black" }} />,
  },
  {
    name: "Planes",
    link: "vehicles",
    icon: <Flight fontSize="small" style={{ color: "black" }} />,
  },
  {
    name: "Tickets",
    link: "tickets",
    icon: (
      <ConfirmationNumberIcon fontSize="small" style={{ color: "black" }} />
    ),
  },
  {
    name: "Seat classes",
    link: "classes",
    icon: (
      <AirlineSeatReclineNormalIcon
        fontSize="small"
        style={{ color: "black" }}
      />
    ),
  },
  {
    name: "Policies",
    link: "policies",
    icon: <PolicyIcon fontSize="small" style={{ color: "black" }} />,
  },
  {
    name: "Vouchers",
    link: "vouchers",
    icon: (
      <ConfirmationNumberIcon fontSize="small" style={{ color: "black" }} />
    ),
  },
  {
    name: "Reports",
    link: "reports",
    icon: <Assessment style={{ color: "black" }} />,
  },
];
