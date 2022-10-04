import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import classes from "./styles/NavBar.module.css";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <>
      <Navbar bg="light" expand="lg" className={classes.navbar} fixed="top">
        <Container fluid>
          <Navbar.Brand>
            <b>Voting System</b>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link>
                <Link to="/" className={classes.navItem}>
                  Cast
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/voter" className={classes.navItem}>
                  Voter
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/candidate" className={classes.navItem}>
                  Candidates
                </Link>
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Khoj the search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
