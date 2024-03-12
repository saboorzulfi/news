// ** React 
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// ** React-icons
import { IoCloseOutline } from "react-icons/io5";

// ** Bootstrap
import { Button, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

// ** Css
import { btnColor, formInput, nav, navBar, navBrand, closeBtn, searchForm ,navs} from "./index";

// ** config
import { navbarBrand } from "config/config";

function NavBar() {
  const navigate = useNavigate();

  const navRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?keyword=${searchQuery}`);
    setSearchQuery("");
    setIsCollapsed(true);
  };

  const handleNavClick = () => {
    setIsCollapsed(true);
  };

  const isSearchButtonDisabled = searchQuery.trim() === "";

  return (
    <>
      <Navbar
        ref={navRef}
        style={navBar}
        variant="dark"
        expand="lg"
        fixed="top"
        expanded={!isCollapsed}
      >
        <Navbar.Brand style={navBrand} href="/">
          {navbarBrand}
        </Navbar.Brand>
        {isCollapsed && (
          <Navbar.Toggle
            className="border-0"
            aria-controls="basic-navbar-nav"
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        )}

        {!isCollapsed && (
          <IoCloseOutline
            size={40}
            style={closeBtn}
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        )}
        <Navbar.Collapse id="basic-navbar-nav"  className="justify-content-between">
          <Nav style={nav} className="mr-auto" onClick={handleNavClick}>
            {navs.map((navItem,index) => (
              <LinkContainer to={navItem.page} key={index}>
                <Nav.Link className="ml-2">{navItem.nav}</Nav.Link>
              </LinkContainer>
            ))}
          </Nav>
          <Form style={searchForm} onSubmit={handleSubmit}>
            <FormControl
              type="text"
              placeholder="Explore news..."
              style={formInput}
              className="form-control-lg   mt-lg-2 mt-md-2 mt-sm-2 mt-xl-0  shadow-sm border-dark"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <Button
              className="btn custom-btn mt-lg-2 ml-2 mt-md-2 mt-sm-2 mt-xl-0 shadow-sm"
              style={btnColor}
              onClick={handleSubmit}
              disabled={isSearchButtonDisabled}
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavBar;
