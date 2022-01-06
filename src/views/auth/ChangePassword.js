import React, { useState } from "react";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { Card, CardHeader, Container, Row, Col, Input, Form } from "reactstrap";
import { successToast, errorToast } from "shared/constants";
import SpinnerLoader from "components/Misc/Spinner";
import toast, { Toaster } from "react-hot-toast";
import { changePassword } from "services/authService";

const ChangePassword = () => {
  //form values states
  const [oldPass, setOld] = useState("");
  const [newPass, setNew] = useState("");
  const [confirmPass, setConfirm] = useState("");

  //validation states
  const [showError, setErrorMessage] = useState(false);
  const [showSpinner, setSpinner] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!oldPass || !newPass || !confirmPass) {
        setErrorMessage(true);
        return;
      }
      if (newPass !== confirmPass) {
        toast.error("Passwords do no Match!", errorToast);
        return;
      }
      setSpinner(true);
      changePassword(oldPass, newPass)
        .then((data) => {
          if (data.success) {
            toast.success("Password Updated Successfully!", successToast);
            setNew("");
            setOld("");
            setConfirm("");
          } else {
            toast.error("Old Password does not match", errorToast);
          }
          setSpinner(false);
        })
        .catch((err) => {
          console.log(err);
          setSpinner(false);
          toast.error("Something went wrong!", errorToast);
        });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", errorToast);
    }
  };

  return (
    <>
      <SpinnerLoader showSpinner={showSpinner} />
      <SimpleHeader name="Change Password" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col-lg-7 col-md-12">
            <Card>
              <CardHeader className="border-0">
                <h3 className="mb-0">Password Details</h3>
              </CardHeader>
              <hr className="my-0 mx-2" />
              <div>
                <Form>
                  <Row className="px-5 py-3">
                    <Col lg="12">
                      <h4 className="headingColor">Old Password</h4>
                      <Input
                        className={!oldPass && showError ? "is-invalid" : ""}
                        type="password"
                        value={oldPass}
                        onChange={(e) => setOld(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="px-5 py-3">
                    <Col lg="6" md="12">
                      <h4 className="headingColor">New Password</h4>
                      <Input
                        className={!newPass && showError ? "is-invalid" : ""}
                        type="password"
                        value={newPass}
                        onChange={(e) => setNew(e.target.value)}
                      />
                    </Col>
                    <Col lg="6" md="12">
                      <h4 className="headingColor">Confirm Password</h4>
                      <Input
                        className={
                          !confirmPass && showError ? "is-invalid" : ""
                        }
                        type="password"
                        value={confirmPass}
                        onChange={(e) => setConfirm(e.target.value)}
                      />
                    </Col>
                  </Row>
                </Form>
                <Row className="px-5 py-3">
                  <Col>
                    <button onClick={handleSubmit} className="btn addBtn">
                      Update
                    </button>
                  </Col>
                </Row>
              </div>
            </Card>
          </div>
        </Row>
      </Container>
      <Toaster />
    </>
  );
};

export default ChangePassword;
