import { yupResolver } from "@hookform/resolvers/yup";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import * as yup from "yup";
import { BASE_API_URL } from "../../../../constants";
import RegistrationForm from "./RegistrationForm";

const useStyles = makeStyles({
  buttonAttend: {
    height: 50,
    background: "#f96d01",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    color: "white",
    transition: "all 0.1s linear",
    "&:hover": {
      transform: "scale(0.98)",
      background: "#f96d20",
    },
  },
});

const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(
      /^(?=.{2,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/,
      "Họ của bạn phải dài hơn 2 và ít hơn 40 ký tự!"
    )
    .required("Nội dung bắt buộc"),
  lastName: yup
    .string()
    .matches(
      /^(?=.{2,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/,
      "Tên của bạn phải dài hơn 2 và ít hơn 40 ký tự!"
    )
    .required("Nội dung bắt buộc"),
  phoneNumber: yup
    .string()
    .matches(
      /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
      "Số điện thoại của bạn phải dài hơn 10 và ít hơn 15 ký tự số!"
    )
    .test(
      "checkPhoneNumberExists",
      "Số điện thoại đã tồn tại!",
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
    )
    .required("Nội dung bắt buộc"),
  email: yup
    .string()
    .email("Hãy nhập email thích hợp")
    .test("checkEmailExists", "Email đã tồn tại!", async (email) => {
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
    .required("Nhập email của bạn"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Mật khẩu phải có ít nhất 8 ký tự, trong đó bao gồm" +
        "1 chữ in hoa, 1 chữ in thường, 1 chữ số và 1 ký tự đặc biệt"
    )
    .required("Nội dung bắt buộc"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Không trùng khớp"),
});

function RegistrationFormManagement() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [responseErrors, setResponseErrors] = useState({});
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(registerSchema),
  });

  const [dialog, setDialog] = useState(false);
  const handleClickOpenDialog = () => {
    setDialog(true);
  };
  const handleCloseDialog = () => {
    setDialog(false);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post(`${BASE_API_URL}/auth`, data);
      setDialog(false);
      history.push({
        pathname: "/",
      });
      toast.success("Đăng ký thành công");
    } catch (error) {
      setResponseErrors({ message: error.response.data.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        fullWidth
        className={classes.buttonAttend}
        onClick={handleClickOpenDialog}
      >
        Tham gia
      </Button>
      <Dialog open={dialog} onClose={handleCloseDialog} fullWidth>
        <RegistrationForm
          register={register}
          onSubmit={handleSubmit(onSubmit)}
          errors={errors}
          responseErrors={responseErrors}
          loading={loading}
        />
      </Dialog>
    </>
  );
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationFormManagement);
