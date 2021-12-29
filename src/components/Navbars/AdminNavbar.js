import classnames from "classnames";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Navbar,
} from "reactstrap";
import { logout } from "services/authService";

function AdminNavbar({ theme }) {
  const history = useHistory();
  const [showBack, setBack] = useState(false);
  const handleLogout = (e) => {
    history.push("/auth/login");
    e.preventDefault();
    logout();
  };

  useEffect(() => {
    displayBackButton(history.location);
    history.listen((location, action) => {
      displayBackButton(location);
    });
  }, []);

  const displayBackButton = (location) => {
    if (
      location.pathname.startsWith("/admin/meditation/") ||
      location.pathname.startsWith("/admin/add-meditation")
    ) {
      setBack(true);
    } else {
      setBack(false);
    }
  };

  return (
    <>
      <Navbar
        className={classnames(
          "navbar-top navbar-expand-end border-bottom",
          { "navbar-dark bg-info-bh": theme === "dark" },
          { "navbar-light bg-secondary": theme === "light" },
          { "navbar-expand-space": showBack === true }
        )}
      >
        {showBack && (
          <div
            role="button"
            className="mx-5 text-white"
            onClick={() => history.push("/admin/meditations")}
          >
            <i className="fa fa-long-arrow-alt-left mr-3"></i>Back
          </div>
        )}
        <div className="mx-5">
          <UncontrolledDropdown nav>
            <DropdownToggle
              role="button"
              className="nav-link pr-0"
              color=""
              tag="a"
            >
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle bg-white">
                  <i className="fa fa-user icon-color-light text-lg"></i>
                </span>
                <Media className="ml-2 d-none d-lg-block">
                  <span className="mb-0 text-sm text-white font-weight-bold">
                    Admin
                  </span>
                </Media>
              </Media>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={(e) => e.preventDefault()}>
                <i className="ni ni-single-02" />
                <span>Change Password</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={(e) => handleLogout(e)}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </Navbar>
    </>
  );
}

AdminNavbar.defaultProps = {
  toggleSidenav: () => {},
  sidenavOpen: false,
  theme: "dark",
};
AdminNavbar.propTypes = {
  toggleSidenav: PropTypes.func,
  sidenavOpen: PropTypes.bool,
  theme: PropTypes.oneOf(["dark", "light"]),
};

export default AdminNavbar;
