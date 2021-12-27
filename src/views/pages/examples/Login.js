import React from "react";
import classnames from "classnames";
import {
  Button,
  Card,
  CardHeader,
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

function Login() {
  const [focusedEmail, setfocusedEmail] = React.useState(false);
  const [focusedPassword, setfocusedPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <>
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
                    <h1 className="default-color">Welcome!</h1>
                    <p className="default-color">
                      Use these awesome forms to login or create new account in
                      your project for free
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
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup
                      className={classnames({
                        focused: focusedPassword,
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          type="password"
                          onFocus={() => setfocusedPassword(true)}
                          onBlur={() => setfocusedPassword(true)}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </InputGroup>
                    </FormGroup>
                    <small className="black-color px-2">Forgot Password?</small>
                    <div className="text-center">
                      <Button
                        className="default-button-background my-4"
                        color="info"
                        type="button"
                      >
                        Sign in
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Login;
