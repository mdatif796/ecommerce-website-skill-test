import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink } from "react-router-dom";

function NavbarComponent() {
  return (
    <>
      {["sm"].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body">
          <Container fluid>
            <Navbar.Brand
              as={NavLink}
              to="/"
              exact
              className="font-weight-bold text-primary"
            >
              eCommerce
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  className="font-weight-bold text-primary"
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                >
                  eCommerce
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-start align-items-center flex-grow-1 pe-3">
                  <Nav.Link as={NavLink} to="/" exact>
                    Products
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/add-product">
                    Add a product
                  </Nav.Link>
                </Nav>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <div className="d-flex align-items-center justify-content-center">
                    <p className="m-2">John Doe</p>
                    <img
                      style={{ width: "50px", height: "50px" }}
                      src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                      alt=""
                    />
                  </div>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavbarComponent;
