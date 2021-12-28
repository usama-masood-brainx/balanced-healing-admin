import classnames from "classnames";
import PropTypes from "prop-types";
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
  const handleLogout = (e) => {
    history.push("/auth/login");
    e.preventDefault();
    logout();
  };

  return (
    <>
      <Navbar
        className={classnames(
          "navbar-top navbar-expand-end border-bottom",
          { "navbar-dark bg-info": theme === "dark" },
          { "navbar-light bg-secondary": theme === "light" }
        )}
      >
        <div className="mx-5">
          <UncontrolledDropdown nav>
            <DropdownToggle className="nav-link pr-0" color="" tag="a">
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={require("assets/img/theme/team-4.jpg").default}
                  />
                </span>
                <Media className="ml-2 d-none d-lg-block">
                  <span className="mb-0 text-sm text-white font-weight-bold">
                    Admin
                  </span>
                </Media>
              </Media>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                <i className="ni ni-single-02" />
                <span>Change Password</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#pablo" onClick={(e) => handleLogout(e)}>
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
