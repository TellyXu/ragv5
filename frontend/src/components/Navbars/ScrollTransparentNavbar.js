import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";

function ScrollTransparentNavbar() {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [navbarColor, setNavbarColor] = React.useState(
    (document.documentElement.scrollTop > 499 || document.body.scrollTop) > 499
      ? ""
      : " navbar-transparent"
  );
  const [buyButtonColor, setBuyButtonColor] = React.useState(
    (document.documentElement.scrollTop > 499 || document.body.scrollTop) > 499
      ? "info"
      : "neutral"
  );
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 499 ||
        document.body.scrollTop > 499
      ) {
        setNavbarColor("");
        setBuyButtonColor("info");
      } else if (
        document.documentElement.scrollTop < 500 ||
        document.body.scrollTop < 500
      ) {
        setNavbarColor(" navbar-transparent");
        setBuyButtonColor("neutral");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top" + navbarColor} color="white" expand="lg">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand to="/" tag={Link} id="navbar-brand1">
              CDHAI
            </NavbarBrand>
            <NavbarBrand to="/" tag={Link} id="navbar-brand2">
              |
            </NavbarBrand>
            <NavbarBrand to="/" tag={Link} id="navbar-brand3">
              Carey Business School
            </NavbarBrand>

            <UncontrolledTooltip target="navbar-brand1">
              Center for Digital Health and Artificial Intelligence
            </UncontrolledTooltip>

            <button
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              className="navbar-toggler"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>

          <Collapse isOpen={collapseOpen} navbar>
            <Nav className="ml-auto" id="ceva" navbar>

              {/*<UncontrolledDropdown nav>*/}
              {/*  <DropdownToggle*/}
              {/*    caret*/}
              {/*    color="default"*/}
              {/*    data-toggle="dropdown"*/}
              {/*    href="#pablo"*/}
              {/*    id="navbarDropdownMenuLink"*/}
              {/*    nav*/}
              {/*    onClick={(e) => e.preventDefault()}*/}
              {/*  >*/}
              {/*    <i*/}
              {/*      aria-hidden={true}*/}
              {/*      className="now-ui-icons files_paper"*/}
              {/*    ></i>*/}
              {/*    <p>Tutorial</p>*/}
              {/*  </DropdownToggle>*/}

              {/*  /!*<DropdownMenu aria-labelledby="navbarDropdownMenuLink" right>*!/*/}
              {/*  /!*  <DropdownItem to="/rag" tag={Link}>*!/*/}
              {/*  /!*    <i className="now-ui-icons objects_key-25"></i>*!/*/}
              {/*  /!*    get your api keys*!/*/}
              {/*  /!*  </DropdownItem>*!/*/}
              {/*  /!*  <DropdownItem to="/rag" tag={Link}>*!/*/}
              {/*  /!*    <i className="now-ui-icons arrows-1_cloud-download-93"></i>*!/*/}
              {/*  /!*    10-k file*!/*/}
              {/*  /!*  </DropdownItem>*!/*/}
              {/*  /!*  <DropdownItem to="/rag" tag={Link}>*!/*/}
              {/*  /!*    <i className="now-ui-icons business_bulb-63"></i>*!/*/}
              {/*  /!*    interval*!/*/}
              {/*  /!*  </DropdownItem>*!/*/}

              {/*  /!*</DropdownMenu>*!/*/}
              {/*</UncontrolledDropdown>*/}
              <NavItem>
                <Button
                  className="nav-link btn-default"
                  color={buyButtonColor}
                  to="/rag" tag={Link}
                >
                  <p>Start Now</p>
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ScrollTransparentNavbar;
