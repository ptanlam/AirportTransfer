import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import * as yup from "yup";
import { BASE_API_URL } from "../../../../constants";
import partnerActions from "../../../../redux/actions/partnerActions";
import populatePartnerInformationForPost from "../../../../utils/populatePartnerInformationForPost";
import RegistrationForm from "./RegistrationForm";

const registrationPartnerSchema = yup.object().shape({
  // Presenter Information
  presenterFirstName: yup
    .string()
    .matches(
      /^(?=.{2,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/,
      "Your first name must be longer than 2 and lower than 40 characters!"
    ),
  presenterLastName: yup
    .string()
    .matches(
      /^(?=.{2,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/,
      "Your last name must be longer than 2 and lower than 40 characters!"
    ),
  presenterPhoneNumber: yup
    .string()
    .matches(
      /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
      "Your phone number must be longer than 10 and lower than " +
        "15 numeric characters!"
    )
    .test(
      "checkPhoneNumberExists",
      "Phone number exists!",
      async (phoneNumber) => {
        if (phoneNumber === "") return false;
        try {
          const response = await axios.get(
            `${BASE_API_URL}/auth/phoneNumbers/${phoneNumber}`
          );
          return !response.data.doesExist;
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    ),

  // Account Information
  email: yup
    .string()
    .email("Your email must be longer than 3 and lower than 320 characters!")
    .test("checkEmailExists", "Email exists!", async (email) => {
      if (email === "") return false;
      try {
        const response = await axios.get(
          `${BASE_API_URL}/auth/emails/${email}`
        );
        return !response.data.doesExist;
      } catch (error) {
        toast.error(error.response.data.message);
      }
    })
    .required("Email address is required!"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password contains at least 8 characters, 1 uppercase letter, " +
        "1 lowercase letter, 1 number and 1 special character!"
    ),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match!"),

  //Company Information
  companyName: yup
    .string()
    .matches(
      /^(?=.{3,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/,
      "Your last name must be longer than 3 and lower than 250 characters!"
    )
    .test("checkCompanyNameExists", "Company name exists!", async (name) => {
      if (name === "") return false;
      try {
        const response = await axios.get(
          `${BASE_API_URL}/partners/names/${name}`
        );
        return !response.data.doesExist;
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }),
  companyHotline: yup
    .string()
    .matches(
      /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
      "Your company's hotline must be longer than 10 " +
        "15 numeric characters!"
    )
    .test(
      "checkCompanyHotlineExists",
      "Company hotline exists!",
      async (hotline) => {
        if (hotline === "") return false;
        try {
          const response = await axios.get(
            `${BASE_API_URL}/partners/hotlines/${hotline}`
          );
          return !response.data.doesExist;
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    ),
  companyEmail: yup
    .string()
    .email(
      "Your company email must be longer than 3 and lower than 320 characters!"
    )
    .test("checkCompanyEmailExists", "Company email exists!", async (email) => {
      if (email === "") return false;
      try {
        const response = await axios.get(
          `${BASE_API_URL}/partners/emails/${email}`
        );
        return !response.data.doesExist;
      } catch (error) {
        toast.error(error.response.data.message);
      }
    })
    .required("Email address is required!"),
  transportType: yup.string().required("Transport type is required!"),
});

function RegistrationFormManagement({ isAuthenticated, postPartner, loading }) {
  const history = useHistory();
  const initialTransportType =
    useHistory().location.search.split("=")[1] || "buses";

  const [logoFile, setLogoFile] = useState();
  const [responseErrors, setResponseErrors] = useState({});
  const [transportType, setTransportType] = useState(initialTransportType);
  const [dialog, setDialog] = useState({ open: false, content: "" });

  const { register, errors, watch, handleSubmit, control } = useForm({
    resolver: yupResolver(registrationPartnerSchema),
  });
  const watchTransportType = watch("transportType", initialTransportType);
  const watchClasses = watch("classes", []);

  useEffect(() => {
    setTransportType(watchTransportType);
  }, [watchTransportType]);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/partner/company");
    }
  }, [history, isAuthenticated]);

  const backToHomeClick = () => {
    history.push("/");
  };

  const onLogoChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setLogoFile(undefined);
      return;
    }
    setLogoFile(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    const populatedData = populatePartnerInformationForPost(
      data,
      transportType
    );
    try {
      await postPartner(populatedData);
      setDialog({
        open: true,
        content:
          "Register partner successfully! " +
          "A verification link has been sent to your email, " +
          "please click that link it to activate your account. " +
          "You will be contacted by us soon!",
      });
    } catch (error) {
      setResponseErrors({ message: error.message });
    }
  };

  return (
    <RegistrationForm
      errors={errors}
      dialog={dialog}
      control={control}
      loading={loading}
      logoFile={logoFile}
      register={register}
      classes={watchClasses}
      onLogoChange={onLogoChange}
      transportType={transportType}
      responseErrors={responseErrors}
      backToHomeClick={backToHomeClick}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.account.isAuthenticated,
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  postPartner: partnerActions.postPartner,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationFormManagement);
