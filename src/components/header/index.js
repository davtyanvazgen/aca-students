import React from "react";
import { Link, NavLink as RRNavLink } from "react-router-dom";
import { Button, ButtonGroup, Navbar, Nav, NavLink } from "reactstrap";
import Buttons from "./buttonsGroup";

export default function Header() {
  return (
    <div>
      <Navbar color="dark" light expand="md">
        <NavLink to="/" className="text-light" tag={RRNavLink}>
          ACA students list
        </NavLink>

        <Buttons />

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
