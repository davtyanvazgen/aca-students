import React from "react";
import { Link, NavLink as RRNavLink } from "react-router-dom";
import { Button, Input, ButtonGroup, Navbar, Nav, NavLink } from "reactstrap";

export default function Header() {
  return (
    <div>
      <Navbar color="dark" light expand="md">
        <NavLink to="/" className="text-light" tag={RRNavLink}>
          <h5> ACA students list</h5>
        </NavLink>

        <Input
          className="col-lg-3 "
          type="text"
          name="search"
          // id="exampleSearch"
          placeholder="Search"
        />

        <Nav className="ml-auto" navbar>
          <ButtonGroup>
            <Link to="/signin">
              <Button outline color="light" className="mr-1">
                Sign in
              </Button>
            </Link>

            <Link to="/signup">
              <Button outline color="light">
                Sign up
              </Button>
            </Link>
          </ButtonGroup>
        </Nav>
      </Navbar>
    </div>
  );
}
