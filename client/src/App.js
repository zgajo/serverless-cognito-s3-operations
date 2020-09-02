import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import React, { Component } from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";

class App extends Component {
  render() {
    console.log("this.prope", this.props);
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Brand>
            <Link to="/">Test application</Link>
          </Navbar.Brand>

          <Navbar.Collapse>
            <Nav pullRight>
              <LinkContainer to="/signup">
                <NavItem>Signup</NavItem>
              </LinkContainer>
              <LinkContainer to="/login">
                <NavItem>Login</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>

          <AmplifySignOut />
        </Navbar>

        <Routes />
      </div>
    );
  }
}

export default withAuthenticator(App);
