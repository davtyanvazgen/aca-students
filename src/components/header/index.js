import React from "react";
import { Link, NavLink as RRNavLink } from "react-router-dom";
import { Button, ButtonGroup, Navbar, Nav, NavLink } from "reactstrap";
import './style.css'


export default function Header() {
  return (
    <div >
      <Navbar color="dark" light expand="md">
        <div className = 'divWrapper'>
          <NavLink to="/" className="text-light" tag={RRNavLink}>
            ACA students list
          </NavLink>
        
          <div>
            <Nav className="ml-auto" navbar>
                <ButtonGroup>
                  <Link to="/students">
                      <Button size="sm" outline color="light" className="mr-1">
                        Students
                      </Button>
                  </Link>

                  <Link to="/statuses">
                    <Button size="sm" outline color="light" className="mr-1">
                      Statuses
                    </Button>
                  </Link>

                  <Link to="/cources">
                    <Button size="sm" outline color="light">
                      Cources
                    </Button>
                  </Link>
                </ButtonGroup>
              </Nav>
          </div>
          <div >
            <Nav className="ml-auto" navbar>
              <ButtonGroup>
                <Link to="/signin">
                  <Button size="sm" outline color="light" className="mr-1">
                    Sign in
                  </Button>
                </Link>

                <Link to="/signup">
                  <Button size="sm" outline color="light">
                    Sign up
                  </Button>
                </Link>
                
              </ButtonGroup>
            </Nav>
          </div>
        </div>
      </Navbar>
    </div>
  );
}
