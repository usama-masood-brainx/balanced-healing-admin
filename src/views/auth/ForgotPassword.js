import React from "react";
import classnames from "classnames";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import AuthHeader from "components/Headers/AuthHeader.js";
import { resetPassword } from "services/authService";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { errorToast, successToast } from "shared/constants";
import SpinnerLoader from "components/Misc/Spinner";

function ForgotPassword() {
  const history = useHistory();

  const [focusedEmail, setfocusedEmail] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [showSpinner, setSpinner] = React.useState(false);

  const handleSubmit = async () => {
    setSpinner(true);
    resetPassword(email)
      .then((data) => {
        data.success
          ? toast.success("Reset Link Sent to your Email Address", successToast)
          : toast.error("User not Registered", errorToast);
        setSpinner(false);
      })
      .catch(() => {
        toast.error("Invalid Email or Password", errorToast);
        setSpinner(false);
      });
  };

  const keyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <SpinnerLoader adminView={true} showSpinner={showSpinner} />
      <AuthHeader />
      <div className="loginForm">
        <Container className="mt-n18 pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="7">
              <Card className="bg-default-login border-0 mb-0">
                <CardBody className="px-lg-6 py-lg-3">
                  <div className="d-flex justify-content-center">
                    <img
                      src={require("assets/img/brand/bh_logo.png").default}
                      style={{ width: "15rem", height: "15rem" }}
                      alt="logo"
                    />
                  </div>
                  <div className="text-center text-muted mt-4 mb-4">
                    <h1 className="default-color">Forgot Password</h1>
                    <p className="default-color">
                      Please enter your email address and a password reset link
                      will be sent to you or log in.
                    </p>
                  </div>
                  <Form role="form">
                    <FormGroup
                      className={classnames("mb-3", {
                        focused: focusedEmail,
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Email"
                          type="email"
                          onFocus={() => setfocusedEmail(true)}
                          onBlur={() => setfocusedEmail(true)}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onKeyDown={keyDown}
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                      <Button
                        className="default-button-background my-2"
                        color="info"
                        type="button"
                        onClick={handleSubmit}
                      >
                        Reset Password
                      </Button>
                    </div>
                    <div className="d-flex align-items-center justify-content-center mb-4">
                      <small
                        onClick={(e) => history.push("/auth/login")}
                        className="black-color"
                        role={"button"}
                      >
                        Back to Login
                      </small>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Toaster />
    </>
  );
}

export default ForgotPassword;
