import React, { useEffect } from "react";
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
import {
  validateResetLink,
  changePasswordWithLink,
} from "services/authService";
import { useHistory, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { errorToast, successToast } from "shared/constants";
import SpinnerLoader from "components/Misc/Spinner";

function ResetPassword() {
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    id ? checkResetLink() : setSpinner(false);
  }, []);

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showSpinner, setSpinner] = React.useState(true);
  const [validLink, setValidLink] = React.useState(false);

  const checkResetLink = () => {
    validateResetLink(id)
      .then((data) => {
        data.valid
          ? setValidLink(true)
          : toast.error("Link not Valid", errorToast);
        setSpinner(false);
      })
      .catch((err) => {
        console.log(err);
        setSpinner(false);
        toast.error("Something went wrong", errorToast);
      });
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not Match!", errorToast);
      return;
    }
    setSpinner(true);
    changePasswordWithLink(password, id)
      .then((data) => {
        !data.success
          ? toast.error("Password Reset Failed", errorToast)
          : toast.success("Password reset Successfully!", successToast);
        setSpinner(false);
      })
      .catch((err) => {
        console.log(err);
        setSpinner(false);
        toast.error("Something went wrong", errorToast);
      });
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
                    <h1 className="default-color">Reset Password</h1>
                    <p className="default-color">
                      Please enter your new Password in order to reset.
                    </p>
                  </div>
                  <Form role="form">
                    <FormGroup>
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          disabled={!validLink}
                          placeholder="New Password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          disabled={!validLink}
                          placeholder="Confirm Password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ResetPassword;
