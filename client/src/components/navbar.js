import Container from "react-bootstrap/Container";
import { Button } from "reactstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../constants/actionTypes";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import alertify from "alertifyjs";
import decode from "jwt-decode";
import { createRandom, getRecords } from "../actions/records";
import { Redirect } from "react-router-dom";
// Here, we display our Navbar
const Navi = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const logout = () => {
    dispatch({ type: LOGOUT });
    setUser(null);
    alertify.success("Logged out successfully");
    history.push("/auth");
  };
  const random = () => {
    dispatch(createRandom());

    //alertify.alert("Random employee added", function () {});
  };

  useEffect(() => {
    const token = user?.token;
    //JWT
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/">Employees</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Employee List</Nav.Link>
              {!user ? (
                <Nav.Link href="/auth">Login</Nav.Link>
              ) : (
                <>
                  <Nav.Link href="/create">Create Employee</Nav.Link>
                  <Nav.Link onClick={random}>Hire Random Employee</Nav.Link>
                  <NavDropdown title="Fast Actions" id="basic-nav-dropdown">
                    <Button onClick={random}>Hire Random Employee</Button>
                    <NavDropdown.Item href="#action/3.2">
                      Another actionw
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Navbar.Brand>{user?.result?.name}</Navbar.Brand>
                  <Button color="secondary" onClick={logout}>
                    {" "}
                    Logout{" "}
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navi;
