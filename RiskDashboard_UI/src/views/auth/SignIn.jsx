import RiskManagement from "./../../assets/images/login-img.jpg";
import { Link, useHistory, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CustomeInput from "../../components/CustomeInput/CustomeInput";
import { sha512 } from "js-sha512";
import { useDispatch, useSelector } from "react-redux";
import {
  postLoginAction,
  postLoginClearAction,
} from "../../store/redux/actions/login";
import swal from "sweetalert";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [latestChangedFieldId, setLatestChangedFieldId] = useState("");
  const [isValidate, setIsValidate] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const { usersData, loading, authenticatedusers } = useSelector(
    (state) => state.LoginStore
  );
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const [inputs, setInputs] = useState([
    {
      id: 0,
      placeholder: "Email Address",
      name: "email",
      type: "email",
      hasError: false,
      errMessage: "",
    },
    {
      id: 1,
      placeholder: "Password",
      name: "password",
      type: "password",
      mhasError: false,
      errMessage: "",
    },
  ]);
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });
  const handleChange = (text, fieldName, id, type) => {
    setFields((currentValue) => ({
      ...currentValue,
      [fieldName]: text,
    }));
    setLatestChangedFieldId(id);
    // validateForm(fieldName, id, type);
  };

  const validateForm = (fieldName, id, type) => {
    const ID = id;
    const newInput = [...inputs];
    if (type === "email") {
      if (fields[fieldName].length === 0 || fields[fieldName] === "") {
        newInput[ID].errMessage = "Please fill the field";
        newInput[ID].hasError = true;
        setIsValidate(true);
      } else if (fields[fieldName].length < 4) {
        newInput[ID].hasError = true;
        newInput[ID].errMessage = "Invalid Email";
        setIsValidate(true);
      } else {
        newInput[ID].errMessage = "";
        newInput[ID].hasError = false;
        setIsValidate(false);
      }
    }
    if (type === "password" && fieldName === "password") {
      if (fields[fieldName].length === 0 || fields[fieldName] === "") {
        newInput[ID].errMessage = "Please fill the field";
        newInput[ID].hasError = true;
        setIsValidate(true);
      } else if (fields[fieldName].length < 4) {
        newInput[ID].hasError = true;
        newInput[ID].errMessage = "Your password must be at least 4 characters";
        setIsValidate(true);
      } else {
        newInput[ID].errMessage = "";
        newInput[ID].hasError = false;
        setIsValidate(false);
      }
    }
    setInputs(newInput);
  };

  const onSingInPress = () => {
    inputs.find((input) => validateForm(input.name, input.id, input.type)); 
    setTimeout(() => {
      const currentChangedField = inputs.find(
        (input) => input.hasError === true
      );
      currentChangedField?.errMessage?.length > 0
        ? getNotification()
        : signIn();
    }, 100);
  };

  const getNotification = () => {};

  const signIn = () => {
    const formData = new FormData();
    var _user = fields.email;
    formData.append("emailId", _user?.trim());
    formData.append("password", sha512(fields.password));
    formData.append("cookieId", null);
    localStorage.setItem("username", _user?.trim()); 
    dispatch(postLoginAction(formData));
    setIsClick(!isClick);
  };

  const onForgotPress = () => {};

  useEffect(() => {
    if (usersData?.aceessToken && isClick) {
      onToggleSnackBar();
      setUserDetailsData();
      setIsClick(!isClick);
      localStorage.setItem("aceessToken", usersData?.aceessToken);
      localStorage.setItem("refreshToken", usersData?.refreshToken);
      localStorage.setItem("userId", usersData?.userId); 
      navigate("/admin/dashboard", { replace: true });
    } else if (usersData == "Incorrect username or password!" && isClick) {
      swal(usersData, { icon: "error" });
      setIsClick(!isClick);
      dispatch(postLoginClearAction());
    }
  }, [usersData, loading]);

  useEffect(() => {
    validateForm("", "", "");
  }, [latestChangedFieldId]);

  let loginMsg = "";
  const setUserDetailsData = () => {
    landingGridRoute();
    if (!authenticatedusers.isEmailExists) {
      loginMsg = "Invalid Username/Password.";
      setSnackMessage(loginMsg);
    } else if (
      authenticatedusers.userInfo != null &&
      authenticatedusers.userInfo.isNewUser
    ) {
      loginMsg =
        "User not Registered, Please use the registration email link to register.";
      setSnackMessage(loginMsg);
    } else if (
      authenticatedusers.isPasswordExists &&
      authenticatedusers.isLockedOut
    ) {
      loginMsg =
        "Your account has been locked due to incorrect entries. Please contact the administrator to unlock your account.";
      setSnackMessage(loginMsg);
    } else if (!authenticatedusers.isPasswordExists) {
      loginMsg = "Invalid Username/Password.";
      setSnackMessage(loginMsg);
    } else if (
      authenticatedusers.userInfo != null &&
      !authenticatedusers.userInfo.isActive
    ) {
      loginMsg = "User is Inactive, Please contact your Lender.";
      setSnackMessage(loginMsg);
    } else if (!authenticatedusers.isClinetActive) {
      loginMsg = "Client is Inactive, Please contact your Lender.";
      setSnackMessage(loginMsg);
    } else if (!authenticatedusers.clientHasSubscription) {
      loginMsg = "Invalid Subscription, Please reach out to Lender.";
      setSnackMessage(loginMsg);
    } else if (!authenticatedusers.hasActiveLoans) {
      loginMsg = "User is Inactive, Please reach out to Lender.";
      setSnackMessage(loginMsg);
    } else {
      landingGridRoute();
      if (authenticatedusers.userInfo.roleType == "APOLLO_Borrower") {
        setSnackMessage("Login Successfully");
        landingGridRoute();
      } else {
        setSnackMessage("Borrower only allow");
      }
    }
  };
  const landingGridRoute = () => {
    // navigate("Loan");
    setTimeout(() => {
      // history.push("/admin/dashboard");
    }, 10);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setTimeout(() => {
        onSingInPress();
      }, 100);
    }
  };
  return (
    <div className="login-wrapper py-5">
      <div className="container h-100">
        <div className="card-container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12 col-md-6">
              <div className="login-container">
                <div className="card">
                  <h5 className="mb-4">LOGIN</h5>

                  {inputs &&
                    inputs.map((value, index) => (
                      <>
                        <CustomeInput
                          onChange={(text) => {
                            handleChange(
                              text.target.value,
                              value.name,
                              value.id,
                              value.type
                            );
                          }}
                          placeholder={value.placeholder}
                          secureTextEntry={
                            value.name == "password" ? true : false
                          }
                        />
                        {value.hasError && (
                          <div
                            style={{
                              color: "red",
                              marginTop: 3,
                              fontSize: 12,
                              paddingBottom: 10,
                            }}
                          >
                            {value.errMessage}
                          </div>
                        )}
                      </>
                    ))}
                  <br></br>

                  {/* <a href="#" className="hyper-link">Forgot Password?</a>
                  <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="checkbox" />
                    <label className="form-check-label" for="checkbox">Remember me</label>
                  </div> */}

                  <button
                    className="btn btn-primary"
                    onClick={onSingInPress}
                    onKeyUp={handleKeyPress}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="h-100 login-img">
                <img
                  src={RiskManagement}
                  alt="risk image"
                  width={400}
                  style={{ paddingLeft: 30 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
